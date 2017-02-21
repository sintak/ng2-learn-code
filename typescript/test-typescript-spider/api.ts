// import superagent = require('superagent');
// import cheerio = require('cheerio');

// export const remote_get = function(url: string) {

//     const promise = new Promise<superagent.Response>(function (resolve, reject) {
//         superagent.get(url)
//             .end(function (err, res) {
//                 if (!err) {
//                     resolve(res);
//                 } else {
//                     console.log(err)
//                     reject(err);
//                 }
//             });
//     });
//     return promise;
// }

// ====== v4解决易导致服务器503问题 =======
// import superagent = require('superagent');
// import cheerio = require('cheerio');

// export const get_index_urls = async function () {
//     const res = await remote_get('http://cnodejs.org/');
//     const $ = cheerio.load(res.text);
//     let urls: string[] = [];
//     $('.topic_title_wrapper').each(async (index, element) => {
//         urls.push('http://cnodejs.org' + $(element).find('.topic_title').first().attr('href'));
//     });
//     return urls;
// }
// export const get_content = async function (url: string) {
//     const res = await remote_get(url);
//     const $ = cheerio.load(res.text);
//     return $('.topic_content').first().text();
// }

// export const remote_get = function (url: string) {

//     const promise = new Promise<superagent.Response>(function (resolve, reject) {

//         superagent.get(url)
//             .end(function (err, res) {
//                 if (!err) {
//                     resolve(res);
//                 } else {
//                     console.log(err)
//                     reject(err);
//                 }
//             });
//     });
//     return promise;
// }

// ======== v5 mongodb ===========
// import superagent = require('superagent');
// import cheerio = require('cheerio');
// import models = require('./models');
// const Article = models.Article;

// export const get_index_urls = async function () {
//     const res = await remote_get('http://cnodejs.org/');

//     const $ = cheerio.load(res.text);
//     let urls: string[] = [];
//     $('.topic_title_wrapper').each((index, element) => {
//         urls.push('http://cnodejs.org' + $(element).find('.topic_title').first().attr('href'));
//     });
//     return urls;

// }
// export const fetch_content = async function (url: string) {
//     const res = await remote_get(url);

//     const $ = cheerio.load(res.text);
//     let article = new Article();
//     article.text = $('.topic_content').first().text();
//     article.title = $('.topic_full_title').first().text().replace('置顶', '').replace('精华', '').trim();
//     article.url = url;
//     console.log('获取成功：' + article.title);
//     article.save();

// }
// export const remote_get = function (url: string) {

//     return new Promise<superagent.Response>((resolve, reject) => {
//         superagent.get(url)
//             .end(function (err, res) {
//                 if (!err) {
//                     resolve(res);
//                 } else {
//                     reject(err);
//                 }
//             });
//     });
// }
// ---- request version remote_get ------
import superagent = require('superagent');
import cheerio = require('cheerio');
import models = require('./models');
const Article = models.Article;

export const get_index_urls = async function () {
    const res = await remote_get('http://cnodejs.org/');

    const $ = cheerio.load(res);
    let urls: string[] = [];
    $('.topic_title_wrapper').each((index, element) => {
        urls.push('http://cnodejs.org' + $(element).find('.topic_title').first().attr('href'));
    });
    return urls;

}
export const fetch_content = async function (url: string) {
    const res = await remote_get(url);

    const $ = cheerio.load(res);
    let article = new Article();
    article.text = $('.topic_content').first().text();
    article.title = $('.topic_full_title').first().text().replace('置顶', '').replace('精华', '').trim();
    article.url = url;
    console.log('获取成功：' + article.title);
    article.save();

}
class Config {
    retries: number;
}
let config = new Config();

import request = require('request');
import helper = require('./helper');

//config.retries = 3;
let current_retry = config.retries || 0;
export const remote_get = async function (url: string, proxy?: string) {
    //每次请求都先稍等一下
    await helper.wait_seconds(2);
    if (!proxy) {
        proxy = '';
    }
    const promise = new Promise<string>(function (resolve, reject) {
        console.log('get: ' + url + ',  using proxy: ' + proxy);
        let options: request.CoreOptions = {
            headers: {
                'Cookie': '',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
                'Referer': 'https://www.baidu.com/'
            },
            encoding: 'utf-8',
            method: 'GET',
            proxy: proxy,
            timeout: 3000,
        }
        request(url, options, async function (err, response, body) {
            console.log('got:' + url);
            if (!err) {
                body = body.toString();
                current_retry = config.retries || 0;
                console.log('bytes:' + body.length);
                resolve(body);
            } else {
                console.log(err);
                if (current_retry <= 0) {
                    current_retry = config.retries || 0;
                    reject(err);
                } else {
                    console.log('retry...(' + current_retry + ')')
                    current_retry--;
                    try {
                        let body = await remote_get(url, proxy);
                        resolve(body);
                    } catch (e) {
                        reject(e);
                    }
                }
            }
        });
    });
    return promise;
}


// import api = require('./api');
// const go = async () => {
//     let res = await api.remote_get('http://www.baidu.com/');
//     console.log(res.text);
// }
// go();

// ========= V2 尝试抓取http://cnodejs.org/的第一页文章链接。=========
// import api = require('./api');
// import cheerio = require('cheerio');

// const go = async () => {
//     const res = await api.remote_get('http://cnodejs.org/');
//     const $ = cheerio.load(res.text);
//     let urls: string[] = [];
//     let titles: string[] = [];
//     $('.topic_title_wrapper').each((index, element) => {
//         titles.push($(element).find('.topic_title').first().text().trim());
//         urls.push('http://cnodejs.org/' + $(element).find('.topic_title').first().attr('href'));
//     })
//     console.log(titles, urls);
// }
// go();


// ========= V3 深入抓取文章内容（易导致服务器503） =========
// import api = require('./api');
// import cheerio = require('cheerio');

// const go = async () => {
//     const res = await api.remote_get('http://cnodejs.org/');
//     const $ = cheerio.load(res.text);
//     $('.topic_title_wrapper').each(async (index, element) => {
//         let url = ('http://cnodejs.org' + $(element).find('.topic_title').first().attr('href'));
//         const res_content = await api.remote_get(url);
//         const $_content = cheerio.load(res_content.text);
//         console.log($_content('.topic_content').first().text());
//     })

// }
// go();


// ====== v4解决易导致服务器503问题 =======
// import api = require('./api');
// import helper = require('./helper');
// import cheerio = require('cheerio');

// const go = async () => {
//     let urls = await api.get_index_urls();
//     for (let i = 0; i < urls.length; i++) {
//         await helper.wait_seconds(1);
//         let text = await api.get_content(urls[i]);
//         console.log(text);
//     }
// }
// go();

// ======== v5 mongodb ===========
import api = require('./api');
import helper = require('./helper');
import cheerio = require('cheerio');

(async () => {

    try {
        let urls = await api.get_index_urls();
        for (let i = 0; i < urls.length; i++) {
            await helper.wait_seconds(1);
            await api.fetch_content(urls[i]);
        }
    } catch (err) {
        console.log(err);
    }

    console.log('完毕！');

})();


let model;
if (!model) model = {};
if (!model.vo) model.vo = {};
if (!model.abstract) model.abstract = {};

// VoAbs.js
// 事件管理。过滤数据/创建只读属性
model.abstract.VoBase = function () {
    //观察者列表
    var observer = {};
    var unique = 0;

    /**
     * 添加事件监听
     * @param evtName string 事件名称
     * @param cb 回调方法，第一个参数为事件名，第二个参数为事件带回来的数据对象
     * @returns {number} 事件ID
     */
    this.addEvent = function (evtName, cb) {
        if (typeof cb != "function") {
            return false;
        }
        if (!observer[evtName]) {
            observer[evtName] = {};
        }
        observer[evtName][++unique] = cb;
        return unique;
    }

    /**
     * 移除事件监听
     * @param evtName string 要移除的事件名
     * @param evtId int 事件ID，添加事件时获得
     * @returns {boolean}
     */
    this.removeEvent = function (evtName, evtId) {
        if (observer[evtName] && observer[evtName][evtId]) {
            delete observer[evtName][evtId];
            return true;
        }
        return false;
    }

    /**
     * 派发事件
     * @param evtName string 要派发的事件名
     * @param data object 派发的数据对象
     * @returns {*} 派发次数
     */
    this.dispatcherEvent = function (evtName, data) {
        if (!observer[evtName]) {
            return false;
        }
        var count = 0;
        for (var i in observer[evtName]) {
            observer[evtName][i](evtName, data);
            count++;
        }
        return count;
    }

    /**
     * 过滤数据
     * @param field array 限定的VO字段模版
     * @param data object 原始数据对象
     * @param obj object 要修改的VO数据引用，如果不存在即返回新的对象 [可选]
     * @returns bool|object
     */
    this.filterData = function (field, data, obj) {
        if (obj) {
            var ret = false;
            if (typeof data == "object") {
                var len = field.length;
                for (var i = 0; i < len; i++) {
                    var k = field[i];
                    if (data[k] === undefined) {
                        continue;
                    }
                    if (data[k] != obj[k]) {
                        obj[k] = data[k];
                        ret = true;
                    }
                }
            }
            return ret ? obj : false;
        } else {
            var copy = {};
            if (typeof data == "object") {
                var len = field.length;
                for (var i = 0; i < len; i++) {
                    var k = field[i];
                    if (data[k] === undefined) {
                        continue;
                    }
                    copy[k] = data[k];
                }
            }
            return copy;
        }

    }

    /**
     * 创建只读属性
     * @param field array 要创建为只读属性的VO字段模版
     * @param data object 被读源数据对象
     * @returns void
     */
    this.readOnly = function (field, data) {
        for (var i = 0; i < field.length; i++) {
            this[field[i]] = (function (key) {
                return function () {
                    return data[key];
                };
            })(field[i]);
        }
    }
}

// CompanyInfoVo.js
// repository & event
model.vo.CompanyInfoVo = function () {

    //VoBase
    model.abstract.VoBase.call(this);

    //本对象引用
    let self = this;

    //字段设置
    var comField = [
        "name",//公司名称
        "tel",//公司电话
        "fax",//公司传真
        "add",//公司地址
        "www",//公司网址
        "domain",//公司行业
        "desc"//公司简介
    ], comData = { name: 'aibao' }, isLogin = false;

    /**
     * --------------------------------------------------------------------------------------------
     * 公共方法定义
     * --------------------------------------------------------------------------------------------
     */

    //设置只读属性
    self.readOnly(comField, comData);
    
    //设置公司数据
    this.setData = function(data){
        isLogin = true;
        if(self.filterData(comField, data, comData)){
            self.dispatcherEvent(model.vo.CompanyInfoVo.EVENT_UPDATE, self);
        }
    }

    this.getComInfo = function(){
        var o = {};
        for(var i in comData){
            o[i] = comData[i];
        }
        return o;
    }

    this.companyName = function(){
        return self.getComInfo().name;
    }

    //用于区分登录前和登录后，主要永远Header.js中的显示使用
    this.getLogin = function(){
        return isLogin;
    }
}
model.vo.CompanyInfoVo.EVENT_UPDATE = "event_update";

// DepartVo.js
// model.vo.DepartVo = function () {
//  ...
// }
// model.vo.DepartVo.EVENT_UPDATE = "event_update";
// model.vo.DepartVo.USER_SELECT_UPDATE = "event_select_update";


// Vo.js
// 汇总repository （ng2：作为注入） (hub?)
model.Vo = function () {
    this.companyInfo = new model.vo.CompanyInfoVo();
    // ...
}

// Facade.js  (hub?)
var Model = function () {
    this.vo = new model.Vo()
    // ...
}
let View = function() {
    // ...
}

// 汇总 （ng2：汇总注入(ManageApp)）
let $$ = {
    // common: new Common(),
    
    // model: new function() { this.vo = new model.Vo()}
    model: new Model(),
    view: new View(),

    facadeRun: function(html) {

    }
}


//
console.log($$.model.vo.companyInfo.name());
console.log($$.model.vo.companyInfo.tel());

// -----------------------------------------------

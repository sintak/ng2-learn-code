/*
*新闻类
*/
Ext.define('app.controller.New', {
    extend: 'Ext.app.Controller',
    config: {
        models: ['New'],
        stores: ['NewList'],
        views: ['new.List'],
        refs: {
            newList: 'newList'
        },
        control: {
            //新闻列表
            newList: {
                initialize: function (list) {
                    MyUtil.showListByParams('newList', MyUtil.newParams, MyUtil.isNewLoad);
                },
                //itemtap事件被用来处理检测是否在编辑状态，所以这里使用itemsingletap而不能使用itemtap
                itemsingletap: function (list, index, target, record, e) {
                    this.redirectTo('newInfo');
                    MyUtil.showInfo(record, 'newInfo', 'NewInfo.ashx', 'body', {
                        id: record.data.id
                    });
                },
                //结束多选事件触发
                simpleSuccess: function (ids) {
                    console.log(ids);
                }
            }
        }
    }
});
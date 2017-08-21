// ------------- Controller
/*
*新闻类
*/
Ext.define('myApp.controller.New', {
    extend: 'Ext.app.Controller',
    // requires: ['myApp.view.PrintTaskListView', 'myApp.view.PrintTaskListTabPanelView', 'myApp.view.TestView', 'myApp.view.PrintTaskList'],
    stores: ['PeopleList'],
    config: {
        // models: ['New'],
        // stores: ['NewList'],
        // views: ['new.List'],
        views: ['PrintTaskList', 'PrintTaskListView', 'PrintTaskListTabPanelView', 'TestView', 'TinyPeople'],
        // refs: {
        //     // newList: 'newList'
        //     printTaskListView: 'printTaskListView',
        //     printTaskListTabPanelView: 'printTaskListTabPanelView',
        //     printTaskList: 'printTaskList',
        // },
        control: {
            //新闻列表
            newList: {
                // initialize: function (list) {
                //     MyUtil.showListByParams('newList', MyUtil.newParams, MyUtil.isNewLoad);
                // },
                // //itemtap事件被用来处理检测是否在编辑状态，所以这里使用itemsingletap而不能使用itemtap
                // itemsingletap: function (list, index, target, record, e) {
                //     this.redirectTo('newInfo');
                //     MyUtil.showInfo(record, 'newInfo', 'NewInfo.ashx', 'body', {
                //         id: record.data.id
                //     });
                // },
                //结束多选事件触发
                simpleSuccess: function (list, items, ids, type) {
                    console.log(ids);
                }
            },
            printTaskListView: {

                simpleSuccess: function (list, items, ids, type) {
                    console.log(ids);
                }
            }
        }
    }
});
        // -------------------- Controller end
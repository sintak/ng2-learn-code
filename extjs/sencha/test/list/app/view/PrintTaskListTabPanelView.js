// Ext.define('myApp.view.PrintTaskListTabPanelView', {
//     // alternateClassName: 'printTaskListTabPanelView',    
//     extend: 'Ext.Panel',
//     xtype: 'printTaskListTabPanelView',
//     config: {

//         items: [
//             {
//                 xtype: 'tabpanel',
//                 ui: '',
//                 tabBarPosition: 'top',
//                 config: {
//                     // baseCls: '',
//                     // cls: '',
//                     // background: 'red'
//                 },
//                 items: [
//                     // {
//                     //     title: '主页',
//                     //     html: '主页',
//                     //     iconCls: 'home'
//                     // },
//                     // {
//                     //     title: '111',
//                     //     xtype: 'fafafa',
//                     //     iconCls: 'home'
//                     // },
//                     // {
//                     //     xtype : 'checkboxfield',
//                     //     label : '入厨',
//                     //     name : 'kitchenPrint',
//                     //     id: 'addCommodityKtPrint',
//                     //     checked : true,
//                     //     hidden: false
//                     // },
//                     {
//                         title: '<strong style="color:red;">阻塞单</strong>',
//                         xtype: 'printTaskListView',
//                         id: 'zuseView',
//                         // iconCls: 'home'
//                         // baseCls: 'testcls1',
//                         // cls: 'testcls1',
//                     },
//                     {
//                         title: '预打单',
//                         xtype: 'printTaskListView',
//                         // iconCls: 'home'
//                         id: 'yudaView',
//                     },
//                     {
//                         title: '已打单',
//                         xtype: 'printTaskList',
//                         // iconCls: 'home'
//                         id: 'yidaView'
//                     },
//                     {
//                         title: '预打单',
//                         xtype: 'checkboxfield',
//                         // iconCls: 'user'
//                     },
            
//                 ],
            
            
//                 listeners: {
            
//                     initialize: function (thisArg, eOpts) {
//                         console.log(thisArg, eOpts)
//                         // var list = thisArg.items.map['zuseView'].items.map['list2'];
//                         var list = thisArg.down('#list2');
//                         // list.beginSimple();
//                         // list.down('#btnCancel').hide();
//                     },
//                     activate: function (newActiveItem, thisArg, oldActiveItem, eOpts) {
//                         console.log(newActiveItem, thisArg, oldActiveItem, eOpts)
//                     },
//                     activeitemchange: function (thisArg, value, oldValue, eOpts) {
//                         console.log(thisArg, value, oldValue, eOpts)
//                     },
//                 },
//             }
//         ]
//     },
// });    


Ext.define('myApp.view.PrintTaskListTabPanelView', {
    // alternateClassName: 'printTaskListTabPanelView',    
    extend: 'Ext.Panel',
    xtype: 'printTaskListTabPanelView',
    config: {

        items: [
            // {
            //     xtype: 'panel',
            //     items: [
                    
            //     ]
            // }
            // {
            //     title: '主页',
            //     html: '主页',
            //     iconCls: 'home'
            // },
            // {
            //     title: '111',
            //     xtype: 'fafafa',
            //     iconCls: 'home'
            // },
            // {
            //     xtype : 'checkboxfield',
            //     label : '入厨',
            //     name : 'kitchenPrint',
            //     id: 'addCommodityKtPrint',
            //     checked : true,
            //     hidden: false
            // },
            {
                title: '<strong style="color:red;">阻塞单</strong>',
                xtype: 'printTaskListView',
                id: 'zuseView',
                // iconCls: 'home'
                // baseCls: 'testcls1',
                // cls: 'testcls1',
            },
            {
                title: '预打单',
                xtype: 'printTaskListView',
                // iconCls: 'home'
                id: 'yudaView',
                hidden: true,
            },
            {
                title: '已打单',
                xtype: 'printTaskList',
                // iconCls: 'home'
                id: 'yidaView',
                hidden: true,
            },
            // {
            //     title: '预打单',
            //     xtype: 'checkboxfield',
            //     // iconCls: 'user'
            // },
    
        ],
    
    
        listeners: {
    
            initialize: function (thisArg, eOpts) {
                console.log(thisArg, eOpts)
                // var list = thisArg.items.map['zuseView'].items.map['list2'];
                var list = thisArg.down('#list2');
                // list.beginSimple();
                // list.down('#btnCancel').hide();
            },
            activate: function (newActiveItem, thisArg, oldActiveItem, eOpts) {
                console.log(newActiveItem, thisArg, oldActiveItem, eOpts)
            },
            activeitemchange: function (thisArg, value, oldValue, eOpts) {
                console.log(thisArg, value, oldValue, eOpts)
            },
        },
    },
});    

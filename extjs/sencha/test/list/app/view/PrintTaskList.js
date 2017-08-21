Ext.define('myApp.view.PrintTaskList', {
    // alternateClassName: 'printTaskList',
    extend: 'ux.SimpleList',
    // requires: ['app.view.new.Info'],
    xtype: 'printTaskList',
    config: {
        // { text: '内容', width:'38%', sortable: true, dataIndex: 'content', },
        // { text: '创建时间', width: '25%',  sortable: true,  dataIndex: 'createTime'},
        // { text: '目标', width: '10%', sortable: true,  dataIndex: 'target'},
        // { text: '状态', width: '12%', sortable: true,  dataIndex: 'status'},
        // { text: '来自', width: '10%', sortable: true,  dataIndex: 'from'},
        // { text: 'id', width: 100, sortable: true,  dataIndex: 'id',hidden:true },

        // store: 'newList',
        store: Ext.create('Ext.data.Store', {
            fields: ['id', 'content', 'createTime', 'target', 'status', 'from'],
            data: [
                { id: '1', content: '猪杂面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
                { id: '2', content: '牛肉面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
                { id: '3', content: '牛肉面 煎蛋 洗发水 剪刀 球鞋', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
            ]
        }),
        cls: 'list', //自定义css
        itemTpl: `
                <div class="sy-print-task-list">
                    <div class="content text-overflow">{content}</div><div class="createTime">{createTime}</div><div class="target">{target}</div><div class="status">{status}</div><div class="from">{from}</div><div class="id">{id}</div>
                </div>
                `
    }
});

// Ext.define('myApp.view.PrintTaskList', {
//     alternateClassName: 'printTaskList',
//     extend: 'Ext.Panel',
//     // requires: ['app.view.new.Info'],
//     xtype: 'printTaskList',
//     config: {

//         layout: {
//             type: 'vbox',
//         },
//         items: [
//             {
//                 html: 'I am test view111'
//             }
//         ]
//     },

//     initialize: function( thisArg, eOpts ) {
//         console.log(thisArg, eOpts)                
//     }

// });
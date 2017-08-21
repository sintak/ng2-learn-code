// -----------
Ext.define('myApp.view.PrintTaskListView', {
    alternateClassName: 'printTaskListView',
    extend: 'Ext.Panel',
    // requires: ['app.view.new.Info'],
    xtype: 'printTaskListView',
    config: {

        layout: {
            type: 'vbox',
        },
        items: [
            {
                xtype: 'panel',
                html: `
                <div class="sy-print-task-list list-header">
                    <div class="content">内容</div><div class="createTime">创建时间</div><div class="target">目标</div><div class="status">状态</div><div class="from">来自</div><div class="id">id</div>
                </div>
                `
            },
            {
                xtype: 'printTaskList',
                id: 'list2',
                height: 512,
            }
        ]
    },

    // initialize: function( thisArg, eOpts ) {
    //     console.log(thisArg, eOpts)                
    // }

});
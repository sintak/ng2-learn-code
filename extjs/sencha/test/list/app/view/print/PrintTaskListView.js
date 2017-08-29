/**
 * Created by lf on 2017/8/16.
 */

Ext.define('Seller.view.print.PrintTaskListView',
    // function () {
    //     return
    {
        alternateClassName: 'printTaskListView',
        extend: 'Ext.Container',
        xtype: 'printTaskListView',
        // alias: 'widget.printTaskListView',
        flex: 1,
        
        // layout: 'vbox',
        config: {
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    // xtype: 'panel',
                    xtype: 'fieldset',
                    id: 'fieldset1',
                    layout: 'hbox',
                    // instructions : '',
                    height: 48,
                    itval: 9999999,
                    // cls: 'jz-center',
                    defaults: {
                        xtype: 'radiofield',
                        name: 'rb',
                        width: 180,
                        labelWidth: 100,
                        labelAlign: 'right',
                        listeners: {
                            initialize: function (thisArg, eOpts) {
                                // console.log(thisArg, eOpts);
                            },
                            change: function (thisArg, newValue, oldValue, eOpts) {
                                // console.log(newValue);
                            },
                            destroy: function (thisArg, eOpts) {
                                ////var v1 = Ext.getCmp('rb1').getValue()['rb'];
                                // console.log(thisArg, eOpts);

                                clearInterval(thisArg.up().config.itval);
                            },
                            check: function (thisArg, e, eOpts) {
                                // console.log(thisArg, e, eOpts);
                                if (thisArg.getValue() == 1) {
                                    thisArg.up('printTaskListView').loadData();
                                    
                                    // Ext.getCmp('btnPrintBatch').show();
                                    thisArg.up('printTaskListView').down('titlebar').show();
                                    clearInterval(thisArg.up().config.itval);
                                }
                                else {
                                    thisArg.up('printTaskListView').loadData();
                                    
                                    // Ext.getCmp('btnPrintBatch').hide();
                                    thisArg.up('printTaskListView').down('titlebar').hide();
                                    
                                    clearInterval(thisArg.up().config.itval);
                                    thisArg.up().config.itval = setInterval(function () {
                                        // Ext.getCmp('printTaskListView1').loadData();
                                        thisArg.up('printTaskListView').loadData();
                                    }, 2000);
                                }
                            },
                        }
                    },
                    items: [
                        // {
                        //     xtype: 'spacer',
                        //     width: null,
                        //     listeners: {}
                        // },
                        {
                            label: '阻塞单',
                            id: 'print-blockTicket',
                            value: '1',
                            checked: true,
                        },
                        {
                            label: '预打单',
                            id: 'print-prepareTicket',
                            value: '2',
                        },
                        {
                            label: '已打单',
                            id: 'print-printedTicket',
                            value: '3',
                        },
                        // {
                        //     xtype: 'spacer',
                        //     width: null,
                        //     listeners: {}
                        // }
                    ]
                },
                {
                    html: '<div class="sy-print-task-list list-header">'
                    + '    <div class="content">内容</div><div class="createTime">创建时间</div><div class="target">目标</div><div class="status">状态</div><div class="from">来自</div><div class="id">id</div>'
                    + '</div>'
                    ,
                    height: 30
                },
                {
                    xtype: 'panel',
                    // id: 'blockTicketPanel',
                    // hidden: true,
                    flex: 1,
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'printTaskList',  // 需要一个panel包住，然后设置宽度，才能显示？
                            id: 'printTaskList1',
                            width: '100%',
                            // store: 'PrintTasks',                            
                            // store: Ext.create('Ext.data.Store', {
                            //     fields: ['id', 'content', 'createTime', 'target', 'status', 'from'],
                            //     data: [
                            //         { id: '1', content: '猪杂面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
                            //         { id: '2', content: '牛肉面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
                            //         { id: '3', content: '牛肉面 煎蛋 洗发水 剪刀 球鞋', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
                            //     ]
                            // }),
                            store: Ext.create('Ext.data.Store', { fields: ['id', 'content', 'createTime', 'target', 'status', 'from'] }),
                            itemTpl: '<div class="sy-print-task-list">'
                            + '    <div class="content text-overflow">{content}</div><div class="createTime">{createTime}</div><div class="target">{target}</div><div class="status">{status}</div><div class="from">{from}</div><div class="id">{id}</div>'
                            + '</div>'
                            ,
                            listeners: {
                                initialize: function (thisArg, eOpts) {
                                    var simpleToolBar = Ext.create('Ext.TitleBar', thisArg.config.simpleToolBar);
                                    thisArg.add(simpleToolBar);
                                },

                                // simpleSuccess: function (list, items, ids, simpleType) {
                                //     console.log(ids);
                                // }
                                activate: function (newActiveItem, thisArg, oldActiveItem, eOpts) {
                                    // console.log('activate');

                                    // var store = thisArg.down('printTaskList').getStore();  // ok
                                    // store.add({ id: '11', content: '猪杂面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' })
                                    // store.add({ id: '12', content: '猪杂面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' })
                                    // store.add({ id: '13', content: '猪杂面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' })
                                    // store.add({ id: '14', content: '猪杂面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' })

                                },
                                show: function (thisArg, eOpts) {  // not work
                                    // console.log('show');
                                }
                            }

                        },
                    ]
                },
                {
                    xtype: 'panel',
                    hidden: true,
                    flex: 1,
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'list',  // in panel
                            width: '100%',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['id', 'StudentName'],
                                data: [
                                    { id: '1', StudentName: 'Alice' },
                                    { id: '2', StudentName: 'Lily' },
                                    { id: '3', StudentName: 'Frank2' },
                                ]
                            }),
                            itemTpl: new Ext.XTemplate('<div style"width=200px;heigth:20px;">{StudentName}</div>'),
                        },
                    ]
                },
            ]
        },

        loadData: function () {
            var status = -1;  // (0预打印/>=1已打印（份数）/-1阻塞)            
            if (Ext.getCmp('print-blockTicket').isChecked()) {
                status = -1;  // 阻塞单
            }
            if (Ext.getCmp('print-prepareTicket').isChecked()) {
                status = 0;  // 未打印
                
            }
            if (Ext.getCmp('print-printedTicket').isChecked()) {
                status = 1;  // >=1已打印                
            }
            loadPrintTask(status);            
        }
    }
    // }
);


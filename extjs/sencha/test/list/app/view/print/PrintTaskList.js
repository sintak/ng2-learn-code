/**
 * Created by lf on 2017/8/22.
 */

Ext.define('Seller.view.print.PrintTaskList',
    // function() {
    // return
    {
        alternateClassName: 'printTaskList',
        extend: 'Ext.List',
        xtype: 'printTaskList',
        requires: ['ux.plugin.Remember'],
        config: {
            ckId: 'id',

            cls: 'list',
            title: '对象选择',
            cls: 'select',
            mode: 'SIMPLE',
            plugins: ['remember'],
            selectedCls: 'list-item-selected',
            itemTpl: '<div>{StudentName}</div>',
            // store: 'peopleList',
            store: Ext.create('Ext.data.Store', {
                fields: ['id', 'StudentName'],
                data: [
                    { id: '1', StudentName: 'Alice' },
                    { id: '2', StudentName: 'Lily' },
                    { id: '3', StudentName: 'Frank' },
                ]
            }),
            // store: 'PrintTasks',
            onItemDisclosure: true,
            grouped: true,

            simpleToolBar: {
                //默认位置
                docked: 'bottom',
                //默认标题，用以应对多种选择情况
                defTitle: '打印',
                items: [
                    {
                        xtype: 'button',
                        id: 'btnSelectAll',
                        // hidden: true,
                        text: '全选',
                        align: 'left',
                        //标志是全选还是取消全选
                        isSimple: false,
                        listeners: {
                            tap: function (thisArg, e, eOpts) {
                                var list = thisArg.up('list');
                                if (thisArg.initialConfig.isSimple) {
                                    thisArg.setText('全选');
                                    list.deselectAll();
                                } else {
                                    thisArg.setText('取消全选');
                                    list.selectAll();
                                }
                                // thisArg.initialConfig.isSimple = !thisArg.initialConfig.isSimple;
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        id: 'btnCancel',
                        hidden: true,
                        cls: 'moreButton',
                        text: '取消',
                        align: 'right',
                        listeners: {
                            tap: function (button) {
                                var list = button.up('list');
                                //结束多选
                                // list.endSimple(list);
                            }
                        }
                    },
                    {
                        cls: 'moreButton',
                        xtype: 'button',
                        // id: 'btnPrintBatch',
                        text: '批量打印',
                        align: 'right',
                        listeners: {
                            tap: function (button) {
                                var list = button.up('list');
                                var items = list.getSelection();
                                //获取选中项
                                var ids = [];
                                for (var i = 0, item; item = items[i]; i++) {
                                    ids.push(item.data[list.config.ckId]);
                                }
                                if (ids.length > 0) {
                                    //触发选择成功事件list:list本身,items:被选中的行,ids:被选中key集合,list.config.simpleType:自定义配置状态
                                    list.fireEvent('simpleSuccess', list, items, ids, list.config.simpleType);
                                    //结束多选
                                    // list.endSimple(list);
                                }
                            }
                        }
                    }]
            },

            listeners: {
                // init: function() {
                //     var simpleToolBar = Ext.create('Ext.TitleBar', this.config.simpleToolBar);
                //     this.add(simpleToolBar);
                // },
                initialize: function (thisArg, eOpts) {
                    // var simpleToolBar = Ext.create('Ext.TitleBar', this.config.simpleToolBar);
                    // this.add(simpleToolBar);
                },
                // activate: function( newActiveItem, thisArg, oldActiveItem, eOpts )           {

                //     var simpleToolBar = Ext.create('Ext.TitleBar', this.config.simpleToolBar);
                //     this.add(simpleToolBar);
                // },
                // show: function( thisArg, eOpts ) {

                //     var simpleToolBar = Ext.create('Ext.TitleBar', this.config.simpleToolBar);
                //     this.add(simpleToolBar);
                // },
                itemtap: function (thisArg, index, target, record, e, eOpts) {

                },
                select: function (thisArg, record, eOpts) {
                    if (thisArg.selected.length >= thisArg.listItems.length) {//.getStore().data.items.length) {
                        thisArg.down('#btnSelectAll').initialConfig.isSimple = true;
                        thisArg.down('#btnSelectAll').setText("取消全选");
                    }
                },
                deselect: function (thisArg, record, supressed, eOpts) {
                    if (thisArg.selected.length < thisArg.listItems.length) {
                        thisArg.down('#btnSelectAll').initialConfig.isSimple = false;
                        thisArg.down('#btnSelectAll').setText("全选");
                    }
                }
            }
        }, // end config
        // }
        init: function () {
            console.log('init')  // not work

        }
    });


var helloTouchApp = new Ext.application({ //利用框架的Application类的构造函数构造一个应用
    name: 'myApp', //为这个应用指定名称
    useLoadMask: true, //页面读取完毕前会显示“Loading...”字样
    launch: function () { //这是程序的入口
        // Ext.Msg.alert('Hi', 'Hello Sencha Touch', Ext.emptyFn);//弹出窗口标题Hi，内容Hello Sencha Touch


        /*
        * 记住列表选择状态
        * 如果分组，支持点击全选按钮全选分组
        * 需要添加以下css
        .select .x-list-header:before {
            content:"全选";
            right:0;
            position:absolute;
            width:3em;
            text-align:center;
        }
        */

        Ext.define('ux.plugin.Remember', {
            extend: 'Ext.Component',
            alias: 'plugin.remember',
            xtype: 'remember',
            config: {
                //Reference a function in the plugin configuration to specify a default selection. It should return an Array or Mixed Collection of records whose corresponding list items will be selected by default.
                getDefaultSelectionRecords: Ext.emptyFn,

                //Setting this property to true will supress the selection event when restoring default or "remembered" selections
                supressEvent: false,

                //Private
                list: null,

                
            },

            //Establishes the event handlers
            init: function (list) {
                var me = this;
                me.setList(list);
                var store = list.getStore();
                if (list.getGrouped()) {
                    list.addCls('select');
                    //如果支持分组，监听表头点击事件
                    list.container.element.on({
                        delegate: 'div.x-list-header',
                        tap: 'onHeaderTap',
                        scope: me
                    });
                    list.setScrollToTopOnRefresh(false);
                    list.handlePinnedHeader = function () { };
                }
                //监听选中项，在选中之前执行
                list.onBefore({
                    selectionchange: 'rememberSelections',
                    painted: 'restoreSelections',
                    scope: me
                });

                //监听数据源,在数据load之后执行,用以支持远程数据
                store.onAfter(({
                    load: 'restoreSelections',
                    scope: me
                }));

            },
            //点击表头
            onHeaderTap: function (e, node) {
                //根据节点css判断点击元素，也可以通过node.clientWidth - e.pageX计算点击位置来判断
                var me = this, list = me.getList();
                if (node.classList.length >= 4) {
                    var header = e.getTarget('div.x-list-header', 2, true),
                        scroller = e.getTarget('div.x-scroll-scroller', 3, true),
                        headers = scroller.query('div.x-list-header'),
                        index = header ? headers.indexOf(header.dom) : false,
                        store = list.getStore(),
                        groups = store.getGroups(),
                        group = groups[index],
                        records = group.children,
                        record,
                        i,
                        ln;
                    //进行全选操作
                    list.select(records, true);
                }
            },
            //恢复选择状态
            restoreSelections: function () {
                var me = this,
                    list = me.getList();

                //获取选中项
                var selected = list.getStore().queryBy(function (record, id) {
                    return record.get('selected');
                }).getRange();

                if (!Ext.isEmpty(selected)) {
                    //开始选择
                    //重置选择状态，用以触发事件
                    list.deselectAll(true);
                    list.select(selected, false, me.getSupressEvent());
                } else {
                    //如果没有“记住”选项，恢复所有默认选项
                    var fn = me.getGetDefaultSelectionRecords();
                    var defaultselectionrecords = fn(list);
                    if (!Ext.isEmpty(defaultselectionrecords)) {
                        list.select(defaultselectionrecords, false, me.getSupressEvent());
                    }
                }
            },

            //记住选择状态
            rememberSelections: function (list, records) {
                var store = list.getStore();
                var proxy = store.getProxy();

                //如果是单选状态，重置选择标识状态
                if (list.getMode() == 'SINGLE') {
                    store.each(function (record) {
                        if (record.get('selected')) {
                            record.set('selected', false);
                        }
                    });
                }

                //记住选择状态
                Ext.each(records, function (record) {
                    //可能会出错，抛出异常
                    try { record.set('selected', list.isSelected(record)); } catch (e) { }
                }, this);

                ////重置筛选器
                //if (!Ext.isEmpty(store.getFilters())) {
                //    store.filter();
                //}
            }
        });



        /*
        *选择对象
        */
        Ext.define('app.view.tiny.People', {
            alternateClassName: 'tinyPeople',
            extend: 'Ext.List',
            xtype: 'tinyPeople',
            // requires: ['ux.plugin.Remember'],
            config: {
                ckId: 'id',

                cls: 'list',
                title: '对象选择',
                cls: 'select',
                mode: 'SIMPLE',
                // plugins: ['remember'],
                selectedCls: 'list-item-selected',
                itemTpl: '<div>{StudentName}</div>',
                // store: 'peopleList',
                store: Ext.create('Ext.data.Store', {
                    fields: ['id', 'StudentName'],
                    data: [
                        { id: '1', StudentName: 'Alice'},
                        { id: '2', StudentName: 'Lily'},
                        { id: '3', StudentName: 'Frank'},
                    ]
                }),
                onItemDisclosure: true,
                grouped: true,

                simpleToolBar: {
                    //默认位置
                    docked: 'bottom',
                    //默认标题，用以应对多种选择情况
                    defTitle: '打印',
                    items: [{
                        xtype: 'button',
                        text: '全选',
                        align: 'left',
                        //标志是全选还是取消全选
                        isSimple: true,
                        listeners: {
                            tap: function (button) {
                                var list = button.up('list');
                                if (this.isSimple) {
                                    this.setText('取消全选');
                                    list.selectAll();
                                } else {
                                    this.setText('全选');
                                    list.deselectAll();
                                }
                                this.isSimple = !this.isSimple;
                            }
                        }
                    },
                    {
                        id: 'btnCancel',
                        hidden: true,
                        cls: 'moreButton',
                        xtype: 'button',
                        text: '取消',
                        align: 'right',
                        listeners: {
                            tap: function (button) {
                                var list = button.up('list');
                                //结束多选
                                list.endSimple(list);
                            }
                        }
                    },
                    {
                        cls: 'moreButton',
                        xtype: 'button',
                        text: '确定',
                        align: 'right',
                        listeners: {
                            tap: function (button) {
                                var list = button.up('list');
                                var items = list.getSelection();
                                //获取选中项
                                var ids = [];
                                for (var i = 0,
                                    item; item = items[i]; i++) {
                                    ids.push(item.data[list.config.ckId]);
                                }
                                if (ids.length > 0) {
                                    //触发选择成功事件list:list本身,items:被选中的行,ids:被选中key集合,list.config.simpleType:自定义配置状态
                                    list.fireEvent('simpleSuccess', list, items, ids, list.config.simpleType);
                                    //结束多选
                                    list.endSimple(list);
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
                    initialize: function( thisArg, eOpts ) {
    
                        var simpleToolBar = Ext.create('Ext.TitleBar', this.config.simpleToolBar);                
                        this.add(simpleToolBar);
                    },
                    // activate: function( newActiveItem, thisArg, oldActiveItem, eOpts )           {
                        
                    //     var simpleToolBar = Ext.create('Ext.TitleBar', this.config.simpleToolBar);                
                    //     this.add(simpleToolBar);
                    // },
                    // show: function( thisArg, eOpts ) {
                        
                    //     var simpleToolBar = Ext.create('Ext.TitleBar', this.config.simpleToolBar);                
                    //     this.add(simpleToolBar);
                    // }
                }
            }, // end config
            
        });

        // Ext.define('app.view.new.PrintTaskListView', {
        //     alternateClassName: 'printTaskListView',
        //     extend: 'Ext.Panel',
        //     // requires: ['app.view.new.Info'],
        //     xtype: ['printTaskListView'],
        //     config: {

        //         layout: {
        //             type: 'vbox',
        //         },
        //         items: [
        //             {
        //                 xtype: 'panel',
        //                 html: `
        //                 <div class="sy-print-task-list">
        //                     <div class="content">内容</div><div class="createTime">创建时间</div><div class="target">目标</div><div class="status">状态</div><div class="from">来自</div><div class="id">id</div>
        //                 </div>
        //                 `
        //             },
        //             {
        //                 xtype: 'tinyPeople',
        //                 id: 'list2',
        //                 height: 512,
        //             },
        //         ]
        //     },
            
        //     // initialize: function( thisArg, eOpts ) {
        //     //     console.log(thisArg, eOpts)                
        //     // }
            
        // });


        var tinyPeopleView = Ext.create('tinyPeople', {
        });
        Ext.Viewport.add(tinyPeopleView);
        
        // var tabPanel = Ext.create('Ext.TabPanel', {
        //     id: 'tabPanel',
        //     // ui: 'light',
        //     ui: '',
        //     tabBarPosition: 'top',
        //     config: {
        //         // baseCls: '',
        //         // cls: '',
        //         // background: 'red'
        //     },
            
        //     items: [
        //         // {
        //         //     title: '主页',
        //         //     html: '主页',
        //         //     iconCls: 'home'
        //         // },
        //         // {
        //         //     title: '111',
        //         //     xtype: 'fafafa',
        //         //     iconCls: 'home'
        //         // },
        //         {
        //             title: '<strong style="color:red;">阻塞单</strong>',
        //             xtype: 'printTaskListView',
        //             id: 'zuse',
        //             // iconCls: 'home'
        //             // baseCls: 'testcls1',
        //             // cls: 'testcls1',
        //         },
        //         {
        //             title: '预打单',
        //             xtype: 'printTaskListView',
        //             // iconCls: 'home'
        //             id: 'yuda',
        //         },
        //         {
        //             title: '已打单',
        //             xtype: 'printTaskListView',
        //             // iconCls: 'home'
        //             id: 'yida'                    
        //         },
        //         // {
        //         //     title: '预打单',
        //         //     xtype: 'newList',
        //         //     iconCls: 'user'
        //         // },
                
        //     ],

            
        //     listeners: {
                
        //         initialize: function( thisArg, eOpts ) {
        //             console.log(thisArg, eOpts)
        //             // var list = thisArg.items.map['zuse'].items.map['list2'];
        //             var list = thisArg.down('#list2');
        //             // list.beginSimple();
        //             // list.down('#btnCancel').hide();
        //         },
        //         activate: function( newActiveItem, thisArg, oldActiveItem, eOpts ) {
        //             console.log(newActiveItem, thisArg, oldActiveItem, eOpts)
        //         },
        //         activeitemchange: function( thisArg, value, oldValue, eOpts ){
        //             console.log(thisArg, value, oldValue, eOpts)
        //         },
        //     },
        // });
        // Ext.Viewport.add(tabPanel);


    }
})
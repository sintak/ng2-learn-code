
var helloTouchApp = new Ext.application({ //利用框架的Application类的构造函数构造一个应用
    name: 'myApp', //为这个应用指定名称
    useLoadMask: true, //页面读取完毕前会显示“Loading...”字样
    launch: function () { //这是程序的入口
        // Ext.Msg.alert('Hi', 'Hello Sencha Touch', Ext.emptyFn);//弹出窗口标题Hi，内容Hello Sencha Touch

        /*
*list多选扩展
*/
        Ext.define('ux.SimpleList', {
            alternateClassName: 'simpleList',
            extend: 'Ext.List',
            xtype: 'simpleList',
            config: {
                // itemTpl: new Ext.XTemplate('<div class="left w20"><div class="img" style="background: url({litpic}) no-repeat center;background-size: 100%;"></div></div>', '<div class="right w80"><div class="row">{title}</div><div class="row grayF">{time}</div></div>'),
            
                editCls: 'simpleList',
                //不加在长按时可能没反应
                onItemDisclosure: false,
                //是否在多选状态（不可更改）
                isSimple: false,
                //设置数据主键(可配置)
                ckId: 'id',
                //默认选择类型，用以应对多种选择情况
                defSimpleType: 0,
                //多选时弹出菜单栏(可配置)
                simpleToolBar: {
                    //默认位置
                    docked: 'bottom',
                    //默认标题，用以应对多种选择情况
                    defTitle: '删除',
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
                    //监控是否在多选状态
                    itemtap: function (list, index, target, record, e) {
                        //如果在多选状态停止后续事件的执行
                        if (this.config.isSimple) {
                            e.stopEvent();
                        }
                    },
                    //只要按键长按住就会触发，和按键是否离开没有关系
                    itemtaphold: function (list, index, target, record, e) {
                        //开始多选
                        this.beginSimple();
                    }
                }
            },
            //获取多选边栏
            getSimpleToolBar: function () {
                var simpleToolBar = Ext.create('Ext.TitleBar', this.config.simpleToolBar);
                return simpleToolBar;
            },
            //进入多选状态
            beginSimple: function (simpleType, title) {
                if (!this.config.isSimple) {
                    //取消全选
                    this.deselectAll();
                    //进入多选模式
                    this.setMode('SIMPLE');
                    //添加css
                    this.addCls(this.config.editCls);
                    //显示OnItemDisclosure
                    this.setOnItemDisclosure(true);
                    //加入标记，以便在itemtap事件中进行判定
                    this.config.isSimple = true;
                    //应对多种选择需求
                    if (simpleType) {
                        this.config.simpleType = simpleType;
                    } else {
                        this.config.simpleType = this.config.defSimpleType;
                    }
                    //改变标题
                    if (title) {
                        this.config.simpleToolBar.title = title;
                    } else {
                        this.config.simpleToolBar.title = this.config.simpleToolBar.defTitle;
                    }
                    //添加多选边栏
                    this.add(this.getSimpleToolBar());
                }
            },
            //结束多选模式
            endSimple: function () {
                var titlebar = this.down('titlebar');
                if (titlebar) {
                    //移除多选边栏
                    titlebar.hide();
                    titlebar.destroy();
                    //取消全选
                    this.deselectAll();
                    //进入单选模式
                    this.setMode('SINGLE');
                    //移除css
                    this.removeCls(this.config.editCls);
                    //隐藏OnItemDisclosure
                    this.setOnItemDisclosure(false);
                    //加入标记，以便在itemtap事件中进行判定
                    this.config.isSimple = false;
                }
            },
            //更新OnItemDisclosure需要
            updateOnItemDisclosure: function (newConfig, oldConfig) {
                if (oldConfig == null) {
                    return;
                }
                var items = this.listItems;
                for (var i = 0,
                    ln = items.length; i < ln; i++) {
                    var dItem = items[i].getDisclosure();
                    newConfig === false ? dItem.hide() : dItem.show();
                }
            },
            
        });

        Ext.define('app.view.new.List', {
            alternateClassName: 'newList',
            extend: 'ux.SimpleList',
            // requires: ['app.view.new.Info'],
            xtype: 'newList',
            config: {
                // store: 'newList',
                store: Ext.create('Ext.data.Store', {
                    fields: ['litpic', 'title', 'time'],
                    data: [
                        { litpic: './pic02.jpg', title: 'title1fsdfasfasf', time: '12:00' },
                        { litpic: 'https://www.baidu.com/img/bd_logo1.png', title: 'aaaaaaaabbbbbbbcccccccddddddddeeeeeeeeeeffffffffffggggggggg', time: '12:01' },
                        { litpic: 'https://www.baidu.com/img/bd_logo1.png', title: 'title3fsdfsafasf', time: '12:02' },
                        { litpic: 'https://www.baidu.com/img/bd_logo1.png', title: 'title4', time: '12:03' },
                    ]
                }),
                cls: 'list', //自定义css
                itemTpl: new Ext.XTemplate('<div class="left w20"><div class="img" style="background: url({litpic}) no-repeat center;background-size: 100%;"></div></div><div class="right w80"><div class="row">{title}</div><div class="row grayF">{time}</div></div>')
            }
        });



        var panel = Ext.create('Ext.Panel', {
            layout: 'vbox',
            height: '100%',
            items: [
                {
                    xtype: 'button',
                    text: '确定',
                    cls: 'testcls1'
                },
                // {
                //     xtype: 'simpleList',
                //     id: 'list1',
                //     height: 512,
                //     store: Ext.create('Ext.data.Store', {
                //         fields: ['litpic', 'title', 'time'],
                //         data: [
                //             { litpic: './pic02.jpg', title: 'title1', time: '12:00' },
                //             { litpic: 'https://www.baidu.com/img/bd_logo1.png', title: 'title2', time: '12:01' },
                //             { litpic: 'https://www.baidu.com/img/bd_logo1.png', title: 'title3', time: '12:02' },
                //             { litpic: 'https://www.baidu.com/img/bd_logo1.png', title: 'title4', time: '12:03' },
                //         ]
                //     })
                // },
                {
                    xtype: 'newList',
                    id: 'list1',
                    height: 512,
                },
                {
                    xtype: 'button'
                },
            ]
        });
        Ext.Viewport.add(panel);
        var list1 = Ext.getCmp('list1');
        console.log(list1);
        var store = list1.getStore();
        console.log(store);
        store.add([{ litpic: './pic02.jpg', title: 'title5', time: '12:04' }])

    }
})
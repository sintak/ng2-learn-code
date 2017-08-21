// Ext.require([
//     'ux.plugin.Remember'
// ]);  // 效果和类定义时requires一样

Ext.define('myApp.view.TinyPeople', {
    alternateClassName: 'tinyPeople',
    extend: 'Ext.List',
    xtype: 'tinyPeople',
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

Ext.define('myApp.view.TinyPeopleView', {
    extend: 'Ext.Container',
    xtype: 'tinyPeopleView',
    flex : 1,
    
    // layout: 'vbox',
    config: {
        layout: {
            type : 'vbox'
        },
        items: [
            {
                html: 'i am TinyPeopleView top',
                id: 'tpvh',
                hidden: true,
            },
            // {
            //     xtype: 'tinyPeople'
            // },
            {
                xtype : 'panel',
                //height : clientHeight - 65,
                flex : 1,
                layout : {
                    type : 'hbox'
                },
                items: [
                    {
                        xtype: 'tinyPeople',  // 需要一个panel包住，然后设置宽度，才能显示？
                        width: '100%',
                        // store: Ext.create('Ext.data.Store', {
                        //     fields: ['id', 'StudentName'],
                        //     data: [
                        //         { id: '1', StudentName: 'Alice'},
                        //         { id: '2', StudentName: 'Lily'},
                        //         { id: '3', StudentName: 'Frank'},
                        //     ]
                        // }),
                        // itemTpl: new Ext.XTemplate('<div style"width=200px;heigth:20px;">{StudentName}</div>'),
                    },
                ]
            },            
            {
                html: 'i am TinyPeopleView bottom',
                id: 'tpvh1',
                hidden: true,
            },
        ]
    },
});
    
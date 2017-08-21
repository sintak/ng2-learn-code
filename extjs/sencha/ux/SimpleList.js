/*
*list多选扩展
*/
Ext.define('ux.SimpleList', {
    alternateClassName: 'simpleList',
    extend: 'Ext.List',
    xtype: 'simpleList',
    config: {
        editCls: 'simpleList',
        //是否在多选状态（不可更改）
        isSimple: false,
        //设置数据主键(可配置)
        ckId: 'id',
        //多选时弹出菜单栏(可配置)
        simpleToolBar: {
            //默认位置
            docked: 'bottom',
            //默认标题
            title: '删除',
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
                        //移除多选栏
                        this.getParent().getParent().hide();
                        this.getParent().getParent().destroy();
                        //结束多选
                        list.endSimple();
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
                            ids.push(item.data[.config.ckId]);
                        }
                        //移除多选边栏
                        this.getParent().getParent().hide();
                        this.getParent().getParent().destroy();
                        //结束多选
                        list.endSimple();
                        //触发选择成功事件
                        list.fireEvent('simpleSuccess', ids);
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
    beginSimple: function () {
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
            //添加多选边栏
            this.add(this.getSimpleToolBar());
        }
    },
    //结束多选模式
    endSimple: function () {
        console.log('endSimple');
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
    }
});
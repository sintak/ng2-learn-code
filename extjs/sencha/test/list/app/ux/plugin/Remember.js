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


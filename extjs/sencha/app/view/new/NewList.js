Ext.define('app.view.new.List', {
    alternateClassName: 'newList',
    extend: 'ux.SimpleList',
    requires: ['app.view.new.Info'],
    xtype: 'newList',
    config: {
        store: 'newList',
        cls: 'list', //自定义css
        itemTpl: new Ext.XTemplate('<div class="left w20"><div class="img" style="background: url({litpic}) no-repeat center;background-size: 100%;"></div></div>', '<div class="right w80"><div class="row">{title}</div><div class="row grayF">{time}</div></div>')
    }
});
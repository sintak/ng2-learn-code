Ext.define('AM.view.user.UserList' ,{
    // alternateClassName: 'userlist',  // 似乎没效果
    // extend: 'Ext.grid.Panel',
    extend: 'Ext.Panel',
    // alias : 'widget.userlist',  // 效果和xtype属性一样
    xtype: 'userlist',
    // id: 'userlist',
    title : 'All Users',

    // initComponent: function() {
    //     this.store = {
    //         fields: ['name', 'email'],
    //         data  : [
    //             {name: 'Ed',    email: 'ed@sencha.com'},
    //             {name: 'Tommy', email: 'tommy@sencha.com'}
    //         ]
    //     };

    //     this.columns = [
    //         {header: 'Name',  dataIndex: 'name',  flex: 1},
    //         {header: 'Email', dataIndex: 'email', flex: 1}
    //     ];

    //     this.callParent(arguments);
    // }

    config: {

        items: [
            {
                html: 'UserList'
            },
            {
                xtype: 'userdetail'
            }
        ],
    }
});
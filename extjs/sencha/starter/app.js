Ext.Loader.setPath({
    // 'Ext.ux': 'ux',
    // 'Ext': 'shared',
    'AM': 'app',
    'ux': 'app/ux'
});

// for debug ?
Ext.Loader.setConfig({
    disableCaching: false
});


Ext.application({
    //今天有人问我，demo运行出错，
    //他妹的，官方demo错了 官方demo写的是 requires: 'Ext.container.Viewport'，
    //这里的requires需要是个数组，extjs源码没处理好只有一个requires的情况
    // requires: ['Ext.container.Viewport'],    
    name: 'AM',

    // appFolder: 'app',

    controllers: ['Users'],

    launch: function() {

        console.log("app launch.")

        // Ext.create('Ext.container.Viewport', {
        //     layout: 'fit',
        //     items: [
        //         {
        //             xtype: 'panel',
        //             title: 'Users',
        //             html : 'List of users will go here'
        //         }
        //     ]
        // });


        var panel = Ext.create('Ext.Panel', {
            // layout: 'fit',
            layout: 'vbox',
            items: [
                // {
                //     xtype: 'panel',
                //     title: 'Users',
                //     html : 'List of users will go here'
                // }
                {
                    xtype: 'userlist',
                }
            ]
        });
        Ext.Viewport.add(panel);

        // var panel = Ext.create('AM.view.user.UserList', {});
        // Ext.Viewport.add(panel);
    }
});
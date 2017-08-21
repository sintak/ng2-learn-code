Ext.define('AM.controller.Users', {
    extend: 'Ext.app.Controller',
    // requires: ["AM.view.user.UserList"],
    
    config: {
        views: ["user.UserList", "user.UserDetail"],  // 配置config里的views属性也能加载
        
        refs: {
            // userlist: 'userlist'
        }
        // refs: [{
        //     userlist: {
        //         ref: 'userList',
        //         selector: 'UserList'
        //     }
        // }]
    },

    init: function () {  // init方法会在app.js的launch之前调用
        console.log('Initialized Users! This happens before the Application launch function is called');

        this.control(
            {
                // "viewport panel panel" : {
                "viewport > panel": {
                    activate: this.onPanelRendered,
                }
            }
        );
    },

    onPanelRendered: function () {
        console.log('The panel was rendered');
    }
});
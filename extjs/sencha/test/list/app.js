
var helloTouchApp = new Ext.application({ //利用框架的Application类的构造函数构造一个应用
    name: 'myApp', //为这个应用指定名称
    useLoadMask: true, //页面读取完毕前会显示“Loading...”字样
    launch: function () { //这是程序的入口
        // Ext.Msg.alert('Hi', 'Hello Sencha Touch', Ext.emptyFn);//弹出窗口标题Hi，内容Hello Sencha Touch


        // var myList = Ext.create('Ext.List', {
        //     fullscreen: true, 
        //     store: { 
        //         fields: ['name'], 
        //         data: [
        //             { name: 'Cowper' }, 
        //             { name: 'Everett' }, 
        //             { name: 'University' }, 
        //             { name: 'Forest' }
        //         ] 
        //     }, 
        //     itemTpl: '{name}',     
        //     //点击那个小三角会执行这里     
        //     onItemDisclosure: function (record, d, a, b, c) {  // 定义了这个事件处理器，界面会在item后面自动添加一个箭头
        //         //创建一个view，然后跳过去，还可以返回过来         
        //         var panel = Ext.create("Ext.Panel", {
        //             fullscreen: true, 
        //             html: record.get("name"),
        //             items: [{
        //                 xtype: 'toolbar', docked: 'top', items: [{
        //                     xtype: 'button', ui: 'back', text: '返回',
        //                     handler: function () {
        //                         //返回按钮事件                 
        //                         //显示列表页                 
        //                         Ext.Viewport.setActiveItem(myList);
        //                         //销毁上次跳出的view                 
        //                         panel.destroy();
        //                     }
        //                 }]
        //             }]
        //         });
        //         //添加到容器             
        //         Ext.Viewport.add(panel);
        //         //显示             
        //         Ext.Viewport.setActiveItem(panel);
        //         //停止事件冒泡，防止他执行itemtap事件         
        //         b.stopPropagation();
        //     },
        //     listeners: {
        //         //先择一项会执行,只是执行一次       
        //         select: function (view, record) {
        //             //Ext自带的  alert     
        //             Ext.Msg.alert('Selected!', 'You  selected ' + record.get('name'));
        //         },
        //         //点击行时执行     
        //         itemtap: function (list, index, target, record, e) {
        //             //当然，你也可以在点击行的时候跳转到别一个view，看onItemDisclosure中的代码          

        //             Ext.Msg.alert("itemtap", record.get("name"));
        //         }
        //     }
        // });




        // =========================
        Ext.define('Contact',
            {
                extend: 'Ext.data.Model',
                config: {
                    fields: ['firstName', 'lastName']
                }
            });

        var store = Ext.create('Ext.data.Store',
            {
                model: 'Contact',
                sorters: 'lastName',
                //分组函数
                grouper: {
                    groupFn: function (record) {
                        return record.get('lastName')[0];
                    }
                },
                data:
                [
                    {
                        firstName: 'Tommy',
                        lastName: 'Maintz'
                    },
                    {
                        firstName: 'Rob',
                        lastName: 'Dougan'
                    },
                    {
                        firstName: 'Ed',
                        lastName: 'Spencer'
                    },
                    {
                        firstName: 'Jamie',
                        lastName: 'Avins'
                    },
                    {
                        firstName: 'Aaron',
                        lastName: 'Conran'
                    },
                    {
                        firstName: 'Dave',
                        lastName: 'Kaneda'
                    },
                    {
                        firstName: 'Jacky',
                        lastName: 'Nguyen'
                    },
                    {
                        firstName: 'Abraham',
                        lastName: 'Elias'
                    },
                    {
                        firstName: 'Jay',
                        lastName: 'Robinson'
                    },
                    {
                        firstName: 'Nigel',
                        lastName: 'White'
                    },
                    {
                        firstName: 'Don',
                        lastName: 'Griffin'
                    },
                    {
                        firstName: 'Nico',
                        lastName: 'Ferrero'
                    },
                    {
                        firstName: 'Jason',
                        lastName: 'Johnston'
                    }
                ]
            });

        //创建一个全屏的list
        var myList = Ext.create('Ext.List',
            {
                fullscreen: true,
                store: store,
                //分组
                grouped: true,
                //索引栏
                indexBar: true,
                itemTpl: '{firstName}++++++{lastName}',
                //点击那个小三角会执行这里
                onItemDisclosure: function (record, d, a, b, c) {
                    //创建一个view，然后跳过去，还可以返回过来
                    var panel = Ext.create("Ext.Panel", {
                        fullscreen: true,
                        html: record.get("name"),
                        items: [{
                            xtype: 'toolbar',
                            docked: 'top',
                            items: [{
                                xtype: 'button',
                                ui: 'back',
                                text: '返回',
                                handler: function () {
                                    //返回按钮事件
                                    //显示列表页
                                    Ext.Viewport.setActiveItem(myList);
                                    //销毁上次跳出的view
                                    panel.destroy();
                                }
                            }]
                        }]
                    });
                    //添加到容器
                    Ext.Viewport.add(panel);
                    //显示
                    Ext.Viewport.setActiveItem(panel);
                    //停止事件冒泡，防止他执行itemtap事件
                    b.stopPropagation();
                },
                listeners:
                {
                    //先择一项会执行,只是执行一次
                    select: function (view, record) {
                        //Ext自带的
                        alert
                        Ext.Msg.alert('Selected!', 'You selected ' + record.get('name'));
                    },
                    //点击行时执行
                    itemtap: function (list, index, target, record, e) {
                        //当然，你也可以在点击行的时候跳转到别一个view，看onItemDisclosure中的代码
                        Ext.Msg.alert("itemtap", record.get("name"));
                    }
                }
            });

























    }
})
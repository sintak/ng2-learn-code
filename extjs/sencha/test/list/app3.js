Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath({
    // 'Ext.ux': 'ux',
    // 'Ext': 'shared',
    'myApp': 'app',
    'ux': 'app/ux'
});

// for debug ?
Ext.Loader.setConfig({
    disableCaching: false
});


var helloTouchApp = new Ext.application({ //利用框架的Application类的构造函数构造一个应用
    name: 'myApp', //为这个应用指定名称
    autoCreateViewport: true,
    useLoadMask: true, //页面读取完毕前会显示“Loading...”字样
    controllers: [
        'New'
    ],
    launch: function () { //这是程序的入口
        // Ext.Msg.alert('Hi', 'Hello Sencha Touch', Ext.emptyFn);//弹出窗口标题Hi，内容Hello Sencha Touch


        
        // Ext.define('app.view.new.List', {
        //     alternateClassName: 'newList',
        //     extend: 'ux.SimpleList',
        //     // requires: ['app.view.new.Info'],
        //     xtype: 'newList',
        //     config: {
        //         // { text: '内容', width:'38%', sortable: true, dataIndex: 'content', },
        //         // { text: '创建时间', width: '25%',  sortable: true,  dataIndex: 'createTime'},
        //         // { text: '目标', width: '10%', sortable: true,  dataIndex: 'target'},
        //         // { text: '状态', width: '12%', sortable: true,  dataIndex: 'status'},
        //         // { text: '来自', width: '10%', sortable: true,  dataIndex: 'from'},
        //         // { text: 'id', width: 100, sortable: true,  dataIndex: 'id',hidden:true },

        //         // store: 'newList',
        //         store: Ext.create('Ext.data.Store', {
        //             fields: ['id', 'content', 'createTime', 'target', 'status', 'from'],
        //             data: [
        //                 { id: '1', content: '猪杂面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
        //                 { id: '2', content: '牛肉面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
        //                 { id: '3', content: '牛肉面 煎蛋', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
        //             ]
        //         }),
        //         cls: 'list', //自定义css
        //         itemTpl: `
        //         <div class="sy-print-task-list">
        //             <div class="content text-overflow">{content}</div><div class="createTime">{createTime}</div><div class="target">{target}</div><div class="status">{status}</div><div class="from">{from}</div><div class="id">{id}</div>
        //         </div>
        //         `
        //     }
        // });



        // var panel = Ext.create('Ext.Panel', {
        //     layout: 'vbox',
        //     height: '100%',
        //     items: [
        //         {
        //             xtype: 'button',
        //             text: '确定',
        //             cls: 'testcls1'
        //         },
        //         {
        //             xtype: 'panel',
        //             html: `
        //             <div class="sy-print-task-list">
        //                 <div class="content">内容</div><div class="createTime">创建时间</div><div class="target">目标</div><div class="status">状态</div><div class="from">来自</div><div class="id">id</div>
        //             </div>
        //             `
        //         },
        //         // {
        //         //     xtype: 'simpleList',
        //         //     id: 'list1',
        //         //     height: 512,
        //         //     store: Ext.create('Ext.data.Store', {
        //         //         fields: ['litpic', 'title', 'time'],
        //         //         data: [
        //         //             { litpic: './pic02.jpg', title: 'title1', time: '12:00' },
        //         //             { litpic: 'https://www.baidu.com/img/bd_logo1.png', title: 'title2', time: '12:01' },
        //         //             { litpic: 'https://www.baidu.com/img/bd_logo1.png', title: 'title3', time: '12:02' },
        //         //             { litpic: 'https://www.baidu.com/img/bd_logo1.png', title: 'title4', time: '12:03' },
        //         //         ]
        //         //     })
        //         // },
        //         {
        //             xtype: 'newList',
        //             id: 'list1',
        //             height: 512,
        //         },
        //         {
        //             xtype: 'button'
        //         },
        //     ]
        // });
        // // Ext.Viewport.add(panel);
        // var list1 = Ext.getCmp('list1');
        // // console.log(list1);
        // var store = list1.getStore();
        // // console.log(store);
        // // store.add([{ litpic: './pic02.jpg', title: 'title5', time: '12:04' }])
        // store.add([{ id: '4', content: '牛肉面 煎蛋 火龙果 苹果 香蕉 绿茶 佳能相机', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' }])

        // // -----------
        // Ext.define('app.view.new.PrintTaskListView', {
        //     alternateClassName: 'printTaskListView',
        //     extend: 'Ext.Panel',
        //     // requires: ['app.view.new.Info'],
        //     xtype: 'printTaskListView',
        //     config: {

        //         layout: {
        //             type: 'vbox',
        //         },
        //         items: [
        //             {
        //                 xtype: 'panel',
        //                 html: `
        //                 <div class="sy-print-task-list list-header">
        //                     <div class="content">内容</div><div class="createTime">创建时间</div><div class="target">目标</div><div class="status">状态</div><div class="from">来自</div><div class="id">id</div>
        //                 </div>
        //                 `
        //             },
        //             {
        //                 xtype: 'newList',
        //                 id: 'list2',
        //                 height: 512,
        //             }
        //         ]
        //     },

        //     // initialize: function( thisArg, eOpts ) {
        //     //     console.log(thisArg, eOpts)                
        //     // }

        // });


        // // Ext.define('fafafa', {
        // //     xtype: ['fafafa'],
        // //     extend: 'Ext.Panel',
        // //     config: {

        // //         items: [
        // //             {
        // //                 html: '2222222'
        // //             }
        // //         ]
        // //     }
        // // });




        // // var tabPanel = Ext.create('Ext.TabPanel', {
        // //     id: 'tabPanel',
        // //     // ui: 'light',
        // //     ui: '',
        // //     tabBarPosition: 'top',
        // //     config: {
        // //         // baseCls: '',
        // //         // cls: '',
        // //         // background: 'red'
        // //     },

        // //     items: [
        // //         // {
        // //         //     title: '主页',
        // //         //     html: '主页',
        // //         //     iconCls: 'home'
        // //         // },
        // //         // {
        // //         //     title: '111',
        // //         //     xtype: 'fafafa',
        // //         //     iconCls: 'home'
        // //         // },
        // //         {
        // //             title: '<strong style="color:red;">阻塞单</strong>',
        // //             xtype: 'printTaskListView',
        // //             id: 'zuseView',
        // //             // iconCls: 'home'
        // //             // baseCls: 'testcls1',
        // //             // cls: 'testcls1',
        // //         },
        // //         {
        // //             title: '预打单',
        // //             xtype: 'printTaskListView',
        // //             // iconCls: 'home'
        // //             id: 'yudaView',
        // //         },
        // //         {
        // //             title: '已打单',
        // //             xtype: 'printTaskListView',
        // //             // iconCls: 'home'
        // //             id: 'yidaView'
        // //         },
        // //         // {
        // //         //     title: '预打单',
        // //         //     xtype: 'newList',
        // //         //     iconCls: 'user'
        // //         // },

        // //     ],


        // //     listeners: {

        // //         initialize: function (thisArg, eOpts) {
        // //             console.log(thisArg, eOpts)
        // //             // var list = thisArg.items.map['zuseView'].items.map['list2'];
        // //             var list = thisArg.down('#list2');
        // //             list.beginSimple();
        // //             // list.down('#btnCancel').hide();
        // //         },
        // //         activate: function (newActiveItem, thisArg, oldActiveItem, eOpts) {
        // //             console.log(newActiveItem, thisArg, oldActiveItem, eOpts)
        // //         },
        // //         activeitemchange: function (thisArg, value, oldValue, eOpts) {
        // //             console.log(thisArg, value, oldValue, eOpts)
        // //         },
        // //     },
        // // });
        // // Ext.Viewport.add(tabPanel);


        var p = Ext.create('Ext.Panel', {
            config: {

                layout: {
                    type: 'vbox',
                },
            },
            items: [
                // {
                //     html: 'panel1'
                // },
                // {
                //     xtype: 'testView',                    
                // },
                // {
                //     xtype: 'printTaskListTabPanelView',
                //     id: 'taskView',
                //     // width: 555,
                //     // height: 512,
                    
                // },
                {
                    html: '<div><input type="checkbox></div>'
                },
                {
                    // xtype: 'panel',
                    
                    html: `
                    <div class="sy-print-task-list">
                        <div class="content">内容</div><div class="createTime">创建时间</div><div class="target">目标</div><div class="status">状态</div><div class="from">来自</div><div class="id">id</div>
                    </div>
                    `,
                    height: 30
                },               
                // {
                //     xtype: 'tinyPeople',
                //     // height: 300
                //     id: 'tp1'
                // },
                {
                    xtype: 'tinyPeopleView',
                    height: 300,
                    // width: 500,
                    id: 'tpv1',
                    // hidden: true,
                    
                },
                {
                    xtype: 'tinyPeopleView',
                    height: 300,
                    // width: 500,
                    id: 'tpv2',
                    hidden: true,
                },
                {
                    xtype: 'tinyPeopleView',
                    height: 300,
                    // width: 500,
                    id: 'tpv3',
                    hidden: true,
                },
                
            ],
            listeners: {
                
                initialize: function( thisArg, eOpts ) {
                    // console.log(thisArg)
                },
                activate: function( newActiveItem, thisArg, oldActiveItem, eOpts ) {                    
                    // console.log(thisArg)
                    // this.add(Ext.create('tinyPeople', { }))
                    
                }
            }
        });
        Ext.Viewport.add(p);
        p.show();

        // var store = Ext.getCmp('tp1').getStore();
        // console.log(store)
        // store.add(
        //         { id: '13', StudentName: 'Alice111'}
        //     );

        
        // var tinyPeopleView = Ext.create('tinyPeople', {
        // });
        // Ext.Viewport.add(tinyPeopleView);


        // var tinyPeopleView = Ext.create('myApp.view.TinyPeopleView', {
        // });
        // Ext.Viewport.add(tinyPeopleView);
        

        // var tinyPeopleView = Ext.create('myApp.view.TaskListView', {
        // });
        // Ext.Viewport.add(tinyPeopleView);
    }
})
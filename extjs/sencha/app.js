/**
 * Created by lf on 2017/6/16.
 */

var helloTouchApp = new Ext.application({ //利用框架的Application类的构造函数构造一个应用
    name: 'myApp', //为这个应用指定名称
    useLoadMask: true, //页面读取完毕前会显示“Loading...”字样
    launch: function () { //这是程序的入口
        // Ext.Msg.alert('Hi', 'Hello Sencha Touch', Ext.emptyFn);//弹出窗口标题Hi，内容Hello Sencha Touch


        // #region 1
        // // card layout
        // var panel = Ext.create('Ext.Panel', {
        //     layout: 'card',
        //     //fullscreen: true,
        //     items: [
        //         {
        //             html: "First Item"
        //         },
        //         {
        //             html: "Second Item"
        //         },
        //         {
        //             html: "Third Item"
        //         },
        //         {
        //             html: "Fourth Item"
        //         }
        //     ]
        // });
        // Ext.Viewport.add(panel);

        // var count = 0;
        // setInterval(() => {
        //     count++;
        //     count %= 4;
        //     panel.setActiveItem(count);

        // }, 2000);
        // #endregion 1

        var panel = Ext.create('Ext.Panel', {
            layout: 'hbox',
            fullscreen: true,
            defaults: {
                xtype: 'checkboxfield',
                width : 180,
				labelWidth : 120,
				labelAlign : 'right'
            },
            items: [
                {
                    xtype : 'spacer',
                    width : null,
                    listeners : {}
                },
                {
                    label: "First Item"
                },
                {
                    label: "Second Item"
                },
                {
                    label: "Third Item"
                },
                {
                    label: "Fourth Item"
                },
                {
                    xtype : 'spacer',
                    width : null,
                    listeners : {}
                }
            ]
        });

    }
});

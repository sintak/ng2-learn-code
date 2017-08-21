
var helloTouchApp = new Ext.application({ //利用框架的Application类的构造函数构造一个应用
    name: 'myApp', //为这个应用指定名称
    useLoadMask: true, //页面读取完毕前会显示“Loading...”字样
    launch: function () { //这是程序的入口
        Ext.Msg.alert('Hi', 'Hello Sencha Touch', Ext.emptyFn);//弹出窗口标题Hi，内容Hello Sencha Touch

    }
})
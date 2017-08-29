
var helloTouchApp = new Ext.application({ //利用框架的Application类的构造函数构造一个应用
    name: 'Seller', //为这个应用指定名称
    useLoadMask: true, //页面读取完毕前会显示“Loading...”字样
    launch: function () { //这是程序的入口
        // Ext.Msg.alert('Hi', 'Hello Sencha Touch', Ext.emptyFn);//弹出窗口标题Hi，内容Hello Sencha Touch


        var myList = Ext.create('Ext.List', {
            fullscreen: true, 
            store: { 
                fields: ['name'], 
                data: [
                    { name: 'Cowper' }, 
                    { name: 'Everett' }, 
                    { name: 'University' }, 
                    { name: 'Forest' }
                ] 
            }, 
            itemTpl: '{name}',     
            
            listeners: {
                //先择一项会执行,只是执行一次       
                select: function (view, record) {
                    //Ext自带的  alert     
                    // Ext.Msg.alert('Selected!', 'You  selected ' + record.get('name'));
                    console.log('Selected!', 'You  selected ' + record.get('name'));
                },
                //点击行时执行     
                itemtap: function (list, index, target, record, e) {
                    //当然，你也可以在点击行的时候跳转到别一个view，看onItemDisclosure中的代码          

                    // Ext.Msg.alert("itemtap", record.get("name"));
                    console.log("itemtap", record.get("name"));
                    
                }
            }
        });














    }
})
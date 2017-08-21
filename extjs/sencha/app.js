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

        // -----------------------

        // var panel = Ext.create('Ext.Panel', {
        //     layout: 'hbox',
        //     fullscreen: true,
        //     defaults: {
        //         xtype: 'checkboxfield',
        //         width : 180,
        // 		labelWidth : 120,
        // 		labelAlign : 'right'
        //     },
        //     items: [
        //         {
        //             xtype : 'spacer',
        //             width : null,
        //             listeners : {}
        //         },
        //         {
        //             label: "First Item"
        //         },
        //         {
        //             label: "Second Item"
        //         },
        //         {
        //             label: "Third Item"
        //         },
        //         {
        //             label: "Fourth Item"
        //         },
        //         {
        //             xtype : 'spacer',
        //             width : null,
        //             listeners : {}
        //         }
        //     ]
        // });

        // // -----------------------
        // var panel = Ext.create('Ext.Panel', {
        //     layout : 'vbox',
        //     height : '100%',
        //     items : [
        //         {
        //             xtype : 'panel',
        //             //height : clientHeight - 205,
        //             flex : 1,
        //             cls : 'order-padding',
        //             layout : 'vbox',
        //             scrollable : false,
        //             items : [Ext.create('Ext.DataView', {
        //                 id : 'showyin-commodity-list',
        //                 flex : 1,
        //                 scrollable : false,
        //                 // store : Ext.create('Ext.data.Store', {
        //                 //     id : 'showyin-commodity-store',
        //                 //     model : 'Seller.model.CommodityInfo',
        //                 //     data : []
        //                 // }),
        //                 listeners : {
        //                     itemtouchstart : function(view, index, target, record, e, eOpts) {
        //                         var me = Ext.getCmp('select-commodity-view');
        //                         me.isLongTimeClick = false;
        //                         me.longTimeClickTimeout = setTimeout(function() {
        //                             me.isLongTimeClick = true;
        //                         }, 1000);
        //                     },
        //                     itemtouchend : function(view, index, target, record, e, eOpts) {
        //                         parabolaX=e.pageX;
        //                         parabolaY=e.pageY-30;
        //                         e.stopPropagation();
        //                         e.stopEvent();
        //                         //alert(record.get('define1'));
        //                         var me = Ext.getCmp('select-commodity-view');
        //                         if (me.longTimeClickTimeout) {
        //                             clearTimeout(me.longTimeClickTimeout);
        //                             me.longTimeClickTimeout = null;
        //                         }
        //                         if (record && record.get('id') == 0) {// 添加商品
        //                             Ext.getCmp('select-commodity-view').addCommodity(this, record.get('typeId'));
        //                             return;
        //                         }

        //                         if (me.isLongTimeClick) {
        //                             me.showEditCommodityView(record);
        //                             me.isLongTimeClick = false;
        //                         } else {
        //                             if (Ext.getCmp('shouyinMainView').shouhanMode == '5') {
        //                                 showSoldoutPanel(record);
        //                                 return;
        //                             } else if (Ext.getCmp('shouyinMainView').shouhanMode == '2') {// 退货模式
        //                             } else if (record.get('soldoutStatus') == '1') {
        //                                 if (record.get('soldoutNum') <= 0) {
        //                                     return;
        //                                 } else if (record.get('remainNum') <= 0) {
        //                                     showAlert('提示', '对不起客官, 该商品已经销售一空了!');
        //                                     return;
        //                                 } else if (record.get('remainNum') < 1) {
        //                                 }
        //                             } else if (record.get('status') == '0') {
        //                                 showAlert('提示', '抱歉, 已下架!');
        //                                 return;
        //                             } else if (record.get('status') == '2') {
        //                                 showAlert('提示', '抱歉, 已经卖完了!');
        //                                 return;
        //                             }
        //                             var parentContainer = Ext.getCmp('select-commodity-view').parentContainer;
        //                             if (parentContainer && record.get('id') != '0') {
        //                                 var isSupportNorms = record.get("isSupportNorms");
        //                                 if (isSupportNorms == "1") {
        //                                     me.showNormsView(record);
        //                                 } else {
        //                                     me.optCommodityForNeed(record);
        //                                 }
        //                             }
        //                         }

        //                         if (monitors == 2) {
        //                             if (record.get('soldoutStatus') != '1')
        //                                 sendMsg2SetCommodityImg(record.get('name'), record.get('price'), record.get('define1'));
        //                         }
        //                     }
        //                 },
        //                 //itemTpl : ['<tpl if="id == 0"><div class="sp-dataview"><div class="addcomimg"></div></div><tpl else> <div class="sp-dataview"><div class="cent"><div class="select{define4} soldout{soldoutStatus}"></div><div class="commodityname"><p>{name}</p></div><div><span id="commodity{id}" class="text-overflow">￥{price}</span></div></div></div></tpl>'].join('')
        //                 itemTpl : ['<tpl if="id == 0"><div class="sp-dataview"><div class="addcomimg"></div></div><tpl else> <div class="sp-dataview"><div class="cent"><div class=\"select{define4}', ' <tpl if="soldoutStatus==\'1\'&&(!soldoutNum||soldoutNum<=0)">soldout1<tpl else>soldout0</tpl>\"></div><div class="commodityname"><p>{name}</p></div><div><span id="commodity{id}" class="text-overflow">￥{price}</span></div></div></div></tpl>'].join('')
        //             })]
        //         }
        //     ]
        // });
        // Ext.Viewport.add(panel);


        // -------------------------------------------------------

        // var panel = Ext.create('Ext.Panel', {
        //     layout: 'vbox',
        //     height: '100%',
        //     items: [

        //         {
        //             xtype: 'panel',
        //             id: 'buyCarList',
        //             layout: {
        //                 type: 'vbox'
        //             },
        //             flex: 1,
        //             margin: '0 0 0 -10',
        //             items: [{
        //                 xtype: 'panel',
        //                 width: 366,
        //                 cls: 'sy-sy-img-main'
        //             }, {
        //                 xtype: 'panel',
        //                 flex: 1,
        //                 cls: 'sy-sy-img-bg',
        //                 layout: 'vbox',
        //                 items: [{
        //                     xtype: 'panel',
        //                     cls: 'sy-sy-img-2'
        //                 }, {
        //                     xtype: 'panel',
        //                     layout: 'vbox',
        //                     flex: 1,
        //                     style: 'margin-left:2px;',
        //                     items: [{
        //                         xtype: 'panel',
        //                         height: 36,
        //                         width: 350,
        //                         cls: 'solid-border-top dashed-border-bottom',
        //                         style: 'color:black;',
        //                         html: '<div class="sy-commodity-header" ><div class="name">&nbsp;&nbsp;品名</div><div class="num">数量</div><div class="price">价格</div><div class="sellAmount">小计</div></div>'
        //                     }, {
        //                         xtype: 'list',
        //                         id: 'buyCarGridPanel',
        //                         style: 'background:transparent;',
        //                         flex: 1,
        //                         width: 350,
        //                         margin: '0 0 0 0',
        //                         // store : Ext.create("Ext.data.Store", {
        //                         //     model : "Seller.model.SellDetail",
        //                         //     autoLoad : false,
        //                         //     listeners : {
        //                         //         addrecords : function(listStore, listRecords, eOpts) {
        //                         //             if(!listRecords) return;
        //                         //             var rlen = listRecords.length;
        //                         //             var pageStore = getPageStore();
        //                         //             var me = Ext.getCmp('shouyinMainView');
        //                         //             if(me.isGetInStore) return;
        //                         //             var cartPage = me.shoppingPage;
        //                         //             for(var ri=0; ri<rlen; ri++) {
        //                         //                 pageStore.add(listRecords[ri]);
        //                         //             }
        //                         //             var tmpCount = pageStore.getCount();
        //                         //             var sTotalPage = cartPage.getTotalPage();
        //                         //             var tmpLimitCount = cartPage.getLimitCount();
        //                         //             var tmpTotalPage = parseInt(tmpCount / tmpLimitCount);
        //                         //             tmpTotalPage = (tmpCount%tmpLimitCount) > 0 ? tmpTotalPage+1 : tmpTotalPage; 
        //                         //             //cartPage.countPage(tmpCount);
        //                         //             if(tmpTotalPage > sTotalPage || cartPage.getCurrPage() != sTotalPage) {
        //                         //                 cartPage.setTotalPage(tmpTotalPage);
        //                         //                 me.lastShoppingCommodity();
        //                         //                 curPage++;
        //                         //             }

        //                         //             Ext.getCmp('buyCarOptBtn').hide();
        //                         //         },
        //                         //         updaterecord : function(listStore, record, newIndex, oldIndex, modifiedFieldNames, modifiedValues, eOpts) {
        //                         //             //console.log(modifiedFieldNames);
        //                         //             var rKey = modifiedFieldNames;
        //                         //             //if(modifiedValues.hasOwnProperty(rKey)) {
        //                         //                 var pageStore = getPageStore();
        //                         //                 var pageRecord = pageStore.findRecord('id', record.get('id'));
        //                         //                 //pageRecord.set(rKey, modifiedValues[rKey]);
        //                         //                 if(record == pageRecord) {
        //                         //                 } else {
        //                         //                     if(record.get(rKey)) {
        //                         //                         pageRecord.set(rKey, record.get(rKey));
        //                         //                     }
        //                         //                 }
        //                         //             //}
        //                         //         },
        //                         //         removerecords : function(listStore, listRecords, indices, eOpts) {
        //                         //             if(!indices) return;
        //                         //             var ilen = indices.length;
        //                         //             var pageStore = getPageStore();
        //                         //             var me = Ext.getCmp('shouyinMainView');
        //                         //             for(var i=0; i<ilen; i++) {
        //                         //                 pageStore.remove(pageStore.findRecord('id', listRecords[i].get('id')));
        //                         //                 //pageStore.remove(listRecords[i]);
        //                         //             }
        //                         //             var count = pageStore.getCount();
        //                         //             me.shoppingPage.countPage(count);
        //                         //             me.reSetShoppingPageContent();
        //                         //         }
        //                         //     }
        //                         // }),
        //                         selectedCls: 'checkedbg-main',
        //                         //itemTpl : new Ext.XTemplate('<div class="sy-cart-commodity-list dashed-border-bottom" style="font-size:16px !important;"><div class="name jz-center sp-left" onclick="syCommodityClick(1,\'{commodityId}\')"><span class="text-overflow" title="{commodityName}">{commodityName}</span><p>{remark}</p></div><div class="num jz-center" onclick="syCommodityClick(1,\'{commodityId}\')">{sellNum}</div><div class="price jz-center" onclick="syCommodityClick(1,\'{commodityId}\')">{sellPrice}</div><div class="sellAmount jz-center">{sellAmount}</div><div class="type{type} delete{isDelete}"></div><div class="unit jz-center"><div style="width:100%;height:100%;font-size:18px;text-align:center;line-height:30px;">{unit}</div></div><tpl if="isSpecialPrice==\'1\'"><div class="special jz-center"><div style="width:100%;height:100%;font-size:18px;text-align:center;line-height:30px;">特</div></div></tpl></div>'),
        //                         //itemTpl : new Ext.XTemplate('<div class="sy-cart-commodity-list dashed-border-bottom" style="font-size:16px !important;"><div class="name jz-center sp-left" onclick="syCommodityClick(1,\'{commodityId}\')"><span class="text-overflow" title="{commodityName}">{commodityName}</span><p>{remark}</p></div><div class="num jz-center" onclick="syCommodityClick(1,\'{commodityId}\')">{sellNum}</div><div class="price jz-center" onclick="syCommodityClick(1,\'{commodityId}\')">{sellPrice}</div><div class="sellAmount jz-center">{sellAmount}</div><div class="type{type}"></div><div class="unit jz-center"><div style="width:100%;height:100%;font-size:18px;text-align:center;line-height:30px;">{unit}</div></div><tpl if="isSpecialPrice==\'1\'"><div class="special jz-center"><div style="width:100%;height:100%;font-size:18px;text-align:center;line-height:30px;">特</div></div></tpl><tpl if="isDelete==1"><div class="delete-throught-line"></div></tpl></div>'),
        //                         //itemTpl : new Ext.XTemplate('<div class="sy-cart-commodity-list dashed-border-bottom" style="font-size:16px !important;"><div class="name text-overflow" style="padding-left:30px!important;" onclick="syCommodityClick(1,\'{commodityId}\')"><div class="text-overflow" title="{commodityName}">{commodityName}</div><div class="remark text-overflow">{remark}</div></div><div class="num jz-center" onclick="syCommodityClick(1,\'{commodityId}\')">{sellNum}</div><div class="price jz-center" onclick="syCommodityClick(1,\'{commodityId}\')">{sellPrice}</div><div class="sellAmount jz-center">{sellAmount}</div><div class="type{type}"></div><div class="unit jz-center"><div style="width:100%;height:100%;font-size:18px;text-align:center;line-height:30px;">{unit}</div></div><tpl if="isSpecialPrice==\'1\'"><div class="special jz-center"><div style="width:100%;height:100%;font-size:18px;text-align:center;line-height:30px;">特</div></div></tpl><tpl if="isDelete==1"><div class="delete-throught-line"></div></tpl></div>'),
        //                         //itemTpl : new Ext.XTemplate('<div class="sy-cart-commodity-list dashed-border-bottom" style="font-size:16px !important;"><div class="name text-overflow" onclick="syCommodityClick(1,\'{commodityId}\')"><div class="text-overflow commodityname" title="{commodityName}">{commodityName}</div><div class="remark text-overflow">{remark}</div><tpl if="isSpecialPrice!=\'1\'"><div class="special"></div></tpl></div><div class="num jz-center" onclick="syCommodityClick(1,\'{commodityId}\')">{sellNum}</div><div class="price jz-center" onclick="syCommodityClick(1,\'{commodityId}\')">{sellPrice}</div><div class="sellAmount jz-center">{sellAmount}</div><div class="type{type}"></div><div class="unit jz-center"><div style="width:100%;height:100%;font-size:18px;text-align:center;line-height:30px;">{unit}</div></div><tpl if="isSpecialPrice==\'1\'"><div class="special jz-center"><div style="width:100%;height:100%;font-size:18px;text-align:center;line-height:30px;">特</div></div></tpl><tpl if="isDelete==1"><div class="delete-throught-line"></div></tpl></div>'),
        //                         itemTpl: new Ext.XTemplate('<div class="sy-cart-commodity-list dashed-border-bottom" style="font-size:16px !important;"><div class="name text-overflow" onclick="syCommodityClick(1,\'{commodityId}\')"><div class="commodityinfo"><div class="text-overflow commodityname" title="{commodityName}">{commodityName}</div><div class="commodityextra"><tpl if="isSpecialPrice==\'1\'"><div class="special"></div></tpl><tpl if="isPresented==\'1\'"><div class="presented"></div></tpl></div></div><div class="remark text-overflow">{remark}</div></div><div class="num jz-center" onclick="syCommodityClick(1,\'{commodityId}\')">{sellNum}</div><div class="price jz-center" onclick="syCommodityClick(1,\'{commodityId}\')">{sellPrice}</div><div class="sellAmount jz-center">{sellAmount}</div><div class="type{type}"></div><div class="unit jz-center"><div style="width:100%;height:100%;font-size:18px;text-align:center;line-height:30px;">{unit}</div></div><tpl if="isDelete==1"><div class="delete-throught-line"></div></tpl></div>'),
        //                         isAfterrendered: false, //添加一个变量，用于检测afterrender是否已经发生
        //                         listeners: {
        //                             itemtap: function (list, index, target, record, e, eOpts) {
        //                                 /*var x = document.getElementById(target.getId());
        //                                  var top = x.offsetTop + 120;
        //                                  console.log(target.getTop( ))
        //                                  if (top > (clientHeight - 280)) {
        //                                  top = e.pageY - 40;
        //                                  }*/
        //                                 //showBuyCarOpt(e.pageY - 60);
        //                                 showCustomerDisplay(0x31, parseFloat(record.get('sellPrice')).toFixed(2));
        //                                 showBuyCarOpt(e.pageY - 60);
        //                             },
        //                             itemtouchmove: function (list, index, target, record, e, eOpts) {
        //                                 Ext.getCmp('buyCarOptBtn').hide();
        //                             }
        //                         }
        //                     }, {
        //                         xtype: 'container',
        //                         height: 40,
        //                         width: 300,
        //                         hidden: true,
        //                         id: 'buyCarOptBtn',
        //                         margin: '0 0 0 0',
        //                         modal: false,
        //                         hideOnMaskTap: true,
        //                         top: 45,
        //                         layout: 'vbox',
        //                         items: [{
        //                             xtype: 'panel',
        //                             height: 10,
        //                             cls: 'sy-opt-triangleimg'
        //                         }, {
        //                             xtype: 'panel',
        //                             height: 40,
        //                             defaults: {
        //                                 xtype: 'button',
        //                                 cls: 'sy-opt-button jz-center',
        //                                 labelCls: 'main-cart-small-font',
        //                                 pressedCls: 'sy-opt-button-pressed'
        //                             },
        //                             layout: 'hbox',
        //                             items: [{
        //                                 //width : 55,
        //                                 width: 49,
        //                                 text: '删除',
        //                                 // handler : syOptionButton,
        //                                 margin: '0 0 0 1'
        //                             }, {
        //                                 width: 49,
        //                                 text: '数量',
        //                                 // handler : syOptionButton,
        //                                 margin: '0 0 0 1'
        //                             }, {
        //                                 //width : 55,
        //                                 width: 49,
        //                                 text: '折扣',
        //                                 // handler : syOptionButton,
        //                                 margin: '0 0 0 1'
        //                             }, {
        //                                 //flex : 55,
        //                                 width: 49,
        //                                 text: '口味',
        //                                 // handler : syOptionButton,
        //                                 margin: '0 0 0 1'
        //                             }, {
        //                                 //width : 55,
        //                                 width: 49,
        //                                 text: '-',
        //                                 // handler : syOptionButton,
        //                                 margin: '0 1 0 1'
        //                             }, {
        //                                 //width : 55,
        //                                 width: 49,
        //                                 text: '+',
        //                                 // handler : syOptionButton,
        //                                 margin: '0 1 0 1'
        //                             }, {
        //                                 width: 49,
        //                                 text: '赠送',
        //                                 // handler : syOptionButton
        //                             }]
        //                         }]
        //                     }, {
        //                         xtype: 'panel',
        //                         layout: 'hbox',
        //                         height: 20,
        //                         margin: '0 0 20 0',
        //                         width: 350,
        //                         style: 'color:#000;',
        //                         items: [{
        //                             xtype: 'panel',
        //                             margin: '0 0 0 0',
        //                             height: 30,
        //                             width: 60,
        //                             disabled: true,
        //                             disabledCls: 'disabled-color',
        //                             id: "buyCartLeftPage",
        //                             html: '<div style="text-align:center;" onclick="Ext.getCmp(\'shouyinMainView\').downShoppingCommodity()">上一页</div>'
        //                         }, {
        //                             xtype: 'panel',
        //                             flex: 1,
        //                             cls: 'jz-center',
        //                             id: 'shoppingPanelId',
        //                             html: '1/1'
        //                         }, {
        //                             xtype: 'panel',
        //                             margin: '0 0 0 0',
        //                             height: 30,
        //                             width: 60,
        //                             disabled: true,
        //                             disabledCls: 'disabled-color',
        //                             id: "buyCartRightPage",
        //                             html: '<div style="text-align:center;" onclick="Ext.getCmp(\'shouyinMainView\').upShoppingCommodity()">下一页</div>'
        //                         }]
        //                     }]
        //                 }]
        //             }]
        //         }
        //     ]
        // });
        // Ext.Viewport.add(panel);


        // ---------------

        var touchTeam = Ext.create('Ext.DataView', {
            fullscreen: true,
            store: {
                fields: ['name', 'age'],
                data: [
                    { name: 'Jamie', age: 100 },
                    { name: 'Rob', age: 21 },
                    { name: 'Tommy', age: 24 },
                    { name: 'Jacky', age: 20 },
                    { name: 'Ed', age: 26 }
                ]
            },

            // itemTpl: '<div>{name} is {age} years old</div>'

            // itemTpl: '<p style=" background: #fff; padding: 1em;border-bottom: 1px solid #ccc;">{name} is {age} years old</p>'

            // itemTpl: new Ext.XTemplate('<p style=" background: #fff; padding: 1em;border-bottom: 1px solid #ccc;">{name} is  <tpl if="age>=20"><span style="color:red">{age}</span></tpl><tpl if="age<20"><span style="color:yellow">{age}</span></tpl> years old</p>')

            // itemTpl: '<p style=" background: #fff; padding: 1em;border-bottom: 1px solid #ccc;">' 
            //             + '{name} is  '
            //             + '<tpl if="age&gt;=20"><span style="color:red">{age}</span></tpl>'
            //             + '<tpl if="age<20"><span style="color:yellow">{age}</span></tpl>'
            //             + ' years old'
            //         +'</p>'

            itemTpl: Ext.create('Ext.XTemplate', '<p style=" background: #fff; padding: 1em;border-bottom: 1px solid #ccc;">{name:this.addTeam} is  <tpl if="age&gt;=20"><span style="color:red">{age}</span></tpl><tpl if="age<20"><span style="color:yellow">{age}</span></tpl> years old</p>',
                {
                    addTeam: function (value) {  // 定义pipe
                        return "touchteam " + value;
                    }
                }
            )
        });
        //添加一项
        touchTeam.getStore().add({ name: '刘江', age: 13 });
        //指定位置添加一项
        touchTeam.getStore().insert(0, { name: '刘江他弟', age: 11 });
        // remove removeAt

        //添加item项tap(按)事件
        touchTeam.on("itemtap", function (list, index, target, record, e, opt) {
            //alert("your name is "+record.get("name"));
            var txt = "your name is " + record.get("name");
            //通常我们会点击一行后，然后跳到别一个view去查看详情
            var panel = Ext.create("Ext.Panel", {
                fullscreen: true,
                html: txt,
                items: [{
                    xtype: 'toolbar',
                    docked: 'top',
                    items: [
                        {
                            xtype: 'button', ui: 'back', text: '返回', handler: function () {
                                //返回按钮事件
                                //显示列表页
                                Ext.Viewport.setActiveItem(touchTeam);
                                //销毁上次跳出的view
                                panel.destroy();
                            }
                        }
                    ]
                }]
            });
            //添加到容器
            Ext.Viewport.add(panel);
            //显示
            Ext.Viewport.setActiveItem(panel);

        });
        touchTeam.on("itemtaphold", function (list, index, target, record, e, opt) {
            alert("长按后：your name is " + record.get("name"));
        });




    }
});

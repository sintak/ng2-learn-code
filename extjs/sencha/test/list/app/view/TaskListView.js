
Ext.define('Seller.view.TaskListView', {
    extend: 'Ext.Container',
    xtype: 'taskListView',
    flex : 1,
    
    config: {
		id : 'mainView',
		centered : true,
		height : '100%',
		width : '100%',
		scrollable : false,
		dock : 'top',
        layout: {
            type : 'vbox'
        },
        items: [
            {
                html: 'i am TinyPeopleView top1',
                id: 'tpvh'
            },
            {
                xtype : 'panel',
                //height : clientHeight - 65,
                flex : 1,
                layout : {
                    type : 'hbox'
                },
                items: [
                    {
                        xtype: 'list',  // 需要一个panel包住，然后设置宽度，才能显示？
                        width: 500,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['id', 'StudentName'],
                            data: [
                                { id: '1', StudentName: 'Alice'},
                                { id: '2', StudentName: 'Lily'},
                                { id: '3', StudentName: 'Frank'},
                            ]
                        }),
                        itemTpl: new Ext.XTemplate('<div style"width=200px;heigth:20px;">{StudentName}</div>'),
                    },
                ]
            },
            
            {
                html: 'i am TinyPeopleView bottom',
                id: 'tpvh1'
            },
        ],

        
        listeners: {
            
            initialize: function (thisArg, eOpts) {
                console.log(thisArg, eOpts)
                // var list = thisArg.items.map['zuseView'].items.map['list2'];
                var list = thisArg.down('list');
                var store= list.getStore();
                store.add({ id: '12', StudentName: 'Alice2'})
                // list.beginSimple();
                // list.down('#btnCancel').hide();
            },
            activate: function( newActiveItem, thisArg, oldActiveItem, eOpts )
            {
                var list = thisArg.down('list');
                
            }
        }
    },

});
    
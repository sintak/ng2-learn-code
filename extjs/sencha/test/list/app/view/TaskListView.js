
Ext.define('myApp.view.TaskListView', {
    extend: 'Ext.Panel',
    xtype: 'taskListView',
    // layout: 'vbox',
    config: {
        // layout: 'vbox',
            
        items: [
            {
                html: 'i am TinyPeopleView top',
                id: 'tpvh'
            },
            {
                xtype: 'list'
            },
            {
                html: 'i am TinyPeopleView bottom',
                id: 'tpvh1'
            },
        ]
    },
});
    
Ext.define('Seller.view.TestView', {
    alternateClassName: 'testView',
    extend: 'Ext.Panel',
    // requires: ['app.view.new.Info'],
    xtype: 'testView',
    config: {

        layout: {
            type: 'vbox',
        },
        items: [
            {
                html: 'I am test view'
            }
        ]
    },

    // initialize: function( thisArg, eOpts ) {
    //     console.log(thisArg, eOpts)                
    // }

});
Ext.define('Seller.store.PrintTasks', {
    storeId:'printTasks',       
    extend: 'Ext.data.Store',
    // model: "Seller.model.Xxx",
    // fields: ['id', 'content', 'createTime', 'target', 'status', 'from'],
    model: 'Seller.model.PrintTask',
    data: [
        { id: '1', content: '猪杂面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
        { id: '2', content: '牛肉面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
    ]
});


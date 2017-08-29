
Ext.define('Seller.store.PeopleList', {
    storeId:'peopleList',
    extend: 'Ext.data.Store',
    // model: "Seller.model.ArrivalDetailModel",
    fields: ['id', 'StudentName'],
    data: [
        { id: '1', StudentName: 'Alice'},
        { id: '2', StudentName: 'Lily'},
        { id: '3', StudentName: 'Frank'},
    ]
});


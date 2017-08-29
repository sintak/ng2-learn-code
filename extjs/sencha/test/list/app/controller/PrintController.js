/**
 * Created by lf on 2017/8/16.
 */

Ext.define('Seller.controller.PrintController', {
    extend: 'Ext.app.Controller',
    // requires: ['Seller.view.PrintTaskListView', 'Seller.view.PrintTaskListTabPanelView', 'Seller.view.TestView', 'Seller.view.PrintTaskList'],
    
    config: {
        // models: ['PrintTask'],
        // stores: ['PrintTasks'],        
        views: [
            // 'PrintTaskList', 'PrintTaskListView', 'PrintTaskListTabPanelView', 
            // 'TestView', 
            'print.PrintTaskList','print.PrintTaskListView'],
    
        refs: {
            printTaskList: 'printTaskList',            
            printTaskListView: 'printTaskListView',
        },
        
        control: {
            printTaskList: {  // ok                
                simpleSuccess: function (list, items, ids, type) {
                    console.log(ids);

                    if(ids.length <= 0)
                    {
                        Ext.Msg.alert('提示','请至少选择一条记录.');
                        return;
                    }
                        
                    for (var i = 0; i < ids.length; i++)
                    {
                        if(ids[i] != -2/*打印中*/)
                        {
            
                            console.log(ids[i]);
                            PrintTaskDao.getById(ids[i], function(success, item) {
                                console.log(item);
            
                                // 更新状态
                                PrintTaskDao.update(
                                    { status: 0 },
                                    item.id,
                                    function(success)
                                    {
                                        if (success) {
                                            //Ext.Msg.alert('提示', '预备打印任务成功.');
            
                                            //Ext.getCmp('printTaskListView').loadData();
                                            Ext.getCmp('print-prepareTicket').check();
                                        }
                                        else {
                                            Ext.Msg.alert('提示', '预备打印任务失败.');
                                        }
                                    }
                                );

                                //var store = grid.getStore();
                                //var index = store.find('id', item.id);
                                //store.removeAt(index);                     
                            });
                        }
                    }
                }
            }
        }
    },

    init: function() {
        console.log('init')
        // this.control({
        //     "printTaskList button#btnBatchPrint" : {  // not work
        //         click : function(button) {
        //             console.log('btnBatchPrint click')
        //         }
        //     }
        // });
    },
});

// -------------------- Controller end


function loadPrintTask(status)
{
    PrintTaskDao.loadSearchInfo(status, function(success, items) {
        if (success && items) {
            var list = Ext.getCmp('printTaskList1');
            var listStores = list.getStore();
            listStores.removeAll();
            var len = items.length;
            if (len > 0) {
                var records = [];
                for (var n = 0; n < len; n++) {
                    var record = {
                        //'id',
                        //'content',
                        //'createTime',
                        //
                        //'status',
                        //'from'
                        id:items[n].id,
                        content: (function() {
                            var content = '';

                            var sellInfo = JSON.parse(items[n].content).sellInfo;
                            var sellDetails = JSON.parse(items[n].content).sellDetails;

                            content += sellInfo.placeName ? sellInfo.placeName : '';
                            content += sellInfo.shopSign ? sellInfo.shopSign : '';

                            var commodityNames = '';
                            for(var i = 0; i < sellDetails.length; i++)
                            {
                                commodityNames += sellDetails[i].commodityName;
                                if(i < sellDetails.length - 1)
                                {
                                    commodityNames += ','
                                }
                            }
                            content += commodityNames;

                            return content;
                        })(),

                        createTime: JSON.parse(items[n].content).sellInfo.sellTime,
                        target: (function() {
                            var sellDetails = JSON.parse(items[n].content).sellDetails;

                            var targets = '';
                            for(var i = 0; i < sellDetails.length; i++)
                            {
                                var kitchenPrintObject =  JSON.parse(sellDetails[i].kitchenPrintJson);
                                var index = 0;
                                for(var key in kitchenPrintObject)
                                {
                                    if(index > 0)
                                    {
                                        targets += '|'
                                    }
                                    targets += kitchenPrintObject[key].name;
                                    index++;
                                }
                                if(i < sellDetails.length - 1)
                                {
                                    targets += ','
                                }
                            }
                            return targets;
                        })(),
                        status: (function() {
                            var status = '';
                            if(items[n].status == -1)
                            {
                                status = '阻塞';
                            }
                            else if(items[n].status == 0) {

                                status = '准备打印';

                            }
                            else if(items[n].status >=1)
                            {
                                status = '已打印';//+items[n].status;

                            }
                            return status;
                        })(),
                        from: JSON.parse(items[n].content).sellInfo.workName,
                        
                    };
                    records.push(record);
                    // listStores.add(record);
                }
                
                listStores.setData(records);
            }
            else {
                console.log('未查询到数据.');
            }
        }
        else{
            console.log('查询数据出错.');
        }
    });
}


var clearBeforeSeconds = 30 * 24 * 60 * 60//8 * 60 * 60;  // default: 8小时前
var printTaskTimeInterval = 10000; // 10秒以上
var printTaskRetryTime = 20000;//120000;  // 120秒

/**
 * 清除一段时间前的打印数据
 * 
 * @param {any} seconds 多久以前（秒）
 */
function clearPrintDataBefore(seconds) {
    PrintTaskDao.getAll(function(success, items) {
        if(success && items)
        {
            for(var i=0; i < items.length; i++)
            {
                var createTime = new Date(JSON.parse(items[i].content).sellInfo.sellTime);
                var now = new Date();
                if(createTime < now.setSeconds(now.getSeconds () - seconds) ) {
                    PrintTaskDao.delete(items[i].id, function(success, countOrError) {
                        if(success) {
                            console.log('delete ok, count:', countOrError);
                        }
                        else {
                            console.log('delete failed, error:', countOrError);                            
                        }
                    });
                }
                else {

                }
                    
                 
            }
        }
    });
}
clearPrintDataBefore(clearBeforeSeconds); 

/**
 * 打印任务
 * 
 * @param {any} timeInterval 
 * @param {any} retryTime 
 */
function printTaskQueue(timeInterval, retryTime) {
    //console.log("printTaskQueue");

    PrintTaskDao.loadSearchInfo(
        0/*预打印*/,
        function(success, items) {
            if (success && items) {
                var len = items.length;
                if (len > 0)
                {
                    for (var n = 0; n < len; n++)
                    {
                        //console.log(items[n]);

                        if(items[n].retryCount > retryTime / timeInterval)
                        {
                            PrintTaskDao.update(
                                {
                                    status: -1,/*阻塞*/
                                    retryCount: 0
                                }, // lastEjectTime
                                items[n].id,
                                function(success)
                                {
                                    if (success) {
                                        //Ext.Msg.alert('提示', '保存成功.');
                                        //Ext.getCmp('printTaskListView').loadData();
                                        console.log("PrintTaskDao.update status success");
                                    }
                                    else {
                                        //Ext.Msg.alert('提示', '保存失败.");
                                        console.log("PrintTaskDao.update status failed");
                                    }

                                }
                            );

                        }

                    }
                }
                else {
                    //console.log('未查询到数据.');
                }
            }
            else{
                console.log('查询数据出错.');
            }


            // 打印
            PrintTaskDao.loadSearchInfo(0/*预打单*/, function(success, items) {
                if (success && items) {
                    var len = items.length;
                    if (len > 0) {
                        for (var n = 0; n < len; n++) {
                            console.log(items[n]);

                            var time = new Date;
                            time.setSeconds(time.getSeconds () - 10);
                            if(/*!items[n].ejectTime*/items[n].retryCount <= 0 || new Date(items[n].ejectTime) < time)
                            {
                                // PrintDao.PrintTask(JSON.parse(items[n].content), 0/*item.content.ticketPattern*/); //PrintDao.PrintTask(JSON.parse(item.content), 1/*item.content.ticketPattern*/);

                                PrintTaskDao.update(
                                    {
                                        ejectTime: new Date(), // lastEjectTime
                                        retryCount: (items[n].retryCount+1)
                                    },
                                    items[n].id,
                                    function(success)
                                    {
                                        if (success) {
                                            //Ext.Msg.alert('提示', '保存成功.');
                                            //Ext.getCmp('printTaskListView').loadData();
                                            console.log(new Date(), "PrintTaskDao.update ejectTime success");
                                        }
                                        else {
                                            //Ext.Msg.alert('提示', '保存失败.');
                                            console.log(new Date(), "PrintTaskDao.update ejectTime failed");
                                        }
                                    }
                                );
                            }


                        }

                    }
                    else {
                        //console.log('未查询到数据.');
                    }
                }
                else{
                    console.log('查询数据出错.');
                }

                setTimeout("printTaskQueue()", 5000);

            });

        }
    );



}
printTaskQueue(printTaskTimeInterval, printTaskRetryTime);
/**
 * Created by lf on 2017/8/8.
 */

var PrintTaskDao = {
    /**
     * 加载数据
     * @param param 可选。搜索参数
     * @param callBack function(success, items)
     */
    loadSearchInfo: function(param,callBack) {
        var sql = "SELECT * from printTask where 1=1 " ;
        var keyArr=[];
        if (param >= 1)
        {
            sql=sql+' and  status >= ?  ';
            keyArr.push(param);
        }
        else
        {
            sql=sql+' and  status == ?  ';
            keyArr.push(param);
        }
        //sql=sql+'Order by ktPrintName';

        loadBySqlParam(sql,keyArr, callBack);
    },

    /**
     *增加
     */
    add: function(sqlData, callBack) {
        console.log(sqlData);
        insert("printTask", sqlData, callBack);
    },
    /**
     * 根据id删除
     */
    delete : function(id, callBack) {
        del("printTask", id, callBack);
    },
    /**
     * 根据id查询
     * @param {Object} callback(success,item)
     */
    getById : function(id, callback) {
        var sql = "SELECT * FROM printTask where id=? ";
        getBySql(sql,[id],callback);
    },
    getAll: function(callback) {
        var sql = "SELECT * FROM printTask";        
        loadBySql(sql, callback);
    },
    /**
     * 更新
     * @param sqlData
     * @param id
     * @param callback function(success)
     */
    update : function(sqlData,id, callback) {
        update('printTask',sqlData,id,callback)
    },
    /**
     * 查找早于ejectTime时间的数据
     */
    getByEjectTimeRange: function(ejectTime, callback) {
        var sql = "SELECT * FROM printTask where ejectTime<? ";
        getBySql(sql,[ejectTime],callback);
    },
}
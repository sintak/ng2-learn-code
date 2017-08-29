function insert(tbname, sqlData, callBack) {
	if (fgDB != null) {
		var now = new Date();
		fgDB.insert(tbname, sqlData, function(insertId) {
			//sqlData.insertId = insertId;
			if (callBack) {
				callBack(true, insertId);
			}
		}, function(er) {
			console.log('error with executeSql in add ' + tbname, er);
			if (callBack) {
				callBack(false, "插入失败:" + er);
			}
		});
	}
}

function update(tbname, sqlData, id, callBack) {
	if (fgDB != null) {
		fgDB.update(tbname, sqlData, "id=?", [id], function(count) {
			if (callBack) {
				callBack(true);
			}
		}, function(er) {
			console.log('error with executeSql in update ' + tbname, er);
			if (callBack) {
				callBack(false, "修改失败:" + er);
			}
		});
	}
}

function del(tbname, id, callBack) {
	if (fgDB != null) {
		fgDB.del(tbname, "id=?", [id], function(count) {
			if (callBack) {
				callBack(true);
			}
		}, function(er) {
			console.log('error with executeSql in del(' + tbname + ',' + id + ')', err);
			if (callBack) {
				callBack(false, "删除失败:" + er);
			}
		});
	}
}

function delByWhere(tbname, param, paramvalue, callBack) {
    if (fgDB != null) {
        fgDB.del(tbname, param, paramvalue, function(count) {
            if (callBack) {
                callBack(true);
            }
        }, function(er) {
            console.log('error with executeSql in delByWhere(' + tbname + ',' + id + ')', err);
            if (callBack) {
                callBack(false, "删除失败:" + er);
            }
        });
    }
}

/**
 * 删除所有
 * @param {Object} callBack(success,err)
 */
function deleteAll(tbname, callBack) {
	var sql = "delete FROM " + tbname;
	fgDB.executeSql(sql, function(res) {
		if (callBack) {
			callBack(true);
		}
	}, function(err) {
		console.log('error with executeSql in deleteAll ' + tbname, err);
		if (callBack) {
			callBack(false, err);
		}
	});
}

/**
 * 根据id获得数据
 */
function getById(tbname, id, callBack) {
	var sql = "SELECT * FROM " + tbname + " where id='" + id + "'";
	fgDB.executeSql(sql, function(res) {
		var item;
		var newData;
		if (res.rows.length > 0) {
			/*if (Ext.os.is.Windows) {
				item = res.rows.item(0);
			} else {
				item = res.rows[0];
			}*/
			item = getSqlItem(res);
		}
		if(item){
			var newData=Ext.clone(item);
			item=newData;
		}
		if (callBack) {
			callBack(true, newData);
		}
	}, function(err) {
		console.log('error with executeSql in getById(' + tbname + ',' + id + ')', err);
		if (callBack) {
			callBack(false, err);
		}
	});
}

/**
 * 根据条件查询
 */
function getByWhere(tbname, id, callBack) {
    var sql = "SELECT * FROM " + tbname + " where id=? ";
    fgDB.executeSql(sql,[id], function(res) {
        var item;
        var newData;
        if (res.rows.length > 0) {
            item = getSqlItem(res);
        }
        if(item){
            var newData=Ext.clone(item);
            item=newData;
        }
        if (callBack) {
            callBack(true, newData);
        }
    }, function(err) {
        console.log('error with executeSql in getByWhere(' + tbname + ',' + id + ')', err);
        if (callBack) {
            callBack(false, err);
        }
    });
}

/**
 * 根据sql获得第一条数据
 */
function getBySql(sql, callBack) {
	fgDB.executeSql(sql, function(res) {
		var item;
		var newData;
		if (res.rows.length > 0) {
			/*if (Ext.os.is.Windows) {
				item = res.rows.item(0);
			} else {
				item = res.rows[0];
			}*/
			item = getSqlItem(res);
		}
		if(item){
			var newData=Ext.clone(item);
			item=newData;
		}
		//console.log(item);
		//console.log(callBack);
		if (callBack) {
			callBack(true, newData);
		}
	}, function(err) {
		console.log('error with executeSql in getBySql:' + sql, err);
		if (callBack) {
			callBack(false, err);
		}
	});
}

/**
 * 根据sql获得第一条数据,增加参数查询
 */
function getBySql(sql,param,callBack) {
    fgDB.executeSql(sql,param, function(res) {
        var item;
        var newData;
        if (res.rows.length > 0) {
            item = getSqlItem(res);
        }
        if(item){
            var newData=Ext.clone(item);
            item=newData;
        }

        if (callBack) {
            callBack(true, newData);
        }
    }, function(err) {
        console.log('error with executeSql in getBySql param:' + sql, err);
        if (callBack) {
            callBack(false, err);
        }
    });
}


/**
 * 根据sql查询所有
 * @param {Object} callBack(success,res|err)
 */
function loadBySql(sql, callBack) {
	//console.log(fgDB);
	fgDB.executeSql(sql, function(res) {
		var datas = [];
		for (var i = 0, len = res.rows.length; i < len; i++) {
			var item = null;
			var data = {};
			item = getSqlItem(res, i);
			for (var k in item) {
				data[k] = item[k];
			}
			datas[i] = data;
		}
		if (callBack) {
			callBack(true, datas);
		}
	}, function(err) {
		console.log('error with executeSql in loadBySql: ' + sql, err);
		if (callBack) {
			callBack(false, err);
		}
	});
}

/**
 * 根据sql查询所有,带参数
 * @param {Object} callBack(success,res|err)
 */
function loadBySqlParam(sql,param, callBack) {
    fgDB.executeSql(sql,param, function(res) {
        var datas = [];
       // console.log("rows:"+res.rows.length.toString());
        for (var i = 0, len = res.rows.length; i < len; i++) {
            var item = null;
            var data = {};
            item = getSqlItem(res, i);
            for (var k in item) {
                data[k] = item[k];
            }
            datas[i] = data;
        }
        if (callBack) {
            callBack(true, datas);
        }
    }, function(err) {
        console.log('error with executeSql in loadBySqlParam: ' + sql, err);
        if (callBack) {
            callBack(false, err);
        }
    });
}

/**
 * 执行sql
 * @param {Object} callBack(success,res|err)
 */
function executeSql(sql, callBack) {
	fgDB.executeSql(sql, function(res) {
		if (callBack) {
			callBack(true);
		}
	}, function(err) {
		console.log('error with executeSql in executeSql: ' + sql, err);
		if (callBack) {
			callBack(false, err);
		}
	});
}

/**
 * 判断字段是否存在
 */
function isColumnExist(tableName, columnName, callBack) {
	callBack = callBack || emFunc;
	fgDB.executeSql("select sql from sqlite_master where type = 'table' and tbl_name='" + tableName + "' and sql like '%" + columnName + "%'", function(res) {
		var item;
		if (res.rows.length > 0) {
			callBack(true);
		} else {
			callBack(false);
		}
	}, function(err) {
		console.log('error with executeSql in getBySql:' + sql, err);
		callBack(false, err);
	});
}

/**
 * 判断表是否存在
 */
function isTableExist(tableName, callBack) {
	callBack = callBack || emFunc;
	fgDB.executeSql("select sql from sqlite_master where type = 'table' and tbl_name='" + tableName + "'", function(res) {
		var item;
		if (res.rows.length > 0) {
			callBack(true);
		} else {
			callBack(false);
		}
	}, function(err) {
		console.log('error with executeSql in getBySql:' + sql, err);
		callBack(false, err);
	});
}



function addColumn(tableName, columnName,columnType) {
	fgDB.transaction(function (tx) {
		tx.executeSql('alter table '+tableName+' add column '+columnName+' '+columnType+';');
	}, function () {
	}, function (er) {
		if (er) {
			console.log('error with executeSql', er);
		}
	});
}

/**
 * 计算 表列数量Deprecated
 */
function countTableColumnId(tableName, queryId, name, callback) {
	if(!tableName) return;
	var sql = 'SELECT count(*) as total FROM ' + tableName + " where id<>'" + queryId + "'" + " and name='" + name + "'";
	if(tableName == 'serviceplacetype') {
		sql = 'SELECT count(*) as total FROM ' + tableName + " where id<>'" + queryId + "'" + " and typeName='" + name + "'";
	}
	fgDB.executeSql(sql, function(res) {
		var total = 0;
		if(res.rows.length > 0) {
			/*if (Ext.os.is.Windows) {
				total = res.rows.item(0).total;
			} else {
				total = res.rows[0].total;
			}*/
			total = getSqlItem(res).total;
		}
		callback && callback(true, total);
	}, function(err) {
		callback && callback(false, err);
	});
}
function countTableColumnTypeId(tableName, queryId, id, name, callback) {
	if(!tableName) return;
	var sql = 'SELECT count(*) as total FROM ' + tableName + " where typeId='" + queryId + "'" + " and id<>'" + id + "' and name='" + name + "'";
	if(tableName == 'serviceplace') {
		sql = 'SELECT count(*) as total FROM ' + tableName + " where typeId='" + queryId + "'" + " and id<>'" + id + "' and placeName='" + name + "'";;
	}
	fgDB.executeSql(sql, function(res) {
		var total = 0;
		if(res.rows.length > 0) {
			/*if (Ext.os.is.Windows) {
				total = res.rows.item(0).total;
			} else {
				total = res.rows[0].total;
			}*/
			total = getSqlItem(res).total;
		}
		callback && callback(true, total);
	}, function(err) {
		callback && callback(false, err);
	});
}
function getSqlItem(res, index) {
	index = index ? index : 0;
	return res.rows.item(index);
}
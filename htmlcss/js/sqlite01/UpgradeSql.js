var upgradeSql = {
	'1.01' : [''],
	'1.02' : ['']
};

/*var upgradeSql = {
'1.01' : ['alter table setting add column define2 VARCHAR2(32);'],
'1.02' : ['DROP TABLE IF EXISTS setting;']
}*/

/**
 *补充字段
 */
function addNotExistColumn() {
	isColumnExist('seller', 'isWxpayOnline', function(success) {
		if (!success) {
			addColumn('seller', 'isWxpayOnline', 'VARCHAR2(1)');
		}
	});

	isColumnExist('commodityinfo', 'isSupportNorms', function(success) {
		if (!success) {
			addColumn('commodityinfo', 'isSupportNorms', 'VARCHAR2(1)');
			addColumn('commodityinfo', 'normsName1', 'VARCHAR2(50)');
			addColumn('commodityinfo', 'normsPrice1', 'decimal(18,2)');
			addColumn('commodityinfo', 'normsName2', 'VARCHAR2(50)');
			addColumn('commodityinfo', 'normsPrice2', 'decimal(18,2)');
			addColumn('commodityinfo', 'normsName3', 'VARCHAR2(50)');
			addColumn('commodityinfo', 'normsPrice3', 'decimal(18,2)');
			addColumn('commodityinfo', 'normsName4', 'VARCHAR2(50)');
			addColumn('commodityinfo', 'normsPrice4', 'decimal(18,2)');
			addColumn('commodityinfo', 'normsName5', 'VARCHAR2(50)');
			addColumn('commodityinfo', 'normsPrice5', 'decimal(18,2)');
			addColumn('commodityinfo', 'normsName6', 'VARCHAR2(50)');
			addColumn('commodityinfo', 'normsPrice6', 'decimal(18,2)');
			addColumn('commodityinfo', 'normsName7', 'VARCHAR2(50)');
			addColumn('commodityinfo', 'normsPrice7', 'decimal(18,2)');
			addColumn('commodityinfo', 'normsName8', 'VARCHAR2(50)');
			addColumn('commodityinfo', 'normsPrice8', 'decimal(18,2)');
		}
	});
	isColumnExist('commodityinfo', 'comboMealsJson', function(success) {
		if (!success) {
			addColumn('commodityinfo', 'comboMealsJson', 'text');
		}
	});
	isColumnExist('commodityinfo', 'expectedTime', function(success) {
		if (!success) {
			addColumn('commodityinfo', 'expectedTime', 'VARCHAR2(10)');
		}
	});

	isColumnExist('handover', 'inputAmount', function(success) {
		if (!success) {
			addColumn('handover', 'inputAmount', 'decimal(18,2)');
		}
	});

	isColumnExist('setting', 'isShouyinCustomerPrint', function(success) {
		if (!success) {
			addColumn('setting', 'isShouyinCustomerPrint', 'boolean');
			addColumn('setting', 'isShouyinPrivatePrint', 'boolean');
			addColumn('setting', 'isOrderCustomerPrint', 'boolean');
			addColumn('setting', 'isOrderPrivatePrint', 'boolean');
			addColumn('setting', 'isTicketCustomerCut', 'boolean');
			addColumn('setting', 'isTicketPrivateCut', 'boolean');
			addColumn('setting', 'ticketCustomerPrinter', 'VARCHAR2(150)');
			addColumn('setting', 'ticketCustomerPrinterNum', 'INTEGER');
			addColumn('setting', 'ticketCustomerRoll', 'INTEGER');
			addColumn('setting', 'ticketPrivatePrinter', 'VARCHAR2(150)');
			addColumn('setting', 'ticketPrivatePrinterNum', 'INTEGER');
			addColumn('setting', 'ticketPrivateRoll', 'INTEGER');
			addColumn('setting', 'kitchenRoll', 'INTEGER');
		}
	});

	isColumnExist('setting', 'isMultiKitchen', function(success) {
		if (!success) {
			addColumn('setting', 'isMultiKitchen', 'VARCHAR2(1)');
			addColumn('setting', 'settingPrintJson', 'text');
		}
	});

	isColumnExist('setting', 'openPlaceSettingJson', function(success) {
		if (!success) {
			addColumn('setting', 'openPlaceSettingJson', 'text');
		}
	});

	isColumnExist('setting', 'settingCashJson', function(success) {
		if (!success) {
			addColumn('setting', 'settingCashJson', 'text');
		}
	});

	isColumnExist('setting', 'settingPayJson', function(success) {
		if (!success) {
			addColumn('setting', 'settingPayJson', 'text');
		}
	});

	isColumnExist('setting', 'kitchenPrinterBeep', function(success) {
		if (!success) {
			addColumn('setting', 'kitchenPrinterBeep', 'VARCHAR2(1)');
		}
	});

	isColumnExist('sellinfo', 'sellNo', function(success) {
		if (!success) {
			addColumn('sellinfo', 'sellNo', 'INTEGER');
		}
	});

	isColumnExist('sellercustomerinfo', 'syned', function(success) {
		if (!success) {
			addColumn('sellercustomerinfo', 'syned', 'VARCHAR2(1)');
		}
	});

	isColumnExist('commoditytype', 'iskitchenprint', function(success) {
		if (!success) {
			addColumn('commoditytype', 'iskitchenprint', 'VARCHAR2(1)');
			addColumn('commoditytype', 'kitchenPrintJson', 'text');
		}
	});

	isColumnExist('selldetail', 'iskitchenprint', function(success) {
		if (!success) {
			addColumn('selldetail', 'iskitchenprint', 'VARCHAR2(1)');
			addColumn('selldetail', 'kitchenPrintJson', 'text');
		}
	});

	isColumnExist('selldetail', 'remarkPrice', function(success) {
		if (!success) {
			addColumn('selldetail', 'remarkPrice', 'decimal(18,2)');
			addColumn('selldetail', 'remarkAmount', 'decimal(18,2)');
		}
	});
	isColumnExist('selldetail', 'expectedTime', function(success) {
		if (!success) {
			addColumn('selldetail', 'expectedTime', 'VARCHAR2(10)');
		}
	});
	isColumnExist('orderdetail', 'expectedTime', function(success) {
		if (!success) {
			addColumn('orderdetail', 'expectedTime', 'VARCHAR2(10)');
		}
	});
	isColumnExist('seller', 'isRegisterPay', function(success) {
		if (!success) {
			addColumn('seller', 'isRegisterPay', 'VARCHAR2(2)');
		}
	});
	isColumnExist('seller', 'isWxpayStatus', function(success) {
		if (!success) {
			addColumn('seller', 'isWxpayStatus', 'VARCHAR2(2)');
		}
	});
	isColumnExist('handover', 'returnPrepayAmount', function(success) {
		if (!success) {
			addColumn('handover', 'returnPrepayAmount', 'decimal(18,2)');
		}
	});
	isColumnExist('handover', 'reversePrepayAmount', function(success) {
		if (!success) {
			addColumn('handover', 'reversePrepayAmount', 'decimal(18,2)');
		}
	});

	if (parseFloat(version) > 1.1) {
		isColumnExist('sellinfo', 'wxpayOnlineAmount', function(success) {
			if (!success) {
				addColumn('sellinfo', 'wxpayOnlineAmount', 'decimal(18,2)');
			}
		});

		isColumnExist('sellinfo', 'alipayOnlineAmount', function(success) {
			if (!success) {
				addColumn('sellinfo', 'alipayOnlineAmount', 'decimal(18,2)');
			}
		});

		isColumnExist('handover', 'preAlipayOnlineAmount', function(success) {
			if (!success) {
				addColumn('handover', 'preAlipayOnlineAmount', 'decimal(18,2)');
			}
		});

		isColumnExist('handover', 'preWxpayOnlineAmount', function(success) {
			if (!success) {
				addColumn('handover', 'preWxpayOnlineAmount', 'decimal(18,2)');
			}
		});

		isColumnExist('handover', 'wxpayOnlineAmount', function(success) {
			if (!success) {
				addColumn('handover', 'wxpayOnlineAmount', 'decimal(18,2)');
			}
		});

		isColumnExist('handover', 'alipayOnlineAmount', function(success) {
			if (!success) {
				addColumn('handover', 'alipayOnlineAmount', 'decimal(18,2)');
			}
		});
		isColumnExist('seller', 'isAllowPay', function(success) {
			if (!success) {
				addColumn('seller', 'isAllowPay', 'VARCHAR2(2)');
			}
		});
		isColumnExist('serviceplacetype', 'teaUnitPrice', function(success) {
			if (!success) {
				addColumn('serviceplacetype', 'teaUnitPrice', 'decimal(12,2)');
			}
		});
	}

	if (parseFloat(version) > 1.2) {
		isColumnExist('selldetail', 'orderByTime', function(success) {
			if (!success) {
				addColumn('selldetail', 'orderByTime', 'VARCHAR2(30)');
			}
		});
		isColumnExist('setting', 'ticketCustomerPageWidth', function(success) {
			if (!success) {
				addColumn('setting', 'ticketCustomerPageWidth', 'INTEGER');
				addColumn('setting', 'ticketPrivatePageWidth', 'INTEGER');
				addColumn('setting', 'kitchenPageWidth', 'INTEGER');
			}
		});
		isColumnExist('selleremployee', 'eraseZeroMaxAmount', function(success) {
			if (!success) {
				addColumn('selleremployee', 'eraseZeroMaxAmount', 'decimal(11,2)');
			}
		});
		isColumnExist('seller', 'channelId', function(success) {
			if (!success) {
				addColumn('seller', 'channelId', 'VARCHAR2(32)');
			}
		});
		isColumnExist('sellinfo', 'isDelete', function(success) {
			if (!success) {
				addColumn('sellinfo', 'isDelete', 'VARCHAR2(2)');
			}
		});
		isColumnExist('setting', 'printerCustomerModel', function(success) {
			if (!success) {
				addColumn('setting', 'printerCustomerModel', 'VARCHAR2(16)');
				addColumn('setting', 'printerPrivateModel', 'VARCHAR2(16)');
				addColumn('setting', 'printerKitchenModel', 'VARCHAR2(16)');
			}
		});
	}

	if (parseFloat(version) > 1.3) {
		isColumnExist('commodityinfo', 'soldoutNum', function(success) {
			if (!success) {
				//addColumn('commodityinfo', 'soldoutNum', 'INTEGER');
				addColumn('commodityinfo', 'soldoutNum', 'decimal(18,2)');
			}
		});
		isColumnExist('commodityinfo', 'isTimePrice', function(success) {
			if (!success) {
				addColumn('commodityinfo', 'isTimePrice', 'VARCHAR2(1)');
			}
		});
		isColumnExist('selldetail', 'isTimePrice', function(success) {
			if (!success) {
				addColumn('selldetail', 'isTimePrice', 'VARCHAR2(1)');
			}
		});
		isColumnExist('commodityinfo', 'isSpecialPrice', function(success) {
			if (!success)
				addColumn('commodityinfo', 'isSpecialPrice', 'VARCHAR2(1)');
		});
		isColumnExist('commodityinfo', 'specialPrice', function(success) {
			if (!success) {
				addColumn('commodityinfo', 'specialPrice', 'decimal(18, 2)');
			}
		});

		isColumnExist('commoditytype', 'isDiscount', function(success) {
			if (!success) {
				addColumn('commoditytype', 'isDiscount', 'VARCHAR2(1)');
			}
		});
		isColumnExist('selldetail', 'isDiscount', function(success) {
			if (!success) {
				addColumn('selldetail', 'isDiscount', 'VARCHAR2(1)');
			}
		});
		isColumnExist('selldetail', 'isSpecialPrice', function(success) {
			if (!success) {
				addColumn('selldetail', 'isSpecialPrice', 'VARCHAR2(1)');
			}
		});
		isColumnExist('commodityinfo', 'specialNorms', function(success) {
			if (!success) {
				addColumn('commodityinfo', 'specialNorms', 'VARCHAR2(200)');
			}
		});
		isColumnExist('selldetail', 'hasTransmitPrinted', function(success) {
			if (!success) {
				addColumn('selldetail', 'hasTransmitPrinted', 'VARCHAR2(1)');
			}
		});
		isColumnExist('setting', 'weightCOM', function(success) {
			if (!success) {
				addColumn('setting', 'weightCOM', 'VARCHAR2(8)')
			}
		});
		isColumnExist('sellinfo', 'isCoupon', function(success) {
			if (!success) {
				addColumn('sellinfo', 'isCoupon', 'VARCHAR2(1)');
			}
		});
		isColumnExist('sellinfo', 'couponMoney', function(success) {
			if (!success) {// 满减金额
				addColumn('sellinfo', 'couponMoney', 'INTEGER');
			}
		});
		isColumnExist('sellinfo', 'couponName', function(success) {
			if (!success) {// 满减名称
				addColumn('sellinfo', 'couponName', 'VARCHAR2(100)');
			}
		});
		isColumnExist('couponconfig', 'isDeleted', function(success) {
			if (!success) {
				addColumn('couponconfig', 'isDeleted', 'VARCHAR2(2)');
			}
		});

		isColumnExist('sellinfo', 'discountAmount', function(success) {
			if (!success) {
				addColumn('sellinfo', 'discountAmount', 'decimal(18,2)');
			}
		});
		isColumnExist('sellinfo', 'notDiscountAmount', function(success) {
			if (!success)
				addColumn('sellinfo', 'notDiscountAmount', 'decimal(18,2)');
		});
		isColumnExist('sellinfo', 'customerAmount', function(success) {
			if (!success) {
				addColumn('sellinfo', 'customerAmount', 'decimal(18,2)');
			}
		});

		isColumnExist('payconfig', 'payType', function(success) {
			if (!success) {
				addColumn('payconfig', 'payType', 'VARCHAR2(50)');
			}
		});
		isColumnExist('payconfig', 'payTypeName', function(success) {
			if (!success) {
				addColumn('payconfig', 'payTypeName', 'VARCHAR2(50)');
			}
		});

		isColumnExist('commoditytype', 'isInventory', function(success) {
			if (!success) {
				addColumn('commoditytype', 'isInventory', 'VARCHAR2(1)');
			}
		});

		isColumnExist('commodityinfo', 'unit', function(success) {
			if (!success) {
				addColumn('commodityinfo', 'unit', 'VARCHAR2(32)');
			}
		});

		isColumnExist('selldetail', 'unit', function(success) {
			if (!success) {
				addColumn('selldetail', 'unit', 'VARCHAR2(32)');
			}
		});

		isColumnExist('handover', 'customerAmount', function(success) {
			if (!success) {
				addColumn('handover', 'customerAmount', 'decimal(12,2)');
			}
		});
		isColumnExist('selleremployee', 'mobile', function(success) {
			if (!success) {
				addColumn('selleremployee', 'mobile', 'VARCHAR2(20)');
			}
		});
		isColumnExist('setting', 'isMtOrderKitchenPrint', function(success) {
			if (!success) {
				addColumn('setting', 'isMtOrderKitchenPrint', 'VARCHAR2(1)');
			}
		});
		isColumnExist('setting', 'isMtOrderCustomerPrint', function(success) {
			if (!success) {
				addColumn('setting', 'isMtOrderCustomerPrint', 'VARCHAR2(1)');
			}
		});
		isColumnExist('setting', 'isMtOrderPrivatePrint', function(success) {
			if (!success) {
				addColumn('setting', 'isMtOrderPrivatePrint', 'VARCHAR2(1)');
			}
		});
		isColumnExist('setting', 'isMtOrderLabelPrint', function(success) {
			if (!success) {
				addColumn('setting', 'isMtOrderLabelPrint', 'VARCHAR2(1)');
			}
		});
		isColumnExist('wporder', 'teaAmount', function(success) {
			if (!success) {
				addColumn('wporder', 'teaAmount', 'decimal(12,2)');
			}
		});
		isColumnExist('wporder', 'teaPrice', function(success) {
			if (!success) {
				addColumn('wporder', 'teaPrice', 'decimal(12,2)');
			}
		});
		isColumnExist('wporder', 'couponId', function(success) {
			if (!success) {
				addColumn('wporder', 'couponId', 'VARCHAR2(50)');
			}
		});
		isColumnExist('wporder', 'couponMoney', function(success) {
			if (!success) {
				addColumn('wporder', 'couponMoney', 'decimal(12,2)');
			}
		});
		isColumnExist('wporder', 'couponName', function(success) {
			if (!success) {
				addColumn('wporder', 'couponName', 'VARCHAR2(50)');
			}
		});
		isColumnExist('wporder', 'isCoupon', function(success) {
			if (!success) {
				addColumn('wporder', 'isCoupon', 'VARCHAR2(2)');
			}
		});
		isColumnExist('orderdetail', 'isSpecialPrice', function(success) {
			if (!success) {
				addColumn('orderdetail', 'isSpecialPrice', 'VARCHAR2(2)');
			}
		});
		isColumnExist('takeoutorderdetail', 'labelPrint', function(success) {
			if (!success) {
				addColumn('takeoutorderdetail', 'labelPrint', 'VARCHAR2(2)');
			}
		});
		isColumnExist('takeoutorderdetail', 'kitchenPrintJson', function(success) {
			if (!success) {
				addColumn('takeoutorderdetail', 'kitchenPrintJson', 'text');
			}
		});
		isColumnExist('takeoutorderdetail', 'kitchenPrint', function(success) {
			if (!success) {
				addColumn('takeoutorderdetail', 'kitchenPrint', 'VARCHAR2(2)');
			}
		});
		isColumnExist('takeoutorderdetail', 'iskitchenprint', function(success) {
			if (!success) {
				addColumn('takeoutorderdetail', 'iskitchenprint', 'VARCHAR2(2)');
			}
		});
		isColumnExist('sellinfo', 'boxAmount', function(success) {
			if (!success) {
				addColumn('sellinfo', 'boxAmount', 'decimal(12,2)');
			}
		});
		isColumnExist('sellinfo', 'shippingFee', function(success) {
			if (!success) {
				addColumn('sellinfo', 'shippingFee', 'decimal(12,2)');
			}
		});

		isColumnExist('sellinfo', 'workId', function(success) {
			if (!success) {
				addColumn('sellinfo', 'workId', 'VARCHAR2(32)');
				addColumn('sellinfo', 'workName', 'VARCHAR2(50)');
			}
		});
		isColumnExist('sellinfo', 'saleWorkId', function(success) {
			if (!success) {
				addColumn('sellinfo', 'saleWorkId', 'VARCHAR2(32)');
			}
		});
		/**
		 * showStatus : 1.商家已拒接, 2. 商家已作废, 3. 用户取消
		 */
		isColumnExist('takeoutorder', 'showStatus', function(success) {
			if (!success) {
				addColumn('takeoutorder', 'showStatus', 'VARCHAR2(5)');
			}
		});
		isColumnExist('sellinfo', 'meituanAmount', function(success) {
			if (!success) {
				addColumn('sellinfo', 'meituanAmount', 'decimal(12,2)');
			}
		});
		isColumnExist('handover', 'meituanAmount', function(success) {
			if (!success) {
				addColumn('handover', 'meituanAmount', 'decimal(12,2)');
			}
		});

		isColumnExist('kitchenprinter', 'isDeleted', function(success) {
			if (!success) {
				addColumn('kitchenprinter', 'isDeleted', 'VARCHAR2(2)');
			}
		});
		
		isColumnExist('specialprice', 'isDeleted', function(success) {
			if (!success) {
				addColumn('specialprice', 'isDeleted', 'VARCHAR2(2)');
			}
		});
		
		isColumnExist('seller', 'serviceProxyId', function(success) {
			if(!success) {
				addColumn('seller', 'serviceProxyId', 'VARCHAR2(32)');
			}
		});
		isColumnExist('seller', 'softwareServiceId', function(success) {
			if(!success) {
				addColumn('seller', 'softwareServiceId', 'VARCHAR2(32)');
			}
		});
	}
}

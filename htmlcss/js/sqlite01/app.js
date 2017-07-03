var localFileName = "testa.db", fgDB;
fgDB = new sqliteDB(localFileName, 1024 * 1024 * 2);
var version = '1.51';

function initData() {
	// dwr.engine._pathToDwrServlet = webPushHost + '/dwr';
	// dwr.util._pathToDwrServlet = webPushHost + '/dwr';
	// //path是服务端的url路径
	// MessagePush._path = webPushHost + '/dwr';
	// dwr.engine.setActiveReverseAjax(true);
	// dwr.engine.setNotifyServerOnPageUnload(true);
	// userMap = Ext.create('Ext.util.HashMap');
	// payMap = [];
    /**
     * 
    setTimeout(function() {
		//判断 本机是否已经激活
		//isActivation();
		//检查当前版本是否有更新表结构
		//SellerDao.upgradeCurrentVersion();
		//判断是否有版本更新
		isVersionUpdate(function(success, msg, versionCode, packgeName, content) {
			if (success) {
				showUpgrade(versionCode, packgeName, content);
			}
		});
		// 初始化商家信息或加载
		loadLocalUser();
		//启动node服务
		if (window.startNodeScript) {
			startNodeScript();
		}
		//加载系统设置
		initSysSetting();

		initSysCoupon();

	}, 200);
     */
	
}

function initFGdb() {
	fgDB.transaction(function(tx) {
		//不要打开
		// tx.executeSql('DROP TABLE IF EXISTS activationinfo');
		// tx.executeSql('DROP TABLE IF EXISTS version');
		//tx.executeSql('DROP TABLE IF EXISTS seller');
		//tx.executeSql('DROP TABLE IF EXISTS selleremployee');
		//tx.executeSql('DROP TABLE IF EXISTS commoditytype');
		//tx.executeSql('DROP TABLE IF EXISTS commodityinfo');
		//tx.executeSql('DROP TABLE IF EXISTS sellinfo');
		//tx.executeSql('DROP TABLE IF EXISTS selldetail');
		//tx.executeSql('DROP TABLE IF EXISTS handover');
		//tx.executeSql('DROP TABLE IF EXISTS setting');
		//tx.executeSql('DROP TABLE IF EXISTS wporder');
		//tx.executeSql('DROP TABLE IF EXISTS orderdetail');
		//tx.executeSql('DROP TABLE IF EXISTS sellerremark');
		//tx.executeSql('DROP TABLE IF EXISTS serviceplacetype');
		//tx.executeSql('DROP TABLE IF EXISTS serviceplace');
		//tx.executeSql('DROP TABLE IF EXISTS sellercustomertype');
		//tx.executeSql('DROP TABLE IF EXISTS sellercustomerinfo');
		//tx.executeSql('DROP TABLE IF EXISTS message');
		//tx.executeSql('DROP TABLE IF EXISTS discount');
		//tx.executeSql('DROP TABLE IF EXISTS payconfig');
		//tx.executeSql('DROP TABLE IF EXISTS couponconfig');
		//tx.executeSql('DROP TABLE IF EXISTS kitchenprinter');
		//tx.executeSql('DROP TABLE IF EXISTS specialprice');
		//tx.executeSql('DROP TABLE IF EXISTS takeoutorder');
		//tx.executeSql('DROP TABLE IF EXISTS takeoutorderdetail');
		//tx.executeSql('DROP TABLE IF EXISTS sellerunit');
		//tx.executeSql('DROP TABLE IF EXISTS takeoutordercoupon');
		//tx.executeSql('DROP TABLE IF EXISTS takeoutordercoupondetail');
		//tx.executeSql('DROP TABLE IF EXISTS sellerpaytypes');
		//tx.executeSql('DROP TABLE IF EXISTS tipsdetail');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [version] ([id] INTEGER PRIMARY KEY AUTOINCREMENT, [versionCode] VARCHAR2(10),[define1] VARCHAR2(32),[define2] VARCHAR2(32),[define3] VARCHAR2(32),[define4] VARCHAR2(32))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [seller] ([id] VARCHAR2(32), [mobile] VARCHAR2(16),[userName] VARCHAR2(20), [password] VARCHAR2(20), [ename] VARCHAR2(50), [phone] VARCHAR2(20), [tradeId] VARCHAR2(32),[parentSellerId] VARCHAR2(32),[contact] VARCHAR2(50),[location] VARCHAR2(200),[email] VARCHAR2(50),[circleId] VARCHAR2(32),[cityId] VARCHAR2(32),[teaPrice] decimal(18,2),[isWxpayOnline] VARCHAR2(1),[define1] VARCHAR2(32),[define2] VARCHAR2(32),[define3] VARCHAR2(32),[define4] VARCHAR2(100), [isRegisterPay] VARCHAR2(2), [isWxpayStatus] VARCHAR2(2))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [selleremployee] ([id] VARCHAR2(32), [workId] VARCHAR2(16), [password] VARCHAR2(20), [workName] VARCHAR2(16), [type] VARCHAR2(2),[sellerId] VARCHAR2(32),[define1] VARCHAR2(32),[define2] VARCHAR2(32),[define3] VARCHAR2(32),[define4] VARCHAR2(32),permissions VARCHAR2(200))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [commoditytype] ([id] VARCHAR2(32), [name] VARCHAR2(50), [sequence] INTEGER,[typeLevel] INTEGER,[sellerId] VARCHAR2(32),[parentCommodityTypeId] VARCHAR2(32),[parentSellerId] VARCHAR2(32),[syned] VARCHAR2(1),[isDelete] VARCHAR2(1),[iskitchenprint] VARCHAR2(1),[kitchenPrintJson] text)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [commodityinfo] ([id] VARCHAR2(32), [name] VARCHAR2(50), [price] decimal(18,2), [logo] VARCHAR2(50), [sequence] INTEGER, [typeId] VARCHAR2(32),[pinyinCode] VARCHAR2(20),[barCode] VARCHAR2(32),[vipPrice] Double,[tradePrice] double,[isDiscount] VARCHAR2(1),[costPrice] double,[oriPrice] double,[category] VARCHAR2(2),[unit] VARCHAR2(10),[sellNum] Integer,[style1] VARCHAR2(32),[style2] VARCHAR2(32),[isPoints] VARCHAR2(1),[define1] VARCHAR2(32),[define2] VARCHAR2(32),[define3] VARCHAR2(32),[define4] VARCHAR2(100),[sellerId] VARCHAR2(32),[parentSellerId] VARCHAR2(32),[parentCommodityId] VARCHAR2(32),[status] VARCHAR2(2),[isTimecard] VARCHAR2(1),[timeNum] integer,[soldoutStatus] VARCHAR2(1),[timeCommodityId] VARCHAR2(32),[syned] VARCHAR2(1),[isDelete] VARCHAR2(1),[kitchenPrint] VARCHAR2(1),[labelPrint] VARCHAR2(1),[isSupportNorms] VARCHAR2(1),[normsName1] VARCHAR2(50),[normsPrice1] decimal(18,2),[normsName2] VARCHAR2(50),[normsPrice2] decimal(18,2),[normsName3] VARCHAR2(50),[normsPrice3] decimal(18,2),[normsName4] VARCHAR2(50),[normsPrice4] decimal(18,2),[normsName5] VARCHAR2(50),[normsPrice5] decimal(18,2),[normsName6] VARCHAR2(50),[normsPrice6] decimal(18,2),[normsName7] VARCHAR2(50),[normsPrice7] decimal(18,2),[normsName8] VARCHAR2(50),[normsPrice8] decimal(18,2),[comboMealsJson] text,[expectedTime] VARCHAR2(10))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [sellinfo] ([id] VARCHAR2(32), [employeeId] VARCHAR2(32),[workId] VARCHAR2(32),[workName] VARCHAR2(50), [saleId] VARCHAR2(32), [saleWorkId] VARCHAR2(32), [saleName] VARCHAR2(50), ' + '[customerId] VARCHAR2(32),[customerName] VARCHAR2(50),[customerMobile] VARCHAR2(36),[customerAddress] VARCHAR2(300),[waiterId] VARCHAR2(32),[waiterName] VARCHAR2(50),[sendId] VARCHAR2(32),[couponId] VARCHAR2(32), [status] VARCHAR2(1), [payType] VARCHAR2(2), [sourceType] VARCHAR2(2), ' + '[discount] decimal(18,2),[commodityNum] integer,[cashAmount] decimal(18,2),[wxpayAmount] decimal(18,2),[unionpayAmount] decimal(18,2),[prepayAmount] decimal(18,2),' + '[alipayAmount] decimal(18,2),[timepayAmount] decimal(18,2),[pointspayAmount] decimal(18,2),[totalAmount] decimal(18,2),[sellAmount] decimal(18,2),[shopSign] VARCHAR2(10), [sellType] VARCHAR2(2),[sellTime] VARCHAR2(20),[endTime] VARCHAR2(20),[subscriptionAmount] decimal(18,2),[isHandover] VARCHAR2(1),[remark] VARCHAR2(200), [sellerId] VARCHAR2(32),[parentSellerId] VARCHAR2(32),[syned] VARCHAR2(1),[busType] VARCHAR2(1),[orderId] VARCHAR2(32),[placeId] VARCHAR2(32),[placeName] VARCHAR2(32),[placeTypeId] VARCHAR2(32),[placeTypeName] VARCHAR2(32),[personNum] integer,[isVip] VARCHAR2(1),[teaPrice] decimal(18,2),[teaAmount] decimal(18,2),[surplusAmount] decimal(18,2),[factAmount] decimal(18,2),[eraseZeroAmount] decimal(18,2),[remarkIds] VARCHAR2(200),[handoverId] VARCHAR2(32),[sellNo] integer,[define1] VARCHAR2(32),[define2] VARCHAR2(32),[define3] VARCHAR2(32),[define4] VARCHAR2(32),[wxpayOnlineAmount] decimal(18,2),[alipayOnlineAmount] decimal(18,2))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [selldetail] ([id] VARCHAR2(32), [sellNum] INTEGER, [sellPrice] decimal(18,2),[remarkPrice] decimal(18,2),[remarkAmount] decimal(18,2), [discount] decimal(18,2),[commodityPrice] decimal(18,2),[commodityId] VARCHAR2(32),[commodityName] VARCHAR2(32),[barCode] VARCHAR2(20),[totalAmount] decimal(18,2),[sellAmount] decimal(18,2),[sellId] VARCHAR2(32), [sellerId] VARCHAR2(32), [remark] VARCHAR2(300),[remarkIds] VARCHAR2(200),[createTime] VARCHAR2(20),[type] varchar(1),[commodityTypeId] VARCHAR2(32),[parentCommodityId] VARCHAR2(32),[parentCommodityTypeId] VARCHAR2(32),[parentSellerId] VARCHAR2(32),[isTimecard] VARCHAR2(1),[isDelete] VARCHAR2(1),[kitchenPrint] VARCHAR2(1),[labelPrint] VARCHAR2(1),[hasKitchenPrinted] VARCHAR2(1),[hasLabelPrinted] VARCHAR2(1),[openId] VARCHAR2(128),[unionId] VARCHAR2(128),[handoverId] VARCHAR2(32), [iskitchenprint] VARCHAR2(1), [kitchenPrintJson] text, [expectedTime] VARCHAR2(10))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [handover] ([id] VARCHAR2(32), [employeeId] VARCHAR2(32), [workId] VARCHAR2(32), [workName] VARCHAR2(32),[status] VARCHAR2(1),[sellNum] integer,[commodityNum] integer,[cashAmount] decimal(18,2),[wxpayAmount] decimal(18,2),[unionpayAmount] decimal(18,2),[prepayAmount] decimal(18,2),' + '[alipayAmount] decimal(18,2),[timepayAmount] decimal(18,2),[pointspayAmount] decimal(18,2),[totalAmount] decimal(18,2),[sellAmount] decimal(18,2),[returnAmount] decimal(18,2), [startTime] VARCHAR2(2),[endTime] VARCHAR2(20),[subscriptionAmount] decimal(18,2),[pettyCash] decimal(18,2),[syned] VARCHAR2(1),[preAmount] decimal(18,2),[preCashAmount] decimal(18,2),[preWxpayAmount] decimal(18,2),[preUnionpayAmount] decimal(18,2),[preAlipayAmount] decimal(18,2),[presentAmount] decimal(18,2),[returnCashAmount] decimal(18,2),[reverseSellAmount] decimal(18,2),[reverseCashAmount] decimal(18,2),[rechargeNum] INTEGER,[inputAmount] decimal(18,2), [sellerId] VARCHAR2(32),[define1] VARCHAR2(32),[define2] VARCHAR2(32),[define3] VARCHAR2(32),[define4] VARCHAR2(100),[wxpayOnlineAmount] decimal(18,2),[alipayOnlineAmount] decimal(18,2),[returnPrepayAmount] decimal(18,2),[reversePrepayAmount] decimal(18,2))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [setting] ([id] INTEGER PRIMARY KEY AUTOINCREMENT,[isShouyinCustomerPrint] Boolean, [isShouyinPrivatePrint] Boolean,[isOrderCustomerPrint] Boolean, [isOrderPrivatePrint] Boolean,[isShouyinKitchenPrint] Boolean, [isOrderKitchenPrint] Boolean, [isShouyinLabelPrint] Boolean, [isOrderLabelPrint] Boolean, [isHandoverPrint] Boolean, [isRechargePrint] Boolean,[isCommodityImage] Boolean,[isTicketCustomerCut] Boolean,[isTicketPrivateCut] Boolean,[ticketCustomerPrinter] VARCHAR2(150),[ticketCustomerPrinterNum] INTEGER,[ticketCustomerRoll] INTEGER,[ticketPrivatePrinter] VARCHAR2(150),[ticketPrivatePrinterNum] INTEGER,[ticketPrivateRoll] INTEGER,[kitchenPrinter] VARCHAR2(150),[kitchenPrinterNum] INTEGER,[kitchenPrinterType] VARCHAR2(1),[kitchenRoll] INTEGER,[tagPrinter] VARCHAR2(150),[tagPrinterNum] INTEGER,[tagPrinterX] INTEGER,[tagPrinterY] INTEGER,[tagPrinterGAP] INTEGER,[defaultMode] INTEGER,[usedCOM] VARCHAR2(8),[printHeader] VARCHAR2(500),[printBottom] VARCHAR2(500),[printLogo] text,[printQrCode] text,[defaultPettyCash] decimal(18,2),[wxpayQrCode] text,[alipayQrCode] text,[define1] VARCHAR2(32),[define2] VARCHAR2(32),[define3] VARCHAR2(32),[define4] VARCHAR2(100),[ringtone] VARCHAR(512),[isMultiKitchen] VARCHAR2(1), [settingPrintJson] text,[openPlaceSettingJson] text, [settingCashJson] text, [settingPayJson] text, [kitchenPrinterBeep] VARCHAR2(1))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [wporder] ([id] VARCHAR2(32), [sellAmount] decimal(18,2), [sellNum] INTEGER, [discountAmount] decimal(18,2), [sellerId] VARCHAR2(32), [sendDate] VARCHAR2(20), [customerId] VARCHAR2(32),[submitType] VARCHAR2(1), [isReturn] VARCHAR2(1), [name] VARCHAR2(32), [address] VARCHAR2(200), [mobile] VARCHAR2(15), [sourceType] VARCHAR2(2), [createTime] VARCHAR2(20), [endTime] VARCHAR2(20), [status] VARCHAR2(2), [sendType] VARCHAR2(2), [payStatus] VARCHAR2(2), [sendAmount] VARCHAR2(32), [takeAddress] VARCHAR2(200), [payType] VARCHAR2(2), [reason] VARCHAR2(200), [isComment] VARCHAR2(1), [isOpt] VARCHAR2(1),[isPush] VARCHAR2(1),[bookType] VARCHAR2(1),[placeId] VARCHAR2(32),[placeName] VARCHAR2(100),[numberMeals] INTEGER, [remark] VARCHAR2(300),[remarkIds] VARCHAR2(200),[define1] VARCHAR2(32),[define2] VARCHAR2(32),[define3] VARCHAR2(32),[define4] VARCHAR2(100))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [orderdetail] ([id] VARCHAR2(32), [sellNum] INTEGER, [sellPrice] decimal(18,2), [discountAmount] decimal(18,2),[totalAmount] decimal(18,2),[commodityId] VARCHAR2(32),[commodityTypeId] VARCHAR2(32),[commodityName] VARCHAR2(50),[orderId] VARCHAR2(32),[openId] VARCHAR2(128),[unionId] VARCHAR2(128), [remark] VARCHAR2(300),[remarkIds] VARCHAR2(200),[define1] VARCHAR2(32),[define2] VARCHAR2(32),[define3] VARCHAR2(32),[define4] VARCHAR2(100),[kitchenPrint] VARCHAR2(1),[labelPrint] VARCHAR2(1),[expectedTime] VARCHAR2(10))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [sellerremark] ([id] VARCHAR2(32), [remark] VARCHAR2(50), [sequence] INTEGER ,[price] decimal(18,2),[sellerId] VARCHAR2(32),[syned] VARCHAR2(1),[isDelete] VARCHAR2(1),[define1] VARCHAR2(32),[define2] VARCHAR2(32),[define3] VARCHAR2(32),[define4] VARCHAR2(100))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [activationinfo] ([id] INTEGER PRIMARY KEY AUTOINCREMENT, [ecode] VARCHAR2(20), [activationCode] VARCHAR2(20), [activationStatus] VARCHAR2(1), [sellerId] VARCHAR2(32), [activationDate] VARCHAR2(20), [isRegister] VARCHAR2(1),[useDay] integer,[expirationDate] VARCHAR2(20),[define1] VARCHAR2(32),[define2] VARCHAR2(32),[define3] VARCHAR2(32),[define4] VARCHAR2(100))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [serviceplacetype] ([id] VARCHAR2(32), [typeName] VARCHAR2(50), [sequence] INTEGER,[remark] VARCHAR2(100),[sellerId] VARCHAR2(32),[parentSellerId] VARCHAR2(32),[syned] VARCHAR2(1),[isDelete] VARCHAR2(1))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [serviceplace] ([id] VARCHAR2(32),[placeName] VARCHAR2(50),[typeId] VARCHAR2(32), [typeName] VARCHAR2(50), [sequence] INTEGER,[remark] VARCHAR2(100),[personNum] INTEGER,[sellerId] VARCHAR2(32),[parentSellerId] VARCHAR2(32),[status] VARCHAR2(1),[syned] VARCHAR2(1),[isDelete] VARCHAR2(1))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [sellercustomertype] ([id] VARCHAR2(32), [typeName] VARCHAR2(50), [parentId] VARCHAR2(32),[sequence] VARCHAR2(30),[typeLevel] VARCHAR2(10),[sellerId] VARCHAR2(32),[parentSellerId] VARCHAR2(32))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [sellercustomerinfo] ([id] VARCHAR2(32), [name] VARCHAR2(50), [mobile] VARCHAR2(20),[birthday] VARCHAR2(30),[sellerId] VARCHAR2(32),[address] VARCHAR2(100),[sex] VARCHAR2(2),[nickName] VARCHAR2(60),[qq] VARCHAR2(20),[createDate] VARCHAR2(20),[type] VARCHAR2(32),[syned] VARCHAR2(1),[define1] VARCHAR2(32),[define2] VARCHAR2(32),[define3] VARCHAR2(32),[define4] VARCHAR2(100))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [message] ([id] VARCHAR2(32), [type] VARCHAR2(1), [message] VARCHAR2(1),[sellerId] VARCHAR2(32),[sellId] VARCHAR2(32),[placeId] VARCHAR2(32),[placeName] VARCHAR2(100),[isRead] VARCHAR2(1),[createTime] VARCHAR2(20),[define1] VARCHAR2(32),[define2] VARCHAR2(32))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [discount] ([id] VARCHAR2(32), [discount] decimal(18,2), [isSupportPwd] VARCHAR2(1),[sellerId] VARCHAR2(32),[password] VARCHAR2(32),[remark] VARCHAR2(300),[define1] VARCHAR2(32),[define2] VARCHAR2(32))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [payconfig] ([id] VARCHAR2(32), [sellerId] VARCHAR2(32), [payType] VARCHAR2(2), [openStatus] VARCHAR2(2), [status] VARCHAR2(2), [syned] VARCHAR2(1))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [couponconfig] ([id] VARCHAR2(32), [sellerId] VARCHAR2(32), [couponRange] VARCHAR2(10), [costMoney] decimal(12, 2), [subtractMoney] decimal(12,2), [couponCycle] VARCHAR2(1), [couponStartTime] VARCHAR2(5), [couponEndTime] VARCHAR2(5), [couponStartDate] VARCHAR2(100), [couponEndDate] VARCHAR2(100), [couponWeek] VARCHAR2(32), [couponName] VARCHAR2(100), [commodityTypeId] VARCHAR2(200), [status] VARCHAR2(1), [syned] VARCHAR2(1), [isDeleted] VARCHAR2(2))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [kitchenprinter] ([id] VARCHAR2(32), [sellerId] VARCHAR2(32), [ktPrintName] VARCHAR2(50), [ktPrintIp] VARCHAR2(32), [isDeleted] VARCHAR2(2), [syned] VARCHAR2(1))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [specialprice] ([id] VARCHAR2(32), [sellerId] VARCHAR2(32), [specialName] VARCHAR2(32), [specialPrice] decimal(18,2), [commodityId] VARCHAR2(200), [specialPriceRange] VARCHAR2(10), [specialPriceCycle] VARCHAR2(1), [specialPriceStartTime] VARCHAR2(5), [specialPriceEndTime] VARCHAR2(5), [specialPriceStartDate] VARCHAR2(100), [specialPriceEndDate] VARCHAR2(100), [specialPriceWeek] VARCHAR2(32), [specialNormsName] VARCHAR2(50), [status] VARCHAR2(1), [isDeleted] VARCHAR2(2), [syned] VARCHAR2(1))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [takeoutorder] ([orderId] VARCHAR2(32), [sellerId] VARCHAR2(32), [orderIdView] VARCHAR2(32), [caution] VARCHAR2(200), ' + '[cityId] VARCHAR2(10), [ctime] VARCHAR2(20), [utime] VARCHAR2(20), [daySeq] VARCHAR2(32), ' + '[deliveryTime] decimal(10,2), [hasInvoiced] VARCHAR2(1), [invoiceTitle] VARCHAR2(200), [isPre] VARCHAR2(1), ' + '[isFavorites] VARCHAR2(1), [isPoiFirstOrder] VARCHAR2(1), [isThirdShipping] VARCHAR2(1), [latitude] decimal(10, 4), ' + '[longitude] decimal(10,4), [logisticsCode] VARCHAR2(4), [logisticsCompletedTime] VARCHAR2(20), [logisticsConfirmTime] VARCHAR2(20), ' + '[logisticsDispatcherName] VARCHAR2(100), [shipperPhone] VARCHAR2(20), [logisticsFetchTime] VARCHAR2(20), [logisticsId] decimal(12,0), ' + '[logisticsName] VARCHAR2(100), [logisticsSendTime] VARCHAR2(20), [logisticsStatus] VARCHAR2(10), [originalPrice] decimal(12, 2), ' + '[payType] VARCHAR2(1), [poiAddress] VARCHAR2(200), [poiName] VARCHAR(100), [poiPhone] VARCHAR2(20), [recipientAddress] VARCHAR2(200), ' + '[recipientName] VARCHAR2(100), [recipientPhone] VARCHAR2(20), [shippingFee] decimal(12, 2), [status] VARCHAR2(2), [total] decimal(12, 2), ' + '[orderCompletedTime] VARCHAR2(20), [orderConfirmTime] VARCHAR2(20), [orderCancelTime] VARCHAR2(20), [cancelReasonCode] VARCHAR2(4), ' + '[cancelReason] VARCHAR2(200), [dinnersNumber] INTEGER, [notifyType] VARCHAR2(32), [refundReason] VARCHAR2(200), [foodShareFeeChargeByPoi] decimal(12, 2), ' + '[onlinePayment] decimal(12, 2), [wmPoiReceiveCent] decimal(12, 2), [isPush] VARCHAR2(1), [courierName] VARCHAR2(100), [courierPhone] VARCHAR2(50), [syned] VARCHAR2(1), [isReadCancel] VARCHAR2(1))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [takeoutorderdetail] ([id] VARCHAR2(32), [orderId] VARCHAR2(32), ' + '[commodityId] VARCHAR2(32), [boxNum] INTEGER, [boxPrice] decimal(12,2), [foodName] VARCHAR2(50), [price] decimal(12, 2), [skuId] VARCHAR2(100), ' + '[quantity] decimal(12, 2), [unit] VARCHAR2(10), [syned] VARCHAR2(1))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [sellerunit] ([id] VARCHAR2(32), [unitName] VARCHAR2(32))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [takeoutordercoupon] ([id] VARCHAR2(32), [orderId] VARCHAR2(32), [mtCharge] decimal(12, 2), ' + '[poiCharge] decimal(12, 2), [reduceFee] decimal(12, 2), [remark] VARCHAR2(200), [type] INTEGER, [syned] VARCHAR2(1))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [takeoutordercoupondetail] ([id] VARCHAR2(32), [sellerId] VARCHAR2(32), [orderId] VARCHAR2(32), ' + '[chargeBy] VARCHAR2(1), [comment] VARCHAR2(200), [feeTypeId] VARCHAR2(10), [feeTypeDesc] VARCHAR2(200), ' + '[money] decimal(12, 2), [syned] VARCHAR2(1))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [sellerpaytypes] ([id] VARCHAR2(32), [sellerId] VARCHAR2(32), [payTypeName] VARCHAR2(32), [status] VARCHAR2(1), [syned] VARCHAR2(1))');
		tx.executeSql('CREATE TABLE IF NOT EXISTS [tipsdetail] ([id] VARCHAR2(32), [sellerId] VARCHAR2(32), [printHeader] VARCHAR2(500), [printBottom] VARCHAR2(500), [printLogo] text, [printQrCode] text, [printFontSize] INTEGER, [printFontList] VARCHAR2(150), [syned] VARCHAR2(1))');
		setTimeout(function() {
			//执行补充字段
			addNotExistColumn();
			initData();
		}, 100);

	}, function() {
		//alert('初始化表成功');
	}, function(er) {
		if (er) {
			console.log('error with executeSql', er);
		}
	});
}

initFGdb();


var XXDao = {
    addCommodity : function(sqlData, callBack) {
		insert("commodityinfo", sqlData, callBack);
	}
}

XXDao.addCommodity({ name: '大闸蟹', price: 77}, function() {
    console.log('add ok');
})
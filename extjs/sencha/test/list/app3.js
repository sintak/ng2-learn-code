
//数据库文件
var localFileName = "edgesellerpad1.db", fgDB;
//系统定时器
var sysInterval;
//渡海信息
var activationinfo = {};
//当前商家信息
var seller = {
	mobile : '',
	userName : '',
	password : '',
	id : '',
	ename : '',
	phone : '',
	parentSellerId : '',
	teaPrice : '',
	location : '',
	softwareServiceId : '',
	serviceProxyId : '',
	isRegisterMeituan : '0'
};
//当前登录员工信息
var employeeSession = {};
//登录员工信息
var shouYinEmployee = {};
//系统设置
var setting = {};
//小票格式设置
var tipSetting = {};
//屏幕高度宽度
var clientWidth, clientHeight;
//收银首页网络图标状态变量
var networkOff = 0;
//商家登录来源，用于返回，0员工登录,1收银员
var loginForm = 0;
//是否在线
var isOnline = false;
//当前点击功能
var currViewId;
//导购员
var saleEmloyees = [];

//dwr是否与服务器断开状态
var isDwrOffline = false;
//任务操作
var task;

var cashierPermissions;

var userMap = null;
var payMap = null;
//是否已经更新数据
var isUpdateData = false;
var isUpdateOtherData = false;
//打印机状态
printStatus = {
	status1 : false,
	status2 : false,
	status3 : false,
	status4 : false
};
//显示屏幕个数
var monitors;

var objCustomerDisplay;

var audio = null;
//初始化声音对象
//凭证调度
var sysTokenInterval = null;

var multiKitchenPrinters = [];

var tokenJson = {
	token : '',
	timeStamp : '',
	sellerId : '',
	sign : ''
};
var isBodyClientReady = false;
var parabolaX;
var parabolaY;
function onBodyLoad() {
	window.onresize = function() {
		clientHeight = document.body.clientHeight;
		clientWidth = document.body.clientWidth;
		isBodyClientReady = true;
	};
	if(Ext.os.is.Windows) {
		window.resizeTo(window.screen.width, window.screen.height);
	} else { // 非windows窗口触发重设尺寸事件
		//$(window).trigger('resize');  // depend on jquery
		var e = document.createEvent("Event");  // native js
		e.initEvent("resize", true, true);
		window.dispatchEvent(e);
	}
	//window.resizeTo(window.screen.width, window.screen.height);

	if (Ext.os.is.Windows || Ext.os.is.MacOS) {
		if (navigator.onLine) {
			isOnline = true;
		} else {
			isOnline = false;
		}

		window.addEventListener("offline", onOffline, false);
		window.addEventListener("online", onOnline, false);
		fgDB = new sqliteDB(localFileName, 1024 * 1024 * 2);
		initFGdb();
	} else {
		document.addEventListener("deviceready", onDeviceReady, false);
		//document.addEventListener("deviceready", initSystem, true);
		fgDB = new sqliteDB(localFileName, 1024 * 1024 * 2);
		initFGdb();
	}
	clientHeight = document.body.clientHeight;
	clientWidth = document.body.clientWidth;

	// startWebSocket();
}

function initSystem() {
	//compass = new Compass();
	//compass.startWatch();
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
		fileSystem = fs;
		// isFirstLoad = false;
		if (fileSystem != null) {
			// alert(fileSystem.root.fullPath);
			var mapFile = fileSystem.root.getDirectory("superdad/", {
				create : true,
				exclusive : false
			}, function(parent) {
				//打开数据库
				openMBdb(parent.fullPath);
				// alert(mapPath);
			}, function(msg) {
				// alert(msg);
			});
		} else {
			alert("数据库打开失败!");
		}
	}, function() {
		alert("数据库打开失败!");
	});
}

function openMBdb(path) {
	var options = {};
	options.storage = "external";
	options.path = path;
	fgDB = new PGSQLitePlugin(localFileName, function(dbResult, dbObject) {
		console.log("Database status=" + dbResult.status);
		console.log("Database version=" + dbResult.version);
		//fgdb = dbObject;
		//alert("数据库打开成功");
		//if (dbResult.isNew) {
		initFGdb();
		//}
	}, function(err) {
		console.log("Error create database::err=" + err);
		alert("数据库打开失败" + err);
	}, options);
	//fgDB = window.sqlitePlugin.openDatabase({name: localFileName});
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
		tx.executeSql('CREATE TABLE IF NOT EXISTS [setting] ([id] INTEGER PRIMARY KEY AUTOINCREMENT,[isShouyinCustomerPrint] Boolean, [isShouyinPrivatePrint] Boolean,[isOrderCustomerPrint] Boolean, [isOrderPrivatePrint] Boolean,[isShouyinKitchenPrint] Boolean, [isOrderKitchenPrint] Boolean, [isShouyinLabelPrint] Boolean, [isOrderLabelPrint] Boolean, [isHandoverPrint] Boolean, [isRechargePrint] Boolean,[isCommodityImage] Boolean,[isTicketCustomerCut] Boolean,[isTicketPrivateCut] Boolean,[ticketCustomerPrinter] VARCHAR2(150),[ticketCustomerPrinterNum] INTEGER,[ticketCustomerRoll] INTEGER,[ticketPrivatePrinter] VARCHAR2(150),[ticketPrivatePrinterNum] INTEGER,[ticketPrivateRoll] INTEGER,[kitchenPrinter] VARCHAR2(150),[kitchenPrinterNum] INTEGER,[kitchenPrinterType] VARCHAR2(1),[kitchenRoll] INTEGER,[tagPrinter] VARCHAR2(150),[tagPrinterNum] INTEGER,[tagPrinterX] INTEGER,[tagPrinterY] INTEGER,[tagPrinterGAP] INTEGER,[defaultMode] INTEGER,[usedCOM] VARCHAR2(8),[printHeader] VARCHAR2(500),[printBottom] VARCHAR2(500),[printLogo] text,[printQrCode] text,[defaultPettyCash] decimal(18,2),[wxpayQrCode] text,[alipayQrCode] text,[define1] VARCHAR2(32),[define2] VARCHAR2(32),[define3] VARCHAR2(32),[define4] VARCHAR2(100),[ringtone] VARCHAR(512),[isMultiKitchen] VARCHAR2(1), [settingPrintJson] text,[openPlaceSettingJson] text, [settingCashJson] text, [settingPayJson] text, [kitchenPrinterBeep] VARCHAR2(1),[isShowPettyCash] Boolean)');
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
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS [printTask] ([id] VARCHAR2(32) NOT NULL, [content] text, [status] INTEGER, [ejectTime] datetime, [retryCount] INTEGER, PRIMARY KEY (id));');
        
		setTimeout(function() {
			//执行补充字段
			// addNotExistColumn();
			// initData();
		}, 100);

	}, function() {
		//alert('初始化表成功');
	}, function(er) {
		if (er) {
			console.log('error with executeSql', er);
		}
	});
}

// enable Ext autoloader
Ext.Loader.setConfig({
	enabled : true
});

function onConfirm(button) {
	// alert('You selected button ' + button);
	if (button == 1)
		navigator.app.exitApp();
	// 选择了确定才执行退出
}

function onDeviceReady() {// Register the event listener
	document.addEventListener("backbutton", onBackKeyDown, false);
	document.addEventListener("offline", onOffline, false);
	document.addEventListener("online", onOnline, false);

}

function onOffline() {
	// Handle the offline event
	//alert("网络连接未连接");
	isOnline = false;
	//console.log("isOnline:"+isOnline);
}

function onOnline() {
	// Handle the offline event
	//alert("网络连接已连接");
	isOnline = true;
}

/**
 * 檢查显示网络连接图片
 */
function checkNetworkImg() {
	var img = document.getElementById("network-img");
	if (!img) {
		return;
	}
	if (isOnline) {
		img.src = "resources/icon/public/wifi_green.png";
	} else {
		if (networkOff) {
			img.src = "resources/icon/public/wifi_off.png";
			networkOff = 0;
		} else {
			img.src = "resources/icon/public/wifi_red_on.png";
			networkOff = 1;
		}
	}
}

// Show a custom confirmation dialog
//
function onBackKeyDown() {
	if (shouYinEmployee.id) {
		showAlert('提示', '请先完成交接班才能退出！');
		return;
	}
	navigator.notification.confirm('按确定退出程序!', // message
	onConfirm, // callback to invoke with index of button pressed
	'确定要退出程序吗?', // title
	'确定,取消' // buttonLabels
	);
}

function onClose() {
	if (shouYinEmployee.id) {
		showAlert('提示', '请先完成交接班才能退出！');
		return;
	}
}

var Application = {};
(function(keys) {
	for(var ki=0,klen=keys.length;ki<klen;ki++) {
		Object.defineProperty(Application, keys[ki], {
			value : ki,
			writable : false,
			configurable : false
		});
	}
})(['FOOD','FRUIT']);
Application.Ftype = Application.FRUIT;

//
Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath({
    // 'Ext.ux': 'ux',
    // 'Ext': 'shared',
    'Seller': 'app',
    'ux': 'app/ux'
});

// for debug ?
Ext.Loader.setConfig({
    disableCaching: false
});


var helloTouchApp = new Ext.application({ //利用框架的Application类的构造函数构造一个应用
    name: 'Seller', //为这个应用指定名称
    autoCreateViewport: true,
    useLoadMask: true, //页面读取完毕前会显示“Loading...”字样
    controllers: [
        'PrintController'
    ],
    launch: function () { //这是程序的入口
        // Ext.Msg.alert('Hi', 'Hello Sencha Touch', Ext.emptyFn);//弹出窗口标题Hi，内容Hello Sencha Touch


        
        // Ext.define('app.view.new.List', {
        //     alternateClassName: 'newList',
        //     extend: 'ux.SimpleList',
        //     // requires: ['app.view.new.Info'],
        //     xtype: 'newList',
        //     config: {
        //         // { text: '内容', width:'38%', sortable: true, dataIndex: 'content', },
        //         // { text: '创建时间', width: '25%',  sortable: true,  dataIndex: 'createTime'},
        //         // { text: '目标', width: '10%', sortable: true,  dataIndex: 'target'},
        //         // { text: '状态', width: '12%', sortable: true,  dataIndex: 'status'},
        //         // { text: '来自', width: '10%', sortable: true,  dataIndex: 'from'},
        //         // { text: 'id', width: 100, sortable: true,  dataIndex: 'id',hidden:true },

        //         // store: 'newList',
        //         store: Ext.create('Ext.data.Store', {
        //             fields: ['id', 'content', 'createTime', 'target', 'status', 'from'],
        //             data: [
        //                 { id: '1', content: '猪杂面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
        //                 { id: '2', content: '牛肉面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
        //                 { id: '3', content: '牛肉面 煎蛋', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' },
        //             ]
        //         }),
        //         cls: 'list', //自定义css
        //         itemTpl: `
        //         <div class="sy-print-task-list">
        //             <div class="content text-overflow">{content}</div><div class="createTime">{createTime}</div><div class="target">{target}</div><div class="status">{status}</div><div class="from">{from}</div><div class="id">{id}</div>
        //         </div>
        //         `
        //     }
        // });



        // var panel = Ext.create('Ext.Panel', {
        //     layout: 'vbox',
        //     height: '100%',
        //     items: [
        //         {
        //             xtype: 'button',
        //             text: '确定',
        //             cls: 'testcls1'
        //         },
        //         {
        //             xtype: 'panel',
        //             html: `
        //             <div class="sy-print-task-list">
        //                 <div class="content">内容</div><div class="createTime">创建时间</div><div class="target">目标</div><div class="status">状态</div><div class="from">来自</div><div class="id">id</div>
        //             </div>
        //             `
        //         },
        //         // {
        //         //     xtype: 'simpleList',
        //         //     id: 'list1',
        //         //     height: 512,
        //         //     store: Ext.create('Ext.data.Store', {
        //         //         fields: ['litpic', 'title', 'time'],
        //         //         data: [
        //         //             { litpic: './pic02.jpg', title: 'title1', time: '12:00' },
        //         //             { litpic: 'https://www.baidu.com/img/bd_logo1.png', title: 'title2', time: '12:01' },
        //         //             { litpic: 'https://www.baidu.com/img/bd_logo1.png', title: 'title3', time: '12:02' },
        //         //             { litpic: 'https://www.baidu.com/img/bd_logo1.png', title: 'title4', time: '12:03' },
        //         //         ]
        //         //     })
        //         // },
        //         {
        //             xtype: 'newList',
        //             id: 'list1',
        //             height: 512,
        //         },
        //         {
        //             xtype: 'button'
        //         },
        //     ]
        // });
        // // Ext.Viewport.add(panel);
        // var list1 = Ext.getCmp('list1');
        // // console.log(list1);
        // var store = list1.getStore();
        // // console.log(store);
        // // store.add([{ litpic: './pic02.jpg', title: 'title5', time: '12:04' }])
        // store.add([{ id: '4', content: '牛肉面 煎蛋 火龙果 苹果 香蕉 绿茶 佳能相机', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' }])

        // // -----------
        // Ext.define('app.view.new.PrintTaskListView', {
        //     alternateClassName: 'printTaskListView',
        //     extend: 'Ext.Panel',
        //     // requires: ['app.view.new.Info'],
        //     xtype: 'printTaskListView',
        //     config: {

        //         layout: {
        //             type: 'vbox',
        //         },
        //         items: [
        //             {
        //                 xtype: 'panel',
        //                 html: `
        //                 <div class="sy-print-task-list list-header">
        //                     <div class="content">内容</div><div class="createTime">创建时间</div><div class="target">目标</div><div class="status">状态</div><div class="from">来自</div><div class="id">id</div>
        //                 </div>
        //                 `
        //             },
        //             {
        //                 xtype: 'newList',
        //                 id: 'list2',
        //                 height: 512,
        //             }
        //         ]
        //     },

        //     // initialize: function( thisArg, eOpts ) {
        //     //     console.log(thisArg, eOpts)                
        //     // }

        // });


        // // Ext.define('fafafa', {
        // //     xtype: ['fafafa'],
        // //     extend: 'Ext.Panel',
        // //     config: {

        // //         items: [
        // //             {
        // //                 html: '2222222'
        // //             }
        // //         ]
        // //     }
        // // });




        // // var tabPanel = Ext.create('Ext.TabPanel', {
        // //     id: 'tabPanel',
        // //     // ui: 'light',
        // //     ui: '',
        // //     tabBarPosition: 'top',
        // //     config: {
        // //         // baseCls: '',
        // //         // cls: '',
        // //         // background: 'red'
        // //     },

        // //     items: [
        // //         // {
        // //         //     title: '主页',
        // //         //     html: '主页',
        // //         //     iconCls: 'home'
        // //         // },
        // //         // {
        // //         //     title: '111',
        // //         //     xtype: 'fafafa',
        // //         //     iconCls: 'home'
        // //         // },
        // //         {
        // //             title: '<strong style="color:red;">阻塞单</strong>',
        // //             xtype: 'printTaskListView',
        // //             id: 'zuseView',
        // //             // iconCls: 'home'
        // //             // baseCls: 'testcls1',
        // //             // cls: 'testcls1',
        // //         },
        // //         {
        // //             title: '预打单',
        // //             xtype: 'printTaskListView',
        // //             // iconCls: 'home'
        // //             id: 'yudaView',
        // //         },
        // //         {
        // //             title: '已打单',
        // //             xtype: 'printTaskListView',
        // //             // iconCls: 'home'
        // //             id: 'yidaView'
        // //         },
        // //         // {
        // //         //     title: '预打单',
        // //         //     xtype: 'newList',
        // //         //     iconCls: 'user'
        // //         // },

        // //     ],


        // //     listeners: {

        // //         initialize: function (thisArg, eOpts) {
        // //             console.log(thisArg, eOpts)
        // //             // var list = thisArg.items.map['zuseView'].items.map['list2'];
        // //             var list = thisArg.down('#list2');
        // //             list.beginSimple();
        // //             // list.down('#btnCancel').hide();
        // //         },
        // //         activate: function (newActiveItem, thisArg, oldActiveItem, eOpts) {
        // //             console.log(newActiveItem, thisArg, oldActiveItem, eOpts)
        // //         },
        // //         activeitemchange: function (thisArg, value, oldValue, eOpts) {
        // //             console.log(thisArg, value, oldValue, eOpts)
        // //         },
        // //     },
        // // });
        // // Ext.Viewport.add(tabPanel);


        var p = Ext.create('Ext.Panel', {
            config: {

                layout: {
                    type: 'vbox',
                },
            },
            items: [
                // {
                //     html: 'panel1'
                // },
                // {
                //     xtype: 'testView',                    
                // },
                // {
                //     xtype: 'printTaskListTabPanelView',
                //     id: 'taskView',
                //     // width: 555,
                //     // height: 512,
                    
                // },
                // {
                //     html: '<div><input type="checkbox></div>'
                // },
                // {
                //     html: `
                //     <div class="sy-print-task-list">
                //         <div class="content">内容</div><div class="createTime">创建时间</div><div class="target">目标</div><div class="status">状态</div><div class="from">来自</div><div class="id">id</div>
                //     </div>
                //     `,
                //     height: 30
                // },               
                // {
                //     xtype: 'tinyPeople',
                //     // height: 300
                //     id: 'tp1'
                // },
                {
                    xtype: 'printTaskListView',
                    height: 480,
                    // width: 500,
                    id: 'printTaskListView1',
                    // hidden: true,
                    
                },
                // {
                //     xtype: 'tinyPeopleView',
                //     height: 300,
                //     // width: 500,
                //     id: 'tpv2',
                //     // hidden: true,
                // },
                // {
                //     xtype: 'tinyPeopleView',
                //     height: 300,
                //     // width: 500,
                //     id: 'tpv3',
                //     hidden: true,
                // },
                
            ],
            listeners: {
                
                initialize: function( thisArg, eOpts ) {
                    // console.log(thisArg)
                },
                activate: function( newActiveItem, thisArg, oldActiveItem, eOpts ) {                    
                    // console.log(thisArg)
                    // this.add(Ext.create('tinyPeople', { }))
                    
                }
            }
        });
        Ext.Viewport.add(p);
        p.show();

        setTimeout(function() {

        }, 5200);

        Ext.getCmp('printTaskListView1').loadData();

        // var store1 = Ext.getCmp('printTaskList1').getStore();
        // store1.add({ id: '11', content: '猪杂面', createTime: '2017-08-17 12:00', target: '厨打2', status: '阻塞', from: '1001' })
        
        // var store = Ext.getCmp('tp1').getStore();
        // console.log(store)
        // store.add(
        //         { id: '13', StudentName: 'Alice111'}
        //     );

        
        // var tinyPeopleView = Ext.create('tinyPeople', {
        // });
        // Ext.Viewport.add(tinyPeopleView);


        // var tinyPeopleView = Ext.create('myApp.view.TinyPeopleView', {
        // });
        // Ext.Viewport.add(tinyPeopleView);
        

        // var tinyPeopleView = Ext.create('myApp.view.TaskListView', {
        // });
        // Ext.Viewport.add(tinyPeopleView);
    }
})
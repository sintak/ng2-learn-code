/**
 * Created by lf on 2017/6/16
 */
/**
 * OS2X 操作类
 */
var hal;
(function (hal) {
    var OS2X = (function () {
        function OS2X(comName) {
            this.comName = comName;
            this.isActive = false;
            this.isValid = false;
            this.buf = [];
            this.queue = [];
            this.interval = null;
        }
        OS2X.prototype.validate = function (dataArray) {
            var isOK = dataArray[0] == 0x01 && dataArray[1] == 0x02;
            this.isValid |= isOK;
            return isOK;
        };
        OS2X.prototype.start = function (callback, thisArg) {
            var self = this;
            this.isValid = false;
            this.interval = setInterval(function (_thisArg) {
                var dataArray1 = self.queue.pop();
                //console.log("dataArray1:", dataArray1);
                if (dataArray1) {
                    var flag1, sign, weight, unit, isZero, isNetWeight, isWeightAbnormal;
                    var index = 0;
                    index++;
                    index++;
                    flag1 = String.fromCharCode(dataArray1[index++]);
                    sign = String.fromCharCode(dataArray1[index++]);
                    weight = (function () {
                        var _weight = "";
                        for (var i = 0; i < 6; i++) {
                            _weight += String.fromCharCode(dataArray1[index++]);
                        }
                        return _weight;
                    })();
                    unit = String.fromCharCode(dataArray1[index++]) + String.fromCharCode(dataArray1[index++]);
                    index++;
                    index++;
                    index++;
                    isZero = dataArray1[index] & 1 << 4 ? true : false;
                    isNetWeight = dataArray1[index] & 1 << 5 ? true : false;
                    isWeightAbnormal = dataArray1[index] & 1 << 6 ? true : false;
                    //OS2XManager.prototype.dataReceivedHandler(flag1, sign, weight, unit, isZero, isNetWeight, isWeightAbnormal);
                    callback(_thisArg, null, flag1, sign, weight, unit, isZero, isNetWeight, isWeightAbnormal);
                    //self.buf = [];
                }
            }, 100, thisArg);
            var isOK = window.startServeSP(this.comName, 9600, 8, 0, 0, 0, thisArg, function (_thisArg, tag, dataArray) {
                //console.log(dataArray);
                self.validate(dataArray);
                if (dataArray[0] == 0x01 && dataArray[1] == 0x02) {
                    self.buf = [];
                }
                self.buf = self.buf.concat(dataArray);
                //if(self.buf.length >=16) console.log(self.buf);
                if (self.buf.length >= 16 && self.buf[0] == 0x01 && self.buf[1] == 0x02
                    && self.buf[13] == 0x03 && self.buf[14] == 0x04) {
                    self.queue.push(self.buf);
                    self.buf = [];
                }
                else if (self.buf.length >= 16) {
                    self.buf = [];
                }
            });
            this.isActive = isOK == true;
            return isOK;
        };
        OS2X.prototype.stop = function () {
            var isOK = window.stopServeSP(this.comName);
            if (isOK) {
                window.clearInterval(this.interval);
                this.isActive = false;
            }
            return isOK;
        };
        OS2X.prototype.shelling = function () {
            if (window.sendSP) {
                return sendSP(this.comName, 9600, [0x3C, 0x54, 0x4B, 0x3E, 0x09]);
            }
            else {
            }
        };
        OS2X.prototype.setZero = function () {
            if (window.sendSP) {
                return sendSP(this.comName, 9600, [0x3C, 0x5A, 0x4B, 0x3E, 0x09]);
            }
            else {
            }
        };
        OS2X.prototype.setIntiative = function () {
            if (window.sendSP) {
                return sendSP(this.comName, 9600, [0x3C, 0x50, 0x42, 0x3E, 0x09]);
            }
            else {
            }
        };
        OS2X.prototype.setPassvity = function () {
            if (window.sendSP) {
                return sendSP(this.comName, 9600, [0x3C, 0x41, 0x4C, 0x3E, 0x09]);
            }
            else {
            }
        };
        return OS2X;
    }());
    hal.OS2X = OS2X;
})(hal || (hal = {}));
(function (hal) {
    var OS2XManager = (function () {
        function OS2XManager() {
            var _this = this;
            this.os2xs = [];
            var coms = window.listSerialPort();
            coms.map(function (com) { return _this.os2xs.push(new hal.OS2X(com)); });
        }
        //OS2XManager.prototype.buf = [];
        OS2XManager.prototype.dataReceivedHandler = null;
        OS2XManager.prototype.onDataReceived = function (thisArg, tag, flag1, sign, weight, unit, isZero, isNetWeight, isWeightAbnormal) {
            if (OS2XManager.prototype.dataReceivedHandler) {
                OS2XManager.prototype.dataReceivedHandler(flag1, sign, weight, unit, isZero, isNetWeight, isWeightAbnormal);
            }
        };
        /**
         *
         * @param comName 可空
         * @param callback fucntion(flag1, sign, weight, unit, isZero, isNetWeight, isWeightAbnormal)
         *                      Flag1：1字节，状态： ‘F’：重量溢出，或没有开机归零。 ‘S’：重量稳定。 ‘U’：重量不稳定。
                                Sign：1字节，符号：  ‘－’：重量为负。  ‘ ’：重量为正。
                                Weight：6字节，重量
                                Unit：2字节，单位
                                isZero：当前重量是否为零
                                isNetWeight：当前在是否在去皮模式
                                isWeightAbnormal：当前是否重量溢出，或没有开机归零

         */
        OS2XManager.prototype.start = function (comName, callback) {
            OS2XManager.prototype.dataReceivedHandler = callback;
            var os2x = this.os2xs.find(function (os2x) { return os2x.comName == comName; }, this);
            if (os2x) {
                os2x.start(this.onDataReceived, this);
            }
            else {
                for (var i = 0; i < this.os2xs.length; i++) {
                    this.os2xs[i].start(this.onDataReceived, this);
                }
                setTimeout(function (thisArg) {
                    thisArg.os2xs.map(function (os2x) {
                        if (!os2x.isValid) {
                            os2x.stop();
                        }
                        //else{
                        //    os2x.start(thisArg.onDataReceived, this);
                        //}
                    }, thisArg);
                }, 3000, this);
            }
        };
        /**
         *
         * @param comName 可空
         */
        OS2XManager.prototype.stop = function (comName) {
            this.os2xs.map(function (os2x) {
                if (os2x.isActive) {
                    os2x.stop();
                }
            }, this);
        };
        /**
         *
         * @param comName 可空
         */
        OS2XManager.prototype.shelling = function (comName) {
            this.os2xs.map(function (os2x) {
                if (os2x.isActive) {
                    os2x.shelling();
                }
            }, this);
        };
        /**
         *
         * @param comName 可空
         */
        OS2XManager.prototype.setZero = function (comName) {
            this.os2xs.map(function (os2x) {
                if (os2x.isActive) {
                    os2x.setZero();
                }
            }, this);
        };
        return OS2XManager;
    }());
    hal.OS2XManager = OS2XManager;
})(hal || (hal = {}));
//var Hal = {
//    //OS2X: new hal.OS2X(),
//    OS2XManager : new hal.OS2XManager()
//}
if (window.cordova) {
    cordova.addConstructor(function () {
        try {
            window.OS2XPlugin = new hal.OS2XManager();
        }
        catch (error) {
            console.info(error);
        }
    });
}
try {
    window.OS2XPlugin = new hal.OS2XManager();
}
catch (error) {
    console.info(error);
}

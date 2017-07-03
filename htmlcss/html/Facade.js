var model;
if (!model) model = {};
if(!model.api) model.api = {};

model.api.SPAPI = function() {

    var self= this;

    this.startServeOS2XWeight = function(COMName, callback) {

    }

}

model.Api = function() {
    this.sp = new model.api.SPAPI();
}

var Model = function() {
    this.api = new model.Api();
}

// $.model.api.account.companyLogin(email, $.md5(pwd), captcha!=""?captcha:null,function(code, data){

var hal = {
    model: new Model()
}

// Usage: hal.model.api.sp.startServeOS2XWeight("COM2", function() {})
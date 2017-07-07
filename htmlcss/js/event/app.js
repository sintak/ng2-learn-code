Event.addEvent("alert", function() {
    alert("弹出！");
    console.trace();
});

// 触发自定义alert事件
Event.fireEvent("alert");

// ----------------------

// 点击页面任意空白区域。
var myEvents = new EventTarget();
myEvents.addEvents({
    "once": function() {
        alert("该弹框只会出现一次！");    
        this.removeEvent("once");
    },
    "infinity": function() {
        alert("每次点击页面，该弹框都会出现！");    
    }
});

document.onclick = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if (!target || !/input|pre/i.test(target.tagName)) {
        myEvents.fireEvents(["once", "infinity"]);
    }
};

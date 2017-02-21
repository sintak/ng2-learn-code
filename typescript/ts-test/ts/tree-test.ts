// function treeMenu(a) {
//     this.tree = a || [];
//     this.groups = {};
// };
// treeMenu.prototype = {
//     init: function(pid) {
//         this.group();
//         return this.getDom(this.groups[pid]);
//     },
//     group: function() {
//         for (var i = 0; i < this.tree.length; i++) {
//             if (this.groups[this.tree[i].pId]) {
//                 this.groups[this.tree[i].pId].push(this.tree[i]);
//             } else {
//                 this.groups[this.tree[i].pId] = [];
//                 this.groups[this.tree[i].pId].push(this.tree[i]);
//             }
//         }
//     },
//     getDom: function(a) {
//         if (!a) { return ''; }  //当前节点不存在的时候，退出  
//         var html = '\n<ul >\n';
//         for (var i = 0; i < a.length; i++) {
//             html += '<li>' + a[i].name;
//             html += this.getDom(this.groups[a[i].id]);
//             html += '</li>\n';
//         };
//         html += '</ul>\n';
//         return html;
//     }
// }
// var data1 = [{ id: '1', pid: '0', name: 'SellDept' }, { id: '2', pid: '1', name: 'lili' }, { id: '3', pid: '1', name: 'Lulu' }];
// var result = new treeMenu(data1).getDom(data1);
// console.log(result);


// // --------------------


// var setting = {
//     data: {
//         simpleData: {
//             enable: true
//         }
//     }
// };
// var _setting = {
//     treeId: "",
//     treeObj: null,
//     view: {
//         addDiyDom: null,
//         autoCancelSelected: true,
//         dblClickExpand: true,
//         expandSpeed: "fast",
//         fontCss: {},
//         nameIsHTML: false,
//         selectedMulti: true,
//         showIcon: true,
//         showLine: true,
//         showTitle: true,
//         txtSelectedEnable: false
//     },
//     data: {
//         key: {
//             children: "children",
//             name: "name",
//             title: "",
//             url: "url",
//             icon: "icon"
//         },
//         simpleData: {
//             enable: false,
//             idKey: "id",
//             pIdKey: "pId",
//             rootPId: null
//         },
//         keep: {
//             parent: false,
//             leaf: false
//         }
//     },
//     async: {
//         enable: false,
//         contentType: "application/x-www-form-urlencoded",
//         type: "post",
//         dataType: "text",
//         url: "",
//         autoParam: [],
//         otherParam: [],
//         dataFilter: null
//     },
//     callback: {
//         beforeAsync: null,
//         beforeClick: null,
//         beforeDblClick: null,
//         beforeRightClick: null,
//         beforeMouseDown: null,
//         beforeMouseUp: null,
//         beforeExpand: null,
//         beforeCollapse: null,
//         beforeRemove: null,

//         onAsyncError: null,
//         onAsyncSuccess: null,
//         onNodeCreated: null,
//         onClick: null,
//         onDblClick: null,
//         onRightClick: null,
//         onMouseDown: null,
//         onMouseUp: null,
//         onExpand: null,
//         onCollapse: null,
//         onRemove: null
//     }
// }
// // var $ = require('D:/GitRepositories/ng2-learn-code/typescript/ts-test/node_modules/jquery/dist/jquery.js');

// // var $ = require('jquery')(require("jsdom").jsdom().defaultView);
// // $("body").append("<div>TEST</div>");
// // console.log($("body").html());


// var tools = {
//     isArray: function(arr) {
//         return Object.prototype.toString.apply(arr) === "[object Array]";
//     },
//     clone: function(obj) {
//         if (obj === null) return null;
//         var o = tools.isArray(obj) ? [] : {};
//         for (var i in obj) {
//             o[i] = (obj[i] instanceof Date) ? new Date(obj[i].getTime()) : (typeof obj[i] === "object" ? tools.clone(obj[i]) : obj[i]);
//         }
//         return o;
//     }
// }

// var data = {

//     transformToArrayFormat: function(setting, nodes) {
//         if (!nodes) return [];
//         var childKey = setting.data.key.children,
//             r = [];
//         if (tools.isArray(nodes)) {
//             for (var i = 0, l = nodes.length; i < l; i++) {
//                 r.push(nodes[i]);
//                 if (nodes[i][childKey])
//                     r = r.concat(data.transformToArrayFormat(setting, nodes[i][childKey]));
//             }
//         } else {
//             r.push(nodes);
//             if (nodes[childKey])
//                 r = r.concat(data.transformToArrayFormat(setting, nodes[childKey]));
//         }
//         return r;
//     },
//     transformTozTreeFormat: function(setting, sNodes) {
//         var i, l,
//             key = setting.data.simpleData.idKey,
//             parentKey = setting.data.simpleData.pIdKey,
//             childKey = setting.data.key.children;
//         if (!key || key == "" || !sNodes) return [];

//         if (tools.isArray(sNodes)) {
//             var r = [];
//             var tmpMap = [];
//             for (i = 0, l = sNodes.length; i < l; i++) {
//                 tmpMap[sNodes[i][key]] = sNodes[i];
//             }
//             for (i = 0, l = sNodes.length; i < l; i++) {
//                 if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
//                     if (!tmpMap[sNodes[i][parentKey]][childKey])
//                         tmpMap[sNodes[i][parentKey]][childKey] = [];
//                     tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
//                 } else {
//                     r.push(sNodes[i]);
//                 }
//             }
//             return r;
//         } else {
//             return [sNodes];
//         }
//     }
// }
// }

// var zTree = {
//     init: function(obj, zSetting, zNodes) {
//         var setting = tools.clone(_setting);
//         $.extend(true, setting, zSetting);
//         // setting.treeId = obj.attr("id");
//         // setting.treeObj = obj;
//         // setting.treeObj.empty();
//         // settings[setting.treeId] = setting;
//         // //For some older browser,(e.g., ie6)
//         // if(typeof document.body.style.maxHeight === "undefined") {
//         // 	setting.view.expandSpeed = "";
//         // }
//         // data.initRoot(setting);
//         // var root = data.getRoot(setting),
//         //     childKey = setting.data.key.children;
//         zNodes = zNodes ? tools.clone(tools.isArray(zNodes) ? zNodes : [zNodes]) : [];
//         if (setting.data.simpleData.enable) {
//             // root[childKey] = data.transformTozTreeFormat(setting, zNodes);
//             return data.transformTozTreeFormat(setting, zNodes);
//         } else {
//             // root[childKey] = zNodes;
//             return null;
//         }
//     };


//     var r = data.init(setting, data1);
//     console.log(r);

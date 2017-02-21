// export class DeptInfoVo {
//     /**
//      * 部门ID（格式：101010） 最后2位为部门ID，范围10-99之间。
//      * 如101010的父级部门ID为1010，1010的父级部门ID为10，10为一级部门
//      * 
//      * @type {string}
//      * @memberOf DeptInfoVo
//      */
//     deptId: string;

//     parentDeptId: string;
//     // get parentDeptId() {
//     //     return this.deptId.substr(0, this.deptId.length - 2);
//     // }

//     /**
//      * 部门名称
//      * 
//      * @type {string}
//      * @memberOf DeptInfoVo
//      */
//     deptName: string;
//     /**
//      * 优先级，越大的排序越高（仅限同级部门）
//      * 
//      * @type {number}
//      * @memberOf DeptInfoVo
//      */
//     level: number;
//     /**
//      * 是否可删除（1是0否）
//      * 
//      * @type {number}
//      * @memberOf DeptInfoVo
//      */
//     del: number;
//     /**
//      * 是否可修改（1是0否）
//      * 
//      * @type {number}
//      * @memberOf DeptInfoVo
//      */
//     update: number;
// }

// let deptList: DeptInfoVo[] = JSON.parse(`{
//         "code": "0",
//         "deptList": [
//             {
//                 "deptId": "99",
//                 "deptName": "未分配部门",
//                 "level": 0,
//                 "del": 1,
//                 "update": 1
//             },
//             {
//                 "deptId": "10",
//                 "deptName": "研发部",
//                 "level": 1,
//                 "del": 1,
//                 "update": 1
//             },
//             {
//                 "deptId": "11",
//                 "deptName": "未分配部门",
//                 "level": 2,
//                 "del": 1,
//                 "update": 1
//             },
//             {
//                 "deptId": "1010",
//                 "deptName": "Some",
//                 "level": 1,
//                 "del": 1,
//                 "update": 1
//             },
//             {
//                 "deptId": "1011",
//                 "deptName": "Ionic",
//                 "level": 2,
//                 "del": 1,
//                 "update": 1
//             },
//             {
//                 "deptId": "101110",
//                 "deptName": "Ionic2",
//                 "level": 1,
//                 "del": 1,
//                 "update": 1
//             },
//             {
//                 "deptId": "101111",
//                 "deptName": "新部门",
//                 "level": 2,
//                 "del": 1,
//                 "update": 1
//             },
//             {
//                 "deptId": "12",
//                 "deptName": "新部",
//                 "level": 3,
//                 "del": 1,
//                 "update": 1
//             },
//             {
//                 "deptId": "10111110",
//                 "deptName": "新部门",
//                 "level": 1,
//                 "del": 1,
//                 "update": 1
//             },
//             {
//                 "deptId": "1011111010",
//                 "deptName": "新部门",
//                 "level": 1,
//                 "del": 1,
//                 "update": 1
//             },
//             {
//                 "deptId": "101111101010",
//                 "deptName": "新部门",
//                 "level": 1,
//                 "del": 1,
//                 "update": 1
//             },
//             {
//                 "deptId": "10111110101010",
//                 "deptName": "新部门范德萨",
//                 "level": 1,
//                 "del": 1,
//                 "update": 1
//             }
//         ],
//         "userList": [
//             {
//                 "userId": 629480,
//                 "deptId": "10",
//                 "userName": "梁m.abc.cn",
//                 "status": 1
//             },
//             {
//                 "userId": 629481,
//                 "deptId": "10",
//                 "userName": "TestName",
//                 "status": 1
//             },
//             {
//                 "userId": 629482,
//                 "deptId": "10",
//                 "userName": "阿力",
//                 "status": 1
//             },
//             {
//                 "userId": 629483,
//                 "deptId": "10",
//                 "userName": "邓",
//                 "status": 1
//             },
//             {
//                 "userId": 629484,
//                 "deptId": "10",
//                 "userName": "小强",
//                 "status": 1
//             },
//             {
//                 "userId": 629485,
//                 "deptId": "101110",
//                 "userName": "Alice",
//                 "status": 1
//             },
//             {
//                 "userId": 629486,
//                 "deptId": "99",
//                 "userName": "Bob",
//                 "status": 1
//             }
//         ],
//         "add": 1
//     }`).deptList;

// deptList.forEach(
//     (dept, index, depts) => {
//         dept.parentDeptId = dept.deptId.substr(0, dept.deptId.length-2);
//     }
// )

// // let d1:DeptInfoVo[] = [];
// // d1.push(...deptList);
// // console.log(d1);

// // let d2:DeptInfoVo = new DeptInfoVo();
// // d2.deptId = '1010';
// // console.log(d2);

// // 想到一个办法，转换后递归赋值

// /**
//  * 
//  * 
//  * @export
//  * @class TreeModelAdapter
//  * @implements {TreeModel}
//  */
// export class TreeModelAdapter implements TreeModel {

//     /**
//      * 可重命名节点
//      * 
//      * @type {(string | RenamableNode)}
//      * @memberOf TreeModelAdapter
//      */
//     value: string | RenamableNode;
//     /**
//      * 子节点
//      * 
//      * @type {Array<TreeModel>}
//      * @memberOf TreeModelAdapter
//      */
//     children?: Array<TreeModel>;
//     /**
//      * 节点状态 New|Modified|EditInProgress
//      * 
//      * @type {TreeStatus}
//      * @memberOf TreeModelAdapter
//      */
//     _status?: TreeStatus;
//     /**
//      * 目录类型 Expanded|Collapsed|Leaf
//      * 
//      * @type {FoldingType}
//      * @memberOf TreeModelAdapter
//      */
//     _foldingType?: FoldingType;
//     /**
//      * 
//      * 
//      * @type {number}
//      * @memberOf TreeModelAdapter
//      */
//     _indexInParent?: number;

//     constructor() {

//     }
// }


// /**
//  * Web端 部门列表返回值
//  * 
//  * @author Peak
//  * @export
//  * @class WebDeptListOutVo
//  */
// export class WebDeptListOutVo extends BaseOutputVo {
//     /**
//      * 部门对象组成的数组
//      * 
//      * @type {DeptInfoVo[]}
//      * @memberOf WebDeptListOutVo
//      */
//     deptList: DeptInfoVo[];
//     /**
//      * 员工对象组成的数组
//      * 
//      * @type {UserVo[]}
//      * @memberOf WebDeptListOutVo
//      */
//     userList: UserVo[];
//     /**
//      * 是否可增加一级部门（1是0否）
//      * 
//      * @type {number}
//      * @memberOf WebDeptListOutVo
//      */
//     add: number;
// }



// export class Converter {
//     public static transformTozTreeFormat(sNodes): TreeModel {
//         var i, l,
//             key = "deptId",
//             parentKey = "parentDeptId",
//             childKey = "children";

//         var r = [];
//         var tmpMap = [];
//         for (i = 0, l = sNodes.length; i < l; i++) {
//             tmpMap[sNodes[i][key]] = sNodes[i];
//         }
//         for (i = 0, l = sNodes.length; i < l; i++) {
//             if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
//                 if (!tmpMap[sNodes[i][parentKey]][childKey])
//                     tmpMap[sNodes[i][parentKey]][childKey] = [];
//                 tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
//             } else {
//                 r.push(sNodes[i]);
//             }
//         }
//         return r;
//     }
// }
// var zNodes = [
//     { id: 1, pId: 0, name: "父节点1 - 展开", open: true },
//     { id: 11, pId: 1, name: "父节点11 - 折叠" },
//     { id: 111, pId: 11, name: "叶子节点111" },
//     { id: 112, pId: 11, name: "叶子节点112" },
//     { id: 113, pId: 11, name: "叶子节点113" },
//     { id: 114, pId: 11, name: "叶子节点114" },
//     { id: 12, pId: 1, name: "父节点12 - 折叠" },
//     { id: 121, pId: 12, name: "叶子节点121" },
//     { id: 122, pId: 12, name: "叶子节点122" },
//     { id: 123, pId: 12, name: "叶子节点123" },
//     { id: 124, pId: 12, name: "叶子节点124" },
//     { id: 13, pId: 1, name: "父节点13 - 没有子节点", isParent: true },
//     { id: 2, pId: 0, name: "父节点2 - 折叠" },
//     { id: 21, pId: 2, name: "父节点21 - 展开", open: true },
//     { id: 211, pId: 21, name: "叶子节点211" },
//     { id: 212, pId: 21, name: "叶子节点212" },
//     { id: 213, pId: 21, name: "叶子节点213" },
//     { id: 214, pId: 21, name: "叶子节点214" },
//     { id: 22, pId: 2, name: "父节点22 - 折叠" },
//     { id: 221, pId: 22, name: "叶子节点221" },
//     { id: 222, pId: 22, name: "叶子节点222" },
//     { id: 223, pId: 22, name: "叶子节点223" },
//     { id: 224, pId: 22, name: "叶子节点224" },
//     { id: 23, pId: 2, name: "父节点23 - 折叠" },
//     { id: 231, pId: 23, name: "叶子节点231" },
//     { id: 232, pId: 23, name: "叶子节点232" },
//     { id: 233, pId: 23, name: "叶子节点233" },
//     { id: 234, pId: 23, name: "叶子节点234" },
//     { id: 3, pId: 0, name: "父节点3 - 没有子节点", isParent: true }
// ];

// let depts = [

// ];

// let result = Converter.transformTozTreeFormat(zNodes);
// let result1 = Converter.transformTozTreeFormat(deptList);
// // console.log(deptList);
// // console.log(result);
// console.log(result1);
## 用C++扩展node.js(node-nan版)
时间 2016-12-24 07:24:57  Linux mobile development 相似文章 (1)
原文  http://blog.csdn.net/absurd/article/details/53856186
主题 C++ Node.js
0.先安装node.js和python(2.7)。请参考：

https://nodejs.org/

https://www.python.org

1.新建一个demo项目: 创建demo目录，并进入其中，然后运行下面命令。

mkdir demo
cd  demo
npm init
运行npm init时，之后会生成一个package.json(具体内容与输入参数有关):

{
  "name": "demo",
  "version": "1.0.0",
  "description": "a demo for node call native functions",
  "main": "demo.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "node"
  ],
  "author": "Li XianJing",
  "license": "ISC"
}
2.安装编译工具和头文件。

sudo npm install -g node-gyp
npm install nan bindings --save
3.用C++编写原生代码( 为了让目录结构整洁一点，我们把代码放到native只目录下)。

下面的文件(native/demo.cc)，添加一个Add方法，计算两个数之和:

#include <nan.h>

void Add(const Nan::FunctionCallbackInfo<v8::Value>& info) {

  if (info.Length() < 2) {
    Nan::ThrowTypeError("Wrong number of arguments");
    return;
  }

  if (!info[0]->IsNumber() || !info[1]->IsNumber()) {
    Nan::ThrowTypeError("Wrong arguments");
    return;
  }

  double arg0 = info[0]->NumberValue();
  double arg1 = info[1]->NumberValue();
  v8::Local<v8::Number> num = Nan::New(arg0 + arg1);

  info.GetReturnValue().Set(num);
}

void Init(v8::Local<v8::Object> exports) {
  exports->Set(Nan::New("add").ToLocalChecked(),
               Nan::New<v8::FunctionTemplate>(Add)->GetFunction());
}

NODE_MODULE(demo, Init)
4.写一个node-gyp的配置文件(文件名固定为binding.gyp)，用来编译C++代码。

{
  "targets": [
    {
      "target_name": "demo",
      "sources": [ "native/demo.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}
5.编写一个JS文件(demo.js)），让它调用原生代码。

var demo = require('bindings')('demo.node')

console.log('add(3, 5) => ', demo.add(3, 5))
6.运行配置脚本(如果没有增删文件，不需要每次运行）

node-gyp configure
7.编译C++程序。

node-gyp build
8.运行JS代码，看看是否工作。

node demo.js
参考：

node原生函数绑定指南
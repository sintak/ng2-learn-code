## 常用代码段：
```
import { Router, ActivatedRoute } from '@angular/router';
```
import { EventEmitter } from '@angular/core';



## 用法汇总：
+ 与子组件通讯


+ 与其它组件通讯

### npm操作
+ 更新所有能更新的并保存版本号到package.json
    + npm update --save --save-dev
+ 查看版本
    + npm list --depth 0
    + npm outdated
+ 查看依赖
    + npm view xxxpackage/xxx@xx.x.x peerDependencies
+ npm-check
    + npm install -g npm-check
    + npm-check [-u -g]
+ npm-check-updates -u   => npm install


## …or create a new repository on the command line
```
echo "# jubilant-sniffle" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/sintak/jubilant-sniffle.git
git push -u origin master
```

## …or push an existing repository from the command line
```
git remote add origin https://github.com/sintak/jubilant-sniffle.git
git push -u origin master
```
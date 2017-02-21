import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1 class="title">Angular Router</h1>
    <nav>
      <a routerLink="/crisis-center1" routerLinkActive="active">Crisis Center</a>
      <a routerLink="/heroes-1" routerLinkActive="active">Heroes</a>
      <a routerLink="/admin-1" routerLinkActive="active">Admin</a>
      <a routerLink="/login-1" routerLinkActive="active">Login</a>
    </nav>
    <router-outlet></router-outlet>
  `
  // 往每个 A 标签上添加了一个 RouterLinkActive 指令，用于在相关的 RouterLink 被激活时为所在元素添加或移除 CSS 类。 
  //   该指令可以直接添加到该元素上，也可以添加到其父元素上。
  // 这里利用 RouterLinkActive 指令，我们把 active 作为当路由被激活时为 RouterLink 切换的 CSS 类。 必要时，
  //   还可以为 RouterLink 添加多个类。
})
export class AppComponent {
}

// 知识点：路由，路由守卫，无组件路由，查询参数与片段，链接参数数组
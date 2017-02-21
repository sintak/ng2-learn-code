import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1 class="title">Angular Router</h1>
    <nav>
      <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <a routerLink="/admin" routerLinkActive="active">Admin</a>
      <a routerLink="/login" routerLinkActive="active">Login</a>
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

/**
 * # 路由插座
 * 有了这份配置(routing)，当本应用在浏览器中的 URL 变为 /heroes 时，路由器就会匹配到 path 为 heroes 的 Route ，
 * 并在宿主视图中的 RouterOutlet 中显示 HeroListComponent 组件。
 * ```
 * <!-- Routed views go here -->
 * <router-outlet></router-outlet>
 * ```
 * 一个模板中只能有一个 未命名的 <router-outlet> 。 但路由器可以支持多个 命名的 插座（ outlet ），将来我们会涉及到这部分特性。
 * 
 * # 路由器状态 (RouterState)
 * 在导航时的每个生命周期成功完成时，路由器会构建出一个 ActivatedRoute 组成的树，它表示路由器的当前状态。 
 * 我们可以在应用中的任何地方用 Router 服务及其 routerState 属性来访问当前的 RouterState 值。
 * 路由器状态为我们提供了从任意激活路由开始向上或向下遍历路由树的一种方式，以获得关于父、子、兄弟路由的信息。
 * 
 * ## 路由组件 (Routing Component)
 * 一个带有 RouterOutlet 的 Angular 组件，它根据路由器的导航来显示相应的视图。
 * 
 * # 活动路由链接 (RouterLinkActive) 绑定
 * 每个 A 标签还有一个到 RouterLinkActive 指令的 属性绑定 ，就像 routerLinkActive="..." 。
 * 等号（ = ）右侧的模板表达式包含用空格分隔的一些 CSS 类。我们还可以把 RouterLinkActive 指令
 * 绑定到一个 CSS 类组成的数组，如 [routerLinkActive]="['...']" 。
 * 
 * # 路由器指令集
 * RouterLink 、 RouterLinkActive 和 RouterOutlet 是由 RouterModule 包提供的指令。 现在它已经可用于我们自己的模板中。
 * 
 */

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
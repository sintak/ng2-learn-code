/**
 * # 
 * 这个服务会被多次创建、同时使用，每个服务内部状态都不一样，不应该做成单例，
 *   应该直接提供给使用的组件如该应用的HeroEditorComponent
 * 为 HeroEditComponent 制造一种“私有” RestoreService 单例，它的作用域被局限在了该组件的实例及其子组件中。
 * 注入器查找方式：从本组件开始向上冒泡查找组件树，找到为止。如果超出了组件树中的祖先还未找到， Angular 就会抛出一个错误。
 * 服务提供方式：在NgModule或Component中都可以提供服务以供注入
 */
export class RestoreService<T> {
  originalItem: T;
  currentItem: T;
  setItem (item: T) {
    this.originalItem = item;
    this.currentItem = this.clone(item);
  }
  getItem (): T {
    return this.currentItem;
  }
  restoreItem (): T {
    this.currentItem = this.originalItem;
    return this.getItem();
  }
  clone (item: T): T {
    // super poor clone implementation
    return JSON.parse(JSON.stringify(item));
  }
}

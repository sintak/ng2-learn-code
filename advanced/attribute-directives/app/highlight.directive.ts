import { Directive, ElementRef, Input, Renderer, HostListener } from '@angular/core';

@Directive({ selector: '[myHighlight]' })
export class HighlightDirective {
    // # Angular 在 <p> 元素上发现了一个 myHighlight 属性。 然后它创建了一个 HighlightDirective 类的实例，
    // 并把所在元素的引用注入到了指令的构造函数中。 在构造函数中，我们把 <p> 元素的背景设置为了黄色。
    // constructor(el: ElementRef, renderer: Renderer) {  // ElementRef访问元素，Renderer更改样式
    //    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    // }

    private _defaultColor = 'red';

    // # 目标属性需要修饰，源属性不需要
    @Input('myHighlight') highlightColor: string;  // 绑定到标签的myHighlight属性。@Input(name: bindingPropertyName) 从表达式到指令.

    @Input() set defaultColor(colorName: string){
        this._defaultColor = colorName || this._defaultColor;
    }

    constructor(private el: ElementRef, private renderer: Renderer) { }
    // # 给宿主 DOM 元素挂上一个事件监听器
    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.highlightColor || this._defaultColor);
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }
    private highlight(color: string) {
        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
    }
}

/**
 * # 关于依赖注入
 * 该构造函数类型、 @Component 装饰器、父级的 providers 信息这三个合起来，一起告诉 Angular 的注入器，在任何时候新建一个新的 HeroListComponent 的时候，注入一个 HeroService 的实例。
 * 
 * # 关于组件
 * 组件也是一种指令
 */
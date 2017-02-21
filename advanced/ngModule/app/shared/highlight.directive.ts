import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({ selector: '[highlight], input' })  // 带有highlight属性的和input元素
/** Highlight the attached element or an InputElement in blue */
export class HighlightDirective {
  constructor(renderer: Renderer, el: ElementRef) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'powderblue');
    console.log(
      `* Contact highlight called for ${el.nativeElement.tagName}`);
  }
}

/**
 * 关于两个高亮指令。
 * 当两个指令在同一个元素上争相设置颜色时，后声明的那个会胜出，因为它对 DOM 的修改覆盖了前一个。 
 * 在该例子中，联系人的 HighlightDirective 把应用标题的文本染成了蓝色，而我们原本期望它保持金色。
 */
import { Component }        from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';

import { WikipediaService } from './wikipedia.service';
@Component({
    selector: 'my-wiki',
    template: `
    <h1>Wikipedia Demo</h1>
    <p><i>Fetches after each keystroke</i></p>
    <input #term (keyup)="search(term.value)"/>
    <ul>
      <li *ngFor="let item of items | async">{{item}}</li>
    </ul>
  `,
    providers: [WikipediaService]
})
export class WikiComponent {
    //   items: Observable<string[]>;
    constructor(private wikipediaService: WikipediaService) { }

    //   search (term: string) {
    //     this.items = this.wikipediaService.search(term);
    //   }

    private searchTermStream = new Subject<string>();

    search(term: string) { this.searchTermStream.next(term); }

    items: Observable<string[]> = this.searchTermStream
        .debounceTime(300)  // 防抖
        .distinctUntilChanged()  // ignore if next search term is same as previous
        .switchMap((term: string) => this.wikipediaService.search(term));
        // switchMap( 以前叫 flatMapLatest) 返回一个新的可观察对象，它组合了所有这些“可观察的字符串数组”，
        //   重新按照它们的原始请求顺序进行排列，然后把最近的一个搜索结果交付给调用者
}

/**
 * async管道
 */
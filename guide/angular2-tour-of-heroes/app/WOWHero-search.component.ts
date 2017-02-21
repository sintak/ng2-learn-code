import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { HeroSearchService } from './WOWHero-search.service';
import { WOWHero } from './WOWHero';

@Component({
    selector: 'hero-search',
    templateUrl: 'app/WOWHero-search.component.html',
    styleUrls: ['app/WOWHero-search.component.css'],
    providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
    heroes: Observable<WOWHero[]>;
    private searchTerms = new Subject<string>();   // searchTerms 生成一些字符串的 Observable ，用于作为按名搜索时的过滤条件。
    constructor(
        private heroSearchService: HeroSearchService,
        private router: Router) { }
    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);  // 调用 next 来把新的字符串放进该主体的 可观察 流中。
    }
    ngOnInit(): void {
        // Subject 也是一个 Observable 对象。我们要把字符串数组的流转换成 Hero 数组的流，并把结果赋值给 heroes 属性。
        this.heroes = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time  //switchMap 会为每个从 debounce 和 distinctUntilChanged 中通关的搜索词调用搜索服务。它会丢弃以前的搜索 Observable ，只保留最近的。
                // return the http search observable
                ? this.heroSearchService.search(term)
                // or the observable of empty heroes if no search term
                : Observable.of<WOWHero[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<WOWHero[]>([]);  // 返回一个包含空数组的可观察对象，以清空搜索结果。
            });
    }
    gotoDetail(hero: WOWHero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}

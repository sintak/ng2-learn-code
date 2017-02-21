import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Crisis, Crisis1Service } from './crisis1.service';

@Component({
    moduleId: module.id,
    templateUrl: 'crisis-list1.component.html'
})
export class CrisisList1Component implements OnInit {

    crises: Crisis[];
    public selectedId: number;

    constructor(
        private service: Crisis1Service,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.selectedId = params['id'];
            this.service.getCrises()
                .then(crises => this.crises = crises);
        });
    }

    isSelected(crisis: Crisis): boolean {
        return crisis.id === this.selectedId;
    }

    onSelect(crisis: Crisis): void {
        this.selectedId = crisis.id;  // 记录下来

        this.router.navigate([crisis.id], { relativeTo: this.route });
    }
}
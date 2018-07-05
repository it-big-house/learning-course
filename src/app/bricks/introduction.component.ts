import { DatabaseService, Brick } from '../database.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.css'],
    providers: [ DatabaseService ]
})
export class IntroductionComponent {
    constructor(
        private database: DatabaseService,
        private router: Router,
        private route: ActivatedRoute
    ) { 
        this.route.paramMap
            .subscribe((data: ParamMap) => {
                this.id = data.get('id');
                this.showBrick(this.id);
            })
    }

    id: string;
    brick: Brick;

    showBrick(id: string) {
        console.log("Hello World!");
        this.database.getBrick(id)
            .subscribe((data: Brick) => {
                this.brick = data;
            })
    }
}

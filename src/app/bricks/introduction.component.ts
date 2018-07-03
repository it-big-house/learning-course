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
        this.id = this.route.snapshot.paramMap.get('id');
    }

    id: string;
    brick: Brick;

    ngOnInit() {
        this.showBrick(this.id);
    }

    showBrick(id: string) {
        console.log("Hello World!");
        this.database.getBrick("lh0pzfSRgVBSZ8UBaDJb")
            .subscribe((data: Brick) => {
                this.brick = data;
            })
    }
}

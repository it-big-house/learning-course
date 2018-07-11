import { Component } from '@angular/core';

import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Brick } from '../bricks';
import { BricksService } from './bricks.service';

@Component({
    selector: 'introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
    constructor(private bricks: BricksService) {
        bricks.currentBrick.subscribe((data) => {
            this.brick = data;
            if(this.brick != null) {
                this.showBrick();
            }
        })
    }

    brick: Brick;

    showBrick() { }
}

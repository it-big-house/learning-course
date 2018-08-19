import { Component } from '@angular/core';

import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Brick } from '../bricks';
import { BricksService } from './bricks.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
    constructor(private bricks: BricksService) {
        this.aBrick = bricks.currentBrick;
    }

    aBrick: BehaviorSubject<Brick>;

    showBrick() { }
}

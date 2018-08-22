import { Component } from '@angular/core';

import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Brick } from '../bricks';
import { BricksService } from './bricks.service';
import { BehaviorSubject } from 'rxjs';
import { TimerService, Timer } from './timer.service';
import { BrickTimePipe } from './brickTime.pipe';

@Component({
    selector: 'introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
    constructor(private bricks: BricksService, timer: TimerService, private brickTime: BrickTimePipe, private router: Router, private route: ActivatedRoute) {
        this.timer = timer.new();
        this.timer.timeResolution = 1000;
        this.aBrick = bricks.currentBrick;
        this.aBrick.subscribe(val => {
            if(val != null) {
                this.showBrick(val);
            }
        });
    }

    aBrick: BehaviorSubject<Brick>;
    timer: Timer;

    showBrick(brick: Brick) {
        let time = this.brickTime.transform(brick.type, "intro");
        this.timer.countDown(time);
        this.timer.timeRanOut.subscribe((t) => {
            this.startBrick();
        })
    }

    startBrick() {
        this.router.navigate(['../live'], { relativeTo: this.route })
    }
}

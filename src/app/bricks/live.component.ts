import { Component, ChangeDetectorRef } from '@angular/core';

import { BricksService } from './bricks.service';

import { Brick, Question } from '../bricks';
import { Observable } from 'rxjs';
import { TimerService } from './timer.service';

@Component({
    selector: 'live',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.scss'],
    providers: [ ]
})
export class LiveComponent {
    constructor(bricks: BricksService, timer: TimerService) {
        this.brick = bricks.currentBrick.asObservable();
        this.timer = timer;
        bricks.currentBrick.subscribe((data) => {
            if(data != null) {
                this.showBrick();
            }
        })
    }

    brick: Observable<Brick>;
    timer : TimerService;

    showBrick() {
        this.timer.start();
    }

    finishBrick() {
        this.timer.stop();
        console.log("finished in " + this.timer.seconds);
    }

}
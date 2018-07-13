import { Component, ChangeDetectorRef } from '@angular/core';

import { BricksService } from './bricks.service';

import { Brick, Question } from '../bricks';
import { Observable } from 'rxjs';
import { TimerService, Timer } from './timer.service';
import { BrickTimePipe } from './brickTime.pipe';

@Component({
    selector: 'live',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.scss'],
    providers: [ ]
})
export class LiveComponent {
    constructor(bricks: BricksService, timer: TimerService, brickTime: BrickTimePipe) {
        this.brick = bricks.currentBrick.asObservable();
        this.timer = timer.new();
        this.brickTime = brickTime;
        bricks.currentBrick.subscribe((data) => {
            if(data != null) {
                this.showBrick(data);
            }
        })
    }

    brick: Observable<Brick>;
    timer : Timer;

    private brickTime: BrickTimePipe;

    showBrick(brick: Brick) {
        let time = this.brickTime.transform(brick.type);
        this.timer.countDown(time);
        this.timer.timeRanOut.subscribe((t) => {
            this.finishBrick();
        })
    }

    finishBrick() {
        this.timer.stop();
        console.log("finished in " + this.timer.timeElapsed.getTime() / 1000);
    }

}
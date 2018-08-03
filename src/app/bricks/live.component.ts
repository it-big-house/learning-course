import { Component, ViewChildren, QueryList } from '@angular/core';

import { BricksService } from './bricks.service';

import { Brick, Question, BrickAttempt, Student, Pallet } from '../bricks';
import { Observable } from 'rxjs';
import { TimerService, Timer } from './timer.service';
import { BrickTimePipe } from './brickTime.pipe';

import { CompComponent } from './comp/comp.component';
import { QuestionComponent } from './question.component';
import { Router } from '@angular/router';

@Component({
    selector: 'live',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.scss'],
    providers: [ ]
})
export class LiveComponent {
    constructor(public bricks: BricksService, timer: TimerService, brickTime: BrickTimePipe, public router: Router) {
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

    private _brick: Brick;
    private brickTime: BrickTimePipe;

    @ViewChildren(QuestionComponent) questions : QueryList<QuestionComponent>;
    @ViewChildren(CompComponent) components: QueryList<CompComponent>;

    showBrick(brick: Brick) {
        let time = this.brickTime.transform(brick.type);
        this.timer.countDown(time);
        this.timer.timeRanOut.subscribe((t) => {
            this.finishBrick();
        })
    }

    finishBrick() {
        console.log(this.components);

        this.timer.stop();
        console.log("finished in " + this.timer.timeElapsed.getTime() / 1000);
        
        // Get brick data
        var ba : BrickAttempt = {
            _brick: this._brick,
            score: null,
            student: this.bricks.database.afs.doc("students/wYfB9tfvLySPQwvWs1v62DsaQiG3").ref,
            answers: this.questions.map((question) => {
                return question.getAttempt();
            })
        };
        this.bricks.publishBrickAttempt(ba);
        this.router.navigate(["/fortress"]);
    }

}
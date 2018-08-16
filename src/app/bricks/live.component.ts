import { Component, ViewChildren, QueryList } from '@angular/core';

import { BricksService } from './bricks.service';

import { Brick, Question, BrickAttempt, Student, Pallet } from '../bricks';
import { Observable } from 'rxjs';
import { TimerService, Timer } from './timer.service';
import { BrickTimePipe } from './brickTime.pipe';

import { CompComponent } from './comp/comp.component';
import { QuestionComponent } from './question.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'live',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.scss'],
    providers: [ ]
})
export class LiveComponent {
    constructor(public bricks: BricksService, timer: TimerService, brickTime: BrickTimePipe, public router: Router, public auth: AuthService) {
        this.brick = bricks.currentBrick.asObservable();
        this.timer = timer.new();
        this.timer.timeResolution = 21;
        this.brickTime = brickTime;
        bricks.currentBrick.subscribe((data) => {
            if(data != null) {
                this._brick = data;
                this.showBrick(this._brick);
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
        this.timer.stop();
        console.log("finished in " + this.timer.timeElapsed.getTime() / 1000);
        
        // Get brick data
        this.auth.user.subscribe((user) => {
            var ba : BrickAttempt = {
                brick: this._brick._ref,
                score: null,
                // TODO: Change to dynamically select current brick
                student: this.bricks.database.afs.doc("students/"+user.uid).ref,
                answers: this.questions.map((question) => {
                    return question.getAttempt();
                })
            };
            this.bricks.publishBrickAttempt(ba);
            this.router.navigate(["/fortress"]);
        })
    }

}
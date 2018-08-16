import { Component, ViewChildren, QueryList, Input } from '@angular/core';

import { BricksService } from './bricks.service';

import { Brick, Question, BrickAttempt, Student, Pallet } from '../bricks';
import { Observable } from 'rxjs';
import { TimerService, Timer } from './timer.service';
import { BrickTimePipe } from './brickTime.pipe';

import { CompComponent } from './comp/comp.component';
import { QuestionComponent } from './question.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
    providers: [ ]
})
export class ReviewComponent {
    constructor(public bricks: BricksService, timer: TimerService, brickTime: BrickTimePipe, public router: Router, public activatedRoute: ActivatedRoute) {
        this.brick = bricks.currentBrick.asObservable();
        this.timer = timer.new();
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

    brickAttempt: BrickAttempt;

    private _brick: Brick;
    private brickTime: BrickTimePipe;

    @ViewChildren(QuestionComponent) questions : QueryList<QuestionComponent>;
    @ViewChildren(CompComponent) components: QueryList<CompComponent>;

    showBrick(brick: Brick) {
        this.brickAttempt = this.bricks.currentBrickAttempt;
        if(!this.bricks.currentBrickAttempt) {
            this.router.navigate(['../live'], { relativeTo: this.activatedRoute });
        }

        let time = new Date(this.brickTime.transform(brick.type).valueOf());
        this.timer.countDown(time);
        this.timer.timeRanOut.subscribe((t) => {
            this.finishBrick();
        })
    }

    finishBrick() {
        this.timer.stop();
        console.log("finished in " + this.timer.timeElapsed.getTime() / 1000);
        
        // Get brick data
        var ba : BrickAttempt = {
            brick: this._brick._ref,
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
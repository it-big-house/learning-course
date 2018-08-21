import { Component, ViewChildren, QueryList } from "@angular/core";
import { Observable } from "rxjs";
import { Brick, BrickAttempt, QuestionAttempt } from "../bricks";
import { Timer, TimerService } from "./timer.service";
import { BrickTimePipe } from "./brickTime.pipe";
import { BricksService } from "./bricks.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { QuestionComponent } from "./question.component";

@Component({
    selector: 'live-review',
    templateUrl: './review.component.html',
    styleUrls: ['./live.component.scss']
})
export class ReviewComponent {
    constructor(public bricks: BricksService, timer: TimerService, brickTime: BrickTimePipe, public router: Router, public route: ActivatedRoute, public auth: AuthService) {
        this.brick = bricks.currentBrick.asObservable();
        this.brickAttempt = bricks.currentBrickAttempt;
        if(!this.brickAttempt) {
            this.router.navigate(['../live'], {relativeTo: route});
        }
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
    brickAttempt: BrickAttempt;
    timer : Timer;

    private _brick: Brick;
    private brickTime: BrickTimePipe;

    @ViewChildren(QuestionComponent) questions : QueryList<QuestionComponent>;

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
            let answers = this.questions.map((question) => {
                return question.getAttempt();
            })
            let score = answers.reduce((acc, answer) => acc + answer.marks, 0) + this.bricks.currentBrickAttempt.score;
            var ba : BrickAttempt = {
                brick: this._brick._ref,
                score: score,
                oldScore: this.bricks.currentBrickAttempt.score,
                maxScore: this.bricks.currentBrickAttempt.maxScore,
                student: this.bricks.database.afs.doc("students/"+user.uid).ref,
                answers: answers
            };
            console.log(`score is ${score} out of ${this.bricks.currentBrickAttempt.maxScore}, which is ${score * 100 / this.bricks.currentBrickAttempt.maxScore}%`);
            this.bricks.currentBrickAttempt = ba;
            this.router.navigate(["../ending"], { relativeTo: this.route });
        })
    }
}

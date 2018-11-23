import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';

import { BrickService } from './brick.service';

import { Brick, Question, BrickAttempt, Student, Pallet } from '../../schema';
import { Observable } from 'rxjs';
import { TimerService, Timer } from './timer.service';
import { BrickTimePipe } from './brickTime.pipe';

import { CompComponent } from './comp/comp.component';
import { QuestionComponent } from './question.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import {Sounds} from '../../sounds/sounds';
// Important jquery may not look like it is being used but it really is
import * as $ from 'jquery';
import { animateButtons } from 'src/app/animocon/button';

@Component({
    selector: 'live',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.scss'],
    providers: [ ]
})
export class LiveComponent implements OnInit {
    constructor(public bricks: BrickService, timer: TimerService, brickTime: BrickTimePipe,
        public router: Router, public route: ActivatedRoute, public auth: AuthService) {
        this.brick = bricks.currentBrick.asObservable();
        this.timer = timer.new();
        this.timer.timeResolution = 1000;
        this.brickTime = brickTime;
        bricks.currentBrick.subscribe((data) => {
            if(data != null) {
                this._brick = data;
                this.showBrick(this._brick);
            }
        });
    }

    Sounds = Sounds;
    brick: Observable<Brick>;
    timer: Timer;

    private _brick: Brick;
    private brickTime: BrickTimePipe;

    @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

    showBrick(brick: Brick) {
        let time = this.brickTime.transform(brick.type, "live");
        this.timer.countDown(time);
        this.timer.timeRanOut.subscribe((t) => {
            this.finishBrick();
        });
    }

    ngOnInit() {
        // Poll to check for button elements with icobutton class
        setTimeout(function() {
            const items = [].slice.call(document.querySelectorAll('button.icobutton'));
            // params: buttons and sound effects
            animateButtons(items, []);
        }, 500);
    }

    goForward(stepper, audios: Array<HTMLElement>) {
        setTimeout(function() {
            stepper.next();
        }, 500);
        audios.forEach((audio: any) => {
            setTimeout(function() { audio.play(); }, parseInt(audio.getAttribute('delay'), 10));
        });
    }

    getStepperScroll() {
        return document.getElementsByClassName('mat-horizontal-stepper-header-container')[0];
    }

    scrollLeft() {
        const el = this.getStepperScroll();
        el.scrollLeft -= 30;
    }

    scrollRigth() {
        const el = this.getStepperScroll();
        el.scrollLeft += 30;
    }

    finishBrick(sound = null) {
        this.timer.stop();
        console.log("finished in " + this.timer.timeElapsed.getTime() / 1000);

        // Get brick data
        this.auth.user.subscribe((user) => {
            let answers = this.questions.map((question) => {
                return question.getAttempt();
            })
            let score = answers.reduce((acc, answer) => acc + answer.marks, 0);
            let maxScore = answers.reduce((acc, answer) => acc + answer.maxMarks, 0);
            var ba : BrickAttempt = {
                brick: this._brick._ref,
                score: score,
                maxScore: maxScore,
                student: this.bricks.database.afs.doc("students/" + user.uid).ref,
                answers: answers
            };
            console.log(`score is ${score} out of ${maxScore}, which is ${score * 100 / maxScore}%`);
            this.bricks.currentBrickAttempt = ba;
            if (sound) {
                sound.play();
                setTimeout(() => {
                    this.router.navigate(['../provisionalScore'], { relativeTo: this.route });
                }, 500);
            } else {
                this.router.navigate(['../provisionalScore'], { relativeTo: this.route });
            }
        });
    }

}

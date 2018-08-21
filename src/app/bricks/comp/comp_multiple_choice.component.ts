import { Comp, ComponentAttempt } from "../../bricks";
import { Component, Input } from "@angular/core";

import {MatButtonToggleChange} from "@angular/material/button-toggle";
import { MAT_CHECKBOX_CLICK_ACTION } from "@angular/material/checkbox";

import { register } from './comp_index';
import { CompComponent } from "./comp.component";

export class CompMultipleChoice extends Comp {
    name = "Multiple Choice";
    data: { choices:string[], reveals:string[], correctAnswers: number }

    constructor(data: { choices:string[], reveals:string[], correctAnswers: number }) {
        super();
        this.data = data;
    }
}

@register("MultipleChoice")
@Component({
    selector: "multiple-choice",
    template: `
    <mat-button-toggle-group name="choice" class="choice" fxLayout="column" fxLayoutGap="10px" fxLayoutAlign="center center" multiple>
        <mat-button-toggle ngDefaultControl [checked]="answers[getChoice(choice)]" (change)="changeAnswer($event, i)" name="choice-{{i}}" class="flex-choice" fxLayout="column" fxLayoutAlign="stretch stretch" *ngFor="let choice of data.data.choices | shuffle; let i = index" [value]="choice">
            <div fxLayout="row" fxLayoutAlign="space-around center">
                <mat-checkbox *ngIf="attempt" [checked]="getState(choice) == 1" [indeterminate]="getState(choice) == -1" disabled></mat-checkbox>
                <div fxFlex="1 0 0"></div>
                <div fxLayout="column">
                    <div>{{ choice }}</div>
                    <div *ngIf="attempt" style="font-size: 20px">{{ data.data.reveals[getChoice(choice)] }}</div>
                </div>
                <div fxFlex="1 0 0"></div>
            </div>
        </mat-button-toggle>
    </mat-button-toggle-group>
    `,
    styleUrls: ["../live.component.scss"],
    providers: [
        {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop'}
    ]
})
export class MultipleChoiceComponent extends CompComponent {
    constructor() { super() }

    ngOnInit() {
        this.answers = this.data.data.choices.map(() => false);
        if(this.attempt) {
            this.attempt.answer
                .filter(val => val < this.data.data.correctAnswers)
                .forEach(val => { this.answers[val] = true });
        }
    }

    @Input() data: CompMultipleChoice;
    answers: boolean[];

    changeAnswer(event: MatButtonToggleChange, index: number) : void {
        this.answers[this.getChoice(event.value)] = event.source.checked ? true : false;
    }

    getAnswer() : number[] {
        let a = []
        this.answers.forEach((answer, index) => {
            if(answer) a.push(index);
        })
        return a;
    }

    getChoice(choice) : number {
        return this.data.data.choices.indexOf(choice);
    }

    getState(choice) : number {
        if(this.attempt.answer.indexOf(this.getChoice(choice)) != -1) {
            if(this.getChoice(choice) < this.data.data.correctAnswers) {
                return 1;
            } else {
                return -1;
            }
        } else {
            return 0;
        }
    }

    mark(attempt: ComponentAttempt, prev: ComponentAttempt) : ComponentAttempt {
        let markIncrement = prev ? 2 : 5;
        attempt.correct = true;
        attempt.marks = 0;
        attempt.maxMarks = this.data.data.correctAnswers * 5;
        this.data.data.choices.forEach((ans, i) => {
            if(i <= this.data.data.correctAnswers) {
                if(attempt.answer.indexOf(i) == -1) {
                    attempt.correct = false;
                } else {
                    if(!prev) {
                        attempt.marks += markIncrement;
                    } else if(prev.answer.indexOf(ans) == -1) {
                        attempt.marks += markIncrement;
                    }
                }
            } else {
                if(attempt.answer.indexOf(i) == -1) {
                    attempt.correct = false;
                }
            }
        })
        if(attempt.marks == 0 && attempt.answer != [] && !prev) attempt.marks = 1;
        return attempt;
    }

    public trackByIndex(index: number, item) {
        return index;
    }
}

import { Component, Input } from '@angular/core';

import { Comp, ComponentAttempt } from '../../bricks';
import { register } from './comp_index';
import { CompComponent } from "./comp.component";
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';

export class CompShortAnswer extends Comp {
    name = "Short Answer";
    data: { text: string, entries: { name: string, answer: string }[] };

    constructor(data: { text: string, entries: { name: string, answer: string }[] }) {
        super();
        this.data = data;
    }
}

@register("ShortAnswer")
@Component({
    selector: 'short-answer',
    template: `
    <p>{{data.data.text}}</p>
    <div class="short-answer-container" fxLayout.gt-xs="row wrap" fxLayoutAlign.gt-xs="space-evenly center" fxLayout.xs="column">
        <div *ngFor="let entry of data.data.entries; let i = index" fxFlex="0 0 33%">
            <mat-checkbox *ngIf="attempt" [indeterminate]="getState(i) == -1" [checked]="getState(i) == 1" disabled></mat-checkbox>
            <mat-form-field>
                <input matInput placeholder="{{entry.name}}" [(ngModel)]="userAnswers[i]" />
            </mat-form-field>
        </div>
    </div>
    `,
    styleUrls: ['../live.component.scss'],
    providers: [
        {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop'}
    ]
})
export class ShortAnswerComponent extends CompComponent {
    @Input() data: CompShortAnswer;

    userAnswers: string[];

    ngOnInit() {
        this.userAnswers = [];
        if(this.attempt) {
            this.userAnswers = this.attempt.answer;
        }
    }

    getAnswer() : string[]{
        return this.userAnswers;
    }

    getState(entry: number) : number {
        if(this.attempt.answer[entry] != "") {
            if(this.attempt.answer[entry].toLowerCase().replace(/ /g,'') == this.data.data.entries[entry].answer.toLowerCase().replace(/ /g,'')) {
                return 1;
            } else { return -1; }
        } else { return 0; }
    }

    mark(attempt: ComponentAttempt) : ComponentAttempt {
        attempt.correct = true;
        attempt.marks = 0;
        attempt.maxMarks = this.data.data.entries.length * 5;
        this.data.data.entries.forEach((entry: {name: string, answer: string}, index) => {
            if(this.userAnswers[index]) {
                if(this.userAnswers[index].toLowerCase().replace(/ /g,'') == entry.answer.toLowerCase().replace(/ /g,'')) {
                    attempt.marks += 5;
                } else {
                    attempt.correct = false;
                }
            } else { attempt.correct = false; }
        })
        if(attempt.marks == 0 && this.userAnswers.indexOf("") == -1) attempt.marks = 1;
        return attempt;
    }
}

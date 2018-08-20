import { Comp, ComponentAttempt } from "../../bricks";
import { Component, Input } from "@angular/core";

import { register } from './comp_index';
import { CompComponent } from "./comp.component";

export class CompSingleChoice extends Comp {
    name = "Single Choice";
    data: { choices:string[] }

    constructor(data: { choices:string[] }) {
        super();
        this.data = data;
    }
}

@register("SingleChoice")
@Component({
    selector: "single-choice",
    template: `
    <mat-button-toggle-group [(ngModel)]="answer" name="choice" class="choice" fxLayout="column" fxLayoutGap="10px" fxLayoutAlign="center center">
        <mat-button-toggle class="flex-choice" *ngFor="let choice of data.data.choices | shuffle; let i = index" value="{{ choice }}" fxLayout="column" fxLayoutAlign="stretch stretch">
            <div fxLayout="row" fxLayoutAlign="space-around center">
                <mat-checkbox *ngIf="attempt"  [checked]="getState(choice) == 1" [indeterminate]="getState(choice) == -1" disabled></mat-checkbox>
                <div fxFlex="1 0 0"></div>
                <div fxLayout="column">{{ choice }}</div>
                <div fxFlex="1 0 0"></div>
            </div>
        </mat-button-toggle>
    </mat-button-toggle-group>
    `,
    styleUrls: ["../live.component.scss"]
})
export class SingleChoiceComponent extends CompComponent {
    constructor() { super() }

    @Input() data: CompSingleChoice;
    @Input() attempt: ComponentAttempt;
    answer: string;

    ngOnInit() {
        if(this.attempt) {
            this.answer = this.data.data.choices[this.attempt.answer];
        }
    }

    getAnswer() : number {
        return this.data.data.choices.indexOf(this.answer);
    }

    getChoice(choice) : number {
        return this.data.data.choices.indexOf(choice);
    }

    getState(choice) : number {
        if(this.getChoice(choice) == this.attempt.answer) {
            if(this.getChoice(choice) == 0) {
                return 1;
            } else {
                return -1;
            }
        } else {
            return 0;
        }
    }

    mark(attempt: ComponentAttempt) : ComponentAttempt {
        attempt.correct = attempt.answer == 0;
        attempt.maxMarks = 5;
        if(attempt.correct) attempt.marks = 5;
        else if (attempt.answer != null) attempt.marks = 1;
        else attempt.marks = 0;
        return attempt;
    }
}

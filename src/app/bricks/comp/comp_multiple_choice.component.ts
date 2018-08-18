import { Comp, ComponentAttempt } from "../../bricks";
import { Component, Input } from "@angular/core";

import {MatButtonToggleChange} from "@angular/material/button-toggle";

import { register } from './comp_index';
import { CompComponent } from "./comp.component";

export class CompMultipleChoice extends Comp {
    name = "Multiple Choice";
    data: { choices:string[], correctAnswers: number }

    constructor(data: { choices:string[], correctAnswers: number }) {
        super();
        this.data = data;
    }
}

@register("MultipleChoice")
@Component({
    selector: "multiple-choice",
    template: `
    <mat-button-toggle-group name="choice" class="choice" fxLayout="column" fxLayoutGap="10px" fxLayoutAlign="center center" multiple>
        <mat-button-toggle ngDefaultControl (change)="changeAnswer($event, i)" name="choice-{{i}}" class="flex-choice" fxLayout="column" fxLayoutAlign="stretch stretch" *ngFor="let choice of data.data.choices | shuffle; let i = index" value="{{ choice }}">{{ choice }}</mat-button-toggle>
    </mat-button-toggle-group>
    `,
    styleUrls: ["../live.component.scss"]
})
export class MultipleChoiceComponent extends CompComponent {
    constructor() { super() }

    ngOnInit() {
        this.answers = this.data.data.choices.map(() => "");
    }

    @Input() data: CompMultipleChoice;
    answers: string[];

    changeAnswer(event: MatButtonToggleChange, index: number) : void {
        this.answers[index] = event.source.checked ? event.value : "";
    }

    getAnswer() : number[] {
        let a = []
        this.answers.forEach((answer) => {
            if(answer != "") a.push(this.data.data.choices.indexOf(answer));
        })
        return a;
    }

    mark(attempt: ComponentAttempt) : ComponentAttempt {
        attempt.correct = true;
        attempt.marks = 0;
        attempt.maxMarks = this.data.data.correctAnswers * 5;
        attempt.answer.forEach((ans) => {
            if(ans >= this.data.data.correctAnswers) {
                attempt.correct = false;
            } else {
                attempt.marks += 5;
            }
        })
        if(attempt.marks == 0 && attempt.answer != []) attempt.marks = 1;
        return attempt;
    }

    public trackByIndex(index: number, item) {
        return index;
    }
}
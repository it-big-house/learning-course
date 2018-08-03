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
    <mat-button-toggle-group name="choice" class="choice" multiple>
        <mat-button-toggle ngDefaultControl (change)="changeAnswer($event, i)" name="choice-{{i}}" class="flex-choice" *ngFor="let choice of data.data.choices | shuffle; let i = index" value="{{ choice }}">{{ choice }}</mat-button-toggle>
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

    public trackByIndex(index: number, item) {
        return index;
    }
}
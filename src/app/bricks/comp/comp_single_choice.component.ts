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
    <mat-button-toggle-group [(ngModel)]="answer" name="choice" class="choice">
        <mat-button-toggle class="flex-choice" *ngFor="let choice of data.data.choices | shuffle; let i = index" value="{{ choice }}">{{ choice }}</mat-button-toggle>
    </mat-button-toggle-group>
    `,
    styleUrls: ["../live.component.scss"]
})
export class SingleChoiceComponent extends CompComponent {
    constructor() { super() }

    @Input() data: CompSingleChoice;
    answer: string;

    getAnswer() : number {
        return this.data.data.choices.indexOf(this.answer);
    }
}
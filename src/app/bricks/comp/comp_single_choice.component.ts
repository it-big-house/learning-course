import { Comp, ComponentAttempt } from "../../bricks";
import { Component, Input } from "@angular/core";

import { register } from './comp_index';
import { CompComponent } from "./comp.component";
import { MAT_CHECKBOX_CLICK_ACTION } from "@angular/material/checkbox";

export class CompSingleChoice extends Comp {
    name = "Single Choice";
    data: { choices: string[], reveals: string[] }

    constructor(data: { choices:string[], reveals:string[] }) {
        super();
        this.data = data;
    }

    mark(attempt: ComponentAttempt) : { correctChoices: boolean[], marks: number } {
        return {
            correctChoices: this.data.choices.map((choice) => {
                return attempt.answer == 0;
            }),
            marks: 0
        }
    }
}

@register("SingleChoice")
@Component({
    selector: "single-choice",
    template: `
    <mat-button-toggle-group [(ngModel)]="answer" name="choice" class="choice">
        <mat-button-toggle class="flex-choice" *ngFor="let choice of data.data.choices | shuffle; let i = index" value="{{ choice }}">
            <div fxLayout="row">
                <mat-checkbox *ngIf="reveal" [color]="chosenChoices[indexOf(choice)] ? 'warn' : 'primary'" [indeterminate]="chosenChoices[indexOf(choice)]" [checked]="correctChoices[indexOf(choice)]"></mat-checkbox>
                <div fxLayout="column" fxFlex="1 1 0" fxFlexAlign="stretch stretch">
                    <span class="choice-header">{{ choice }}</span>
                    <span *ngIf="reveal">{{ data.data.reveals[indexOf(choice)] }}</span>
                </div>
            </div>
        </mat-button-toggle>
    </mat-button-toggle-group>
    `,
    styleUrls: ["../live.component.scss"],
    providers: [{provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop'}]
})
export class SingleChoiceComponent extends CompComponent {
    constructor() { super() }

    @Input() data: CompSingleChoice;
    @Input() reveal: boolean;
    @Input() attempt: ComponentAttempt;
    answer: string;
    correctChoices: boolean[];
    chosenChoices: boolean[];
    
    ngOnInit() {
        if(this.attempt) {
            this.review();
        }
    }

    review() {
        var m = this.data.mark(this.attempt);
        this.correctChoices = m.correctChoices;
        this.chosenChoices = [this.attempt.answer];
    }

    indexOf(choice: string) {
        return this.data.data.choices.indexOf(choice);
    }

    getAnswer() : number {
        return this.data.data.choices.indexOf(this.answer);
    }
}
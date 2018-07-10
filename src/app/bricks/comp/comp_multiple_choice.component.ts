import { Comp } from "../../bricks";
import { Component, Input } from "../../../../node_modules/@angular/core";


export class CompMultipleChoice extends Comp {
    instructions = "Select one correct answer.";
    name = "Multiple Choice";
    data: { choices:string[] }

    constructor(data: { choices:string[] }) {
        super();
        this.data = data;
    }
}

@Component({
    selector: "multiple-choice",
    template: `
    <mat-button-toggle-group name="choice" class="choice">
        <mat-button-toggle class="flex-choice" *ngFor="let choice of data.data.choices | shuffle">{{ choice }}</mat-button-toggle>
    </mat-button-toggle-group>
    `,
    styleUrls: ["../live.component.scss"]
})
export class MultipleChoiceComponent {
    constructor() { }

    @Input() data: CompMultipleChoice;
}
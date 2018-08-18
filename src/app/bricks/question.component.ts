import { Component, Input, ViewChildren, QueryList } from "@angular/core";
import { Question, QuestionAttempt } from "../bricks";
import { CompComponent } from "./comp/comp.component";
import { DynamicComponent } from "ng-dynamic-component";
import { ShufflePipe } from "ngx-pipes";

@Component({
    selector: 'question',
    template: `
    <ndc-dynamic
        *ngFor="let comp of question.components"
        [ndcDynamicComponent]="comp.component"
        [ndcDynamicInputs]="{ data: comp }"
        class="component-comp"
        ></ndc-dynamic>
    `
})
export class QuestionComponent {
    @Input() question: Question;

    @ViewChildren(DynamicComponent) private dynamicComponents: QueryList<DynamicComponent>;
    components: CompComponent[];

    constructor() {
    }

    getAttempt() : QuestionAttempt {
        this.components = this.dynamicComponents.map((dynComp) => {
            return dynComp.componentRef.instance as CompComponent;
        });

        let compAttempts = this.components.map((comp) => {
            return comp.getAttempt();
        })

        let correct = compAttempts.every(attempt => attempt.correct);
        let marks = compAttempts.reduce((acc, attempt) => acc + attempt.marks, 0);
        let maxMarks = compAttempts.reduce((acc, attempt) => acc + attempt.maxMarks, 0);

        var qa : QuestionAttempt = {
            question: this.question._ref,
            components: compAttempts,
            correct: correct,
            marks: marks,
            maxMarks: maxMarks
        };
        return qa;
    }
}
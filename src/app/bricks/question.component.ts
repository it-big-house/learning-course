import { Component, Input, ViewChildren, QueryList } from "@angular/core";
import { Question, QuestionAttempt } from "../bricks";
import { CompComponent } from "./comp/comp.component";
import { DynamicComponent } from "ng-dynamic-component";
import { ShufflePipe } from "ngx-pipes";

@Component({
    selector: 'question',
    template: `
    <ndc-dynamic
        *ngFor="let comp of question.components; let i = index"
        [ndcDynamicComponent]="comp.component"
        [ndcDynamicInputs]="{ data: comp, reveal: reveal, attempt: attempt?.components[i] }"
        class="component-comp"
        ></ndc-dynamic>
    `
})
export class QuestionComponent {
    @Input() question: Question;
    @Input() attempt: QuestionAttempt;
    @Input() reveal: boolean;

    @ViewChildren(DynamicComponent) private dynamicComponents: QueryList<DynamicComponent>;
    components: CompComponent[];

    constructor() {
    }

    getAttempt() : QuestionAttempt {
        this.components = this.dynamicComponents.map((dynComp) => {
            return dynComp.componentRef.instance as CompComponent;
        });

        var qa : QuestionAttempt = {
            question: this.question._ref,
            components: this.components.map((comp) => {
                return comp.getAttempt();
            }),
            correct: null
        };
        return qa;
    }
}
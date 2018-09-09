import { Component, Input } from "@angular/core";
import { Comp, ComponentAttempt } from "../../../schema";

@Component({
    template: ``
})
export class CompComponent {
    constructor() {
    }

    @Input() data: Comp;
    @Input() attempt: ComponentAttempt;

    getAnswer() {};

    getAttempt() : ComponentAttempt {
        let att = this.mark({ answer: this.getAnswer(), correct: null, marks: 0, maxMarks: 0 }, this.attempt);
        return att;
    };

    mark(attempt: ComponentAttempt, prev: ComponentAttempt) : ComponentAttempt { return attempt; }
}

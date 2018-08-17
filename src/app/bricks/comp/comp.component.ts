import { Component, Input } from "@angular/core";
import { Comp, ComponentAttempt } from "../../bricks";

@Component({
    template: ``
})
export class CompComponent {
    constructor() {
    }

    @Input() data: Comp;

    getAnswer() {};

    getAttempt() : ComponentAttempt {
        let att = this.mark({ answer: this.getAnswer(), correct: null, marks: null });
        return att;
    };

    mark(attempt: ComponentAttempt) : ComponentAttempt { return attempt; }
}
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
        return { answer: this.getAnswer(), correct: null };
    };
}
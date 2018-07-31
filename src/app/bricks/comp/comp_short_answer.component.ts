import { Component, Input } from '@angular/core';

import { Comp, ComponentAttempt } from '../../bricks';
import { register } from './comp_index';
import { CompComponent } from "./comp.component";

export class CompShortAnswer extends Comp {
    name = "Short Answer";
    data: { text: string, entries: { name: string, answer: string }[] };

    constructor(data: { text: string, entries: { name: string, answer: string }[] }) {
        super();
        this.data = data;
    }
}

@register("ShortAnswer")
@Component({
    selector: 'short-answer',
    template: `
    <p>{{data.data.text}}</p>
    <div class="short-answer-container">
        <mat-form-field *ngFor="let entry of data.data.entries; let i = index">
            <input matInput placeholder="{{entry.name}}" [(ngModel)]="userAnswers[i]" />
        </mat-form-field>
    </div>
    `,
    styleUrls: ['../live.component.scss']
})
export class ShortAnswerComponent extends CompComponent {
    @Input() data: CompShortAnswer;

    userAnswers: string[];

    ngOnInit() {
        this.userAnswers = [];
    }

    getAnswer() : string[]{
        return this.userAnswers;
    }

    getAttempt(): ComponentAttempt {
        return new ComponentAttempt(this.getAnswer(), null);
    }
}
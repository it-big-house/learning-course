import { Component, Input } from '@angular/core';

import { Comp, ComponentAttempt } from '../../bricks';
import { register } from './comp_index';
import { CompComponent } from "./comp.component";

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export class CompHorizontalShuffle extends Comp {
    name = "Horizontal Shuffle";
    data: { items: string[], reveal: string }

    constructor(data: {items: string[], reveal:string}) {
        super();
        this.data = data;
    }
}

@register("HorizontalShuffle")
@Component({
    selector: 'horizontal-shuffle',
    template: `
    <div class="horizontal-shuffle-container" [dragula]="'DRAG'" [(dragulaModel)]="userChoices" fxLayout.gt-xs="row wrap" fxLayout.xs="column" fxLayoutAlign.xs="center center">
        <mat-card fxFlex.gt-xs="1 0 15%" fxFlex.xs="0 0 0" class="horizontal-shuffle-item" *ngFor="let choice of userChoices; let i = index">
            {{choice}}
        </mat-card>
    </div>
    <p *ngIf="attempt">{{data.data.reveal}}</p>
    `,
    styleUrls: ['../live.component.scss']
})
export class HorizontalShuffleComponent extends CompComponent {
    @Input() data: CompHorizontalShuffle;

    userChoices: string[];

    ngOnInit() {
        this.userChoices = shuffle(this.data.data.items.slice());
        if(this.attempt) {
            this.userChoices = this.attempt.answer.map(val => this.data.data.items[val]);
        }
    }

    getAnswer() : number[] {
        return this.userChoices.map(val => this.data.data.items.indexOf(val));
    }

    mark(attempt: ComponentAttempt, prev: ComponentAttempt) : ComponentAttempt {
        let markIncrement = prev ? 2 : 5;
        attempt.correct = true;
        attempt.marks = 0;
        attempt.maxMarks = 0;
        attempt.answer.forEach((answer, index, array) => {
            if (index != 0) {
                attempt.maxMarks += 5;
                if(answer - array[index-1] == 1) {
                    if(!prev) {
                        attempt.marks += markIncrement;
                    } else if(prev.answer[index] - prev.answer[index-1] != 1) {
                        attempt.marks += markIncrement;
                    }
                } else {
                    attempt.correct = false;
                }
            }
        })
        if(attempt.marks == 0 && !prev) attempt.marks = 1;
        return attempt;
    }
}

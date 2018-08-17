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

export class CompOrder extends Comp {
    name = "Order";
    data: { choices:string[] }

    constructor(data: { choices:string[] }) {
        super();
        this.data = data;
    }
}

@register("Order")
@Component({
    selector: 'order',
    template: `
    <div class="order-container">
        <mat-list [dragula]="'DRAG'" [(dragulaModel)]="userChoices">
            <mat-list-item *ngFor="let choice of userChoices; let i = index">
                <span class="order-number">{{i+1}}</span>
                {{choice}}
            </mat-list-item>
        </mat-list>
    </div>
    `,
    styleUrls: ['../live.component.scss']
})
export class OrderComponent extends CompComponent {
    userChoices: string[];

    @Input() data: CompOrder;

    getAnswer() : number[] {
        return this.userChoices.map(val => this.data.data.choices.indexOf(val));
    }

    ngOnInit() {
        this.userChoices = shuffle(this.data.data.choices.slice());
    }

    mark(attempt: ComponentAttempt) : ComponentAttempt {
        attempt.correct = true;
        attempt.marks = 0;
        attempt.answer.forEach((answer, index, array) => {
            if (index != 0) {
                if(answer - array[index-1] == 1) {
                    attempt.marks += 5;
                } else {
                    attempt.correct = false;
                }
            }
        })
        if(attempt.marks == 0) attempt.marks = 1;
        return attempt;
    }
}
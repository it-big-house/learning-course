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
    data: { choices:string[], reveals:string[] }

    constructor(data: { choices:string[], reveals:string[] }) {
        super();
        this.data = data;
    }
}

@register("Order")
@Component({
    selector: 'order',
    template: `
    <div class="order-container" fxLayout="row">
        <mat-list [dragula]="'DRAG'" [(dragulaModel)]="userChoices">
            <mat-list-item *ngFor="let choice of userChoices; let i = index">
                <span class="order-number">{{i+1}}</span>
                <div>{{choice}}</div>
            </mat-list-item>
        </mat-list>
        <mat-list *ngIf="attempt">
            <mat-list-item *ngFor="let choice of userChoices; let i = index">
                <div *ngIf="data.data.reveals">{{data.data.reveals[getChoice(choice)]}}</div>
            </mat-list-item>
        </mat-list>
        <mat-list *ngIf="attempt" fxLayout="column" fxLayoutAlign="center center">
            <div *ngFor="let choice of userChoices; let i = index">
                <mat-list-item *ngIf="i != 0">
                    <mat-icon style="font-size: 32px" [inline]="true" class="rotate-90">redo</mat-icon>
                    <div fxFlex="0 0 20px"></div>
                    <mat-checkbox [indeterminate]="getState(i) == -1" [checked]="getState(i) == 1" disabled></mat-checkbox>
                </mat-list-item>
            </div>
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
        if(this.attempt) {
            this.userChoices = this.attempt.answer.map(val => this.data.data.choices[val]);
        }
    }

    getChoice(choice) {
        return this.data.data.choices.indexOf(choice);
    }

    getState(index: number) : number {
        if(this.attempt.answer[index] - this.attempt.answer[index - 1] == 1) {
            return 1;
        } else {
            return -1;
        }
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
                    } else if (prev.answer[index] - prev.answer[index-1] != 1) {
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

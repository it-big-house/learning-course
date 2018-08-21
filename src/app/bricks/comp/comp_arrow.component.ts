import { Component, Input } from '@angular/core';

import { Comp, ComponentAttempt } from '../../bricks';
import { register } from './comp_index';
import { CompComponent } from "./comp.component";
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export class CompArrow extends Comp {
    name = "Arrow";
    data: { categories: { choices: string[] }[], reveal: string }

    constructor(data: { categories: { choices: string[] }[], reveal:string }) {
        super();
        this.data = data;
    }
}

@register("Arrow")
@Component({
    selector: 'sort',
    template: `
    <div class="arrow-big-container" fxLayout="row">
        <div *ngFor="let cat of userCats; let i = index" class="arrow-container" fxFlex="1 0 25%" fxLayout="row">
            <mat-list [dragula]="'DRAG'+i" [(dragulaModel)]="userCats[i].choices" class="arrow-list" fxFlex="1 0 0">
                <mat-list-item class="arrow-list-item sort-list-item" *ngFor="let item of cat.choices; let ind = index" fxLayout="row" fxLayoutAlign="space-around center">
                    <mat-checkbox *ngIf="i == 0 && attempt" [checked]="getState(ind) == 1" [indeterminate]="getState(ind) == -1" disabled></mat-checkbox>
                    <div *ngIf="i == 0 && attempt">{{ data.data.reveals[getChoice(item)] }}</div>
                    <div fxFlex="1 0 0"></div>
                    <div class="arrow-item-text">{{item}}</div>
                    <div fxFlex="1 0 0"></div>
                </mat-list-item>
            </mat-list>
            <!-- Arrow Graphics -->
            <mat-list *ngIf="i + 1 != userCats.length">
                <mat-list-item *ngFor="let item of cat.choices">
                    <mat-icon class="material-icons arrow-icon">arrow_right_alt</mat-icon>
                </mat-list-item>
            </mat-list>
        <div>
    </div>
    `,
    styleUrls: ['../live.component.scss'],
    providers: [
        {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop'}
    ]
})
export class ArrowComponent extends CompComponent {
    @Input() data: CompArrow;

    userCats: { choices: string[] }[];

    ngOnInit() {
        this.userCats = this.data.data.categories.map((cat) => { return { choices: shuffle(cat.choices.slice()) }});
        if(this.attempt) {
            this.userCats = [];
            this.attempt.answer[0].choice.forEach((choice, index) => {
                this.userCats.push({ choices: [] });
            })
            this.userCats = this.userCats.map((cat, index) => {
                return {
                    choices: this.attempt.answer.map((choice, i) => {
                        return this.data.data.categories[index].choices[choice.choice[index]];
                    })
                };
            })
        }
    }

    getAnswer() : { choice: number[] }[] {
        var choices: { choice: number[] }[] = [];
        this.userCats[0].choices.forEach((choice, index) => {
            choices.push({ choice: this.userCats.map((cat, i) => { return this.data.data.categories[i].choices.indexOf(cat.choices[index]) }) })
        });
        return choices;
    }

    getChoice(choice) {
        return this.data.data.categories[0].choices.indexOf(choice);
    }

    getState(index: number) : number {
        let corr = this.attempt.answer[index].choice.every((ch, ind) => {
            return ch == this.attempt.answer[index].choice[0];
        })
        if(corr) {
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
        attempt.answer.map(c => c.choice).forEach((c, i) => {
            attempt.maxMarks += 5;
            let corr = c.every(opt => opt == c[0]);
            if(corr) {
                if(!prev) {
                    attempt.marks += markIncrement;
                } else if(!prev.answer[i].choice.every(opt => opt == c[0])) {
                    attempt.marks += markIncrement;
                }
            } else {
                attempt.correct = false;
            }
        });
        if(attempt.marks == 0 && !prev) attempt.marks = 1;
        return attempt;
    }
}

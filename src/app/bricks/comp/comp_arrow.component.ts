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

export class CompArrow extends Comp {
    name = "Arrow";
    data: { categories: { choices: string[] }[] }

    constructor(data: { categories: { choices: string[] }[] }) {
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
                <mat-list-item class="arrow-list-item sort-list-item" *ngFor="let item of cat.choices" fxLayoutAlign="center center">
                    <p class="arrow-item-text">{{item}}</p>
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
    styleUrls: ['../live.component.scss']
})
export class ArrowComponent extends CompComponent {
    @Input() data: CompArrow;

    userCats: { choices: string[] }[];

    ngOnInit() {
        this.userCats = this.data.data.categories.map((cat) => { return { choices: shuffle(cat.choices.slice()) }});
    }

    getAnswer() : { choice: number[] }[] {
        var choices: { choice: number[] }[] = [];
        this.userCats[0].choices.forEach((choice, index) => {
            choices.push({ choice: this.userCats.map((cat, i) => { return this.data.data.categories[i].choices.indexOf(cat.choices[index]) }) })
        });
        return choices;
    }

    mark(attempt: ComponentAttempt) : ComponentAttempt {
        attempt.correct = true;
        attempt.marks = 0;
        attempt.answer.map(c => c.choice).forEach((c) => {
            let corr = c.every(opt => opt == c[0]);
            if(corr) {
                attempt.marks += 5;
            } else {
                attempt.correct = false;
            }
        });
        if(attempt.marks == 0) attempt.marks = 1;
        return attempt;
    }
}
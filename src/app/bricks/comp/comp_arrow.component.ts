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
    <div class="sort-container">
        <div *ngFor="let cat of userCats; let i = index" class="sort-container arrow-container">
            <mat-list [dragula]="'DRAG'+i" [(dragulaModel)]="userCats[i].choices" class="arrow-list">
                <mat-list-item class="arrow-list-item sort-list-item" *ngFor="let item of cat.choices">
                    <p class="arrow-item-text">{{item}}</p>
                </mat-list-item>
            </mat-list>
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
}
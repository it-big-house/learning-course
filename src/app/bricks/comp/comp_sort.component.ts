import { Component, Input } from '@angular/core';

import { Comp, ComponentAttempt } from '../../bricks';
import { register } from './comp_index';
import { CompComponent } from "./comp.component";

export class CompSort extends Comp {
    name = "Sort";
    data: { choices:{ [choice: string]: number }, categories: string[] }

    constructor(data: { choices:{ [choice: string]: number }, categories: string[] }) {
        super();
        this.data = data;
    }
}

@register("Sort")
@Component({
    selector: 'sort',
    template: `
    <div class="sort-header-container">
        <mat-list class="sort-header" *ngFor="let cat of userCats">
            <mat-list-item class="sort-list-item">{{cat.name}}</mat-list-item>
        </mat-list>
    </div>
    <div class="sort-container">
        <mat-list [dragula]="'DRAG'" [(dragulaModel)]="userCats[i].choices" class="sort-list" *ngFor="let cat of userCats; let i = index">
            <mat-list-item class="sort-list-item" *ngFor="let item of cat.choices">{{item}}</mat-list-item>
        </mat-list>
    </div>
    `,
    styleUrls: ['../live.component.scss']
})
export class SortComponent extends CompComponent {
    @Input() data: CompSort;

    userCats: {choices: string[], name: string}[];

    ngOnInit() {
        var choicesArray = Object.keys(this.data.data.choices).map(key => key);
        this.userCats = [];
        this.userCats.push({ choices: choicesArray, name: "Unsorted" });
        this.data.data.categories.forEach(cat => { this.userCats.push({ choices: [], name: cat }) });
    }

    getAnswer() : { [choice: string]: number } {
        var choices = {};
        this.userCats.forEach((cat, index) => {
            cat.choices.forEach((choice) => {
                choices[choice] = index;
            })
        })
        return choices;
    }

    getAttempt() : ComponentAttempt {
        return new ComponentAttempt(this.getAnswer(), null);
    }
}
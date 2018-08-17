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
    <div class="sort-container" fxLayout="row" fxLayoutAlign="start stretch" fxLayoutGap="10px">
        <div class="cat-container" *ngFor="let cat of userCats; let i = index" fxFlex="1 0 0">
            <div class="cat-header">{{cat.name}}</div>
            <mat-list [dragula]="'DRAG'" [(dragulaModel)]="userCats[i].choices" class="sort-list">
                <mat-list-item class="sort-list-item" *ngFor="let item of cat.choices">{{item}}</mat-list-item>
            </mat-list>
        </div>
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
            if(index != 0) {
                cat.choices.forEach((choice) => {
                    choices[choice] = index-1;
                })
            }
        })
        return choices;
    }

    mark(attempt: ComponentAttempt) : ComponentAttempt {
        attempt.correct = true;
        attempt.marks = 0;
        Object.keys(this.data.data.choices).forEach((key, index) => {
            if(attempt.answer[key] != this.data.data.choices[key]) {
                attempt.correct = false;
            } else {
                attempt.marks += 5;
            }
        });
        if(attempt.marks == 0 && Object.keys(attempt.answer).length != 0) attempt.marks = 1;
        return attempt;
    }
}
import { Component, Input } from '@angular/core';

import { Comp, ComponentAttempt } from '../../bricks';
import { register } from './comp_index';
import { CompComponent } from "./comp.component";
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';

export class CompSort extends Comp {
    name = "Sort";
    data: { choices:{ [choice: string]: number }, reveals: { [choice: string]: string }, categories: string[] }

    constructor(data: { choices:{ [choice: string]: number }, reveals: { [choice: string]: string }, categories: string[] }) {
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
                <mat-list-item class="sort-list-item" *ngFor="let item of cat.choices">
                    <div>
                        <mat-checkbox *ngIf="attempt" [indeterminate]="getState(item) == -1" [checked]="getState(item) == 1" disabled></mat-checkbox>
                        {{item}}
                        <div *ngIf="attempt" style="font-size: 12px">{{ data.data.reveals[item] }}</div>
                    </div>
                </mat-list-item>
            </mat-list>
        </div>
    </div>
    `,
    styleUrls: ['../live.component.scss'],
    providers: [
        {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop'}
    ]
})
export class SortComponent extends CompComponent {
    @Input() data: CompSort;

    userCats: {choices: string[], name: string}[];

    ngOnInit() {
        if(!this.attempt) {
            var choicesArray = Object.keys(this.data.data.choices).map(key => key);
            this.userCats = [];
            this.userCats.push({ choices: choicesArray, name: "Unsorted" });
            this.data.data.categories.forEach(cat => { this.userCats.push({ choices: [], name: cat }) });
        } else {
            this.userCats = [];
            this.userCats.push({ choices: [], name: "Unsorted" });
            this.data.data.categories.forEach(cat => { this.userCats.push({ choices: [], name: cat }) });
            Object.keys(this.attempt.answer).forEach((val) => {
                this.userCats[this.attempt.answer[val]+1].choices.push(val);
            });
            this.userCats[0].choices = Object.keys(this.data.data.choices).filter(val => {
                return this.attempt.answer[val] == undefined;
            });
        }
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

    getState(choice) {
        if(this.attempt.answer[choice] == this.data.data.choices[choice]) {
            return 1;
        } else {
            return -1;
        }
    }

    mark(attempt: ComponentAttempt) : ComponentAttempt {
        attempt.correct = true;
        attempt.marks = 0;
        attempt.maxMarks = 0;
        Object.keys(this.data.data.choices).forEach((key, index) => {
            attempt.maxMarks += 5;
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

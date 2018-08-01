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
    data: { items: string[] }

    constructor(data: {items: string[]}) {
        super();
        this.data = data;
    }
}

@register("HorizontalShuffle")
@Component({
    selector: 'horizontal-shuffle',
    template: `
    <div class="horizontal-shuffle-container" [dragula]="'DRAG'" [(dragulaModel)]="userChoices">
        <mat-card class="horizontal-shuffle-item" *ngFor="let choice of userChoices; let i = index">
            {{choice}}
        </mat-card>
    </div>
    `,
    styleUrls: ['../live.component.scss']
})
export class HorizontalShuffleComponent extends CompComponent {
    @Input() data: CompHorizontalShuffle;
    
    userChoices: string[];

    ngOnInit() {
        this.userChoices = shuffle(this.data.data.items.slice());
    }

    getAnswer() : number[] {
        return this.userChoices.map(val => this.data.data.items.indexOf(val));
    }

    getAttempt() : ComponentAttempt {
        return new ComponentAttempt(this.getAnswer(), null);
    }
}
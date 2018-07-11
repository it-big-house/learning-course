import { Component, ChangeDetectorRef } from '@angular/core';

import { BricksService } from './bricks.service';

import { Brick, Question } from '../bricks';
import { Observable } from 'rxjs';

@Component({
    selector: 'live',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.scss'],
    providers: [ ]
})
export class LiveComponent {
    constructor(bricks: BricksService) {
        this.brick = bricks.currentBrick.asObservable();
        bricks.currentBrick.subscribe((data) => {
            if(data != null) {
                this.showBrick();
            }
        })
    }

    brick: Observable<Brick>;

    showBrick() {
        
    }

    trackQuestion(index: number, item: Question) {
        return item.title;
    }
}
import { Component } from '@angular/core';

import { BricksService } from './bricks.service';

import { Brick } from '../bricks';

@Component({
    selector: 'live',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.scss'],
    providers: [ ]
})
export class LiveComponent {
    constructor(bricks: BricksService) {
        bricks.currentBrick.subscribe((data) => {
            this.brick = data;
            if(this.brick != null) {
                this.showBrick();
            }
        })
    }

    brick: Brick;

    showBrick() { }
}
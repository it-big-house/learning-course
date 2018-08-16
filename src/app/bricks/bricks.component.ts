import { Component } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { BricksService } from './bricks.service';
import { Brick } from '../bricks';

@Component({
  templateUrl: './bricks.component.html',
  styleUrls: ['./bricks.component.scss']
})
export class BricksComponent {
    constructor(
        private bricks: BricksService,
        private route: ActivatedRoute
    ) {
        this.route.paramMap
            .subscribe((data: ParamMap) => {
                var id = data.get('id');
                bricks.loadBrick(id);
                bricks.currentBrick.subscribe((data) => {
                    this.brick = data;
                })
            })
    }

    brick: Brick;
}
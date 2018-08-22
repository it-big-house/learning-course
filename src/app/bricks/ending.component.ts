import { Component, Input } from "@angular/core";
import { BrickAttempt, Brick } from "../bricks";
import { BricksService } from "./bricks.service";

import { BehaviorSubject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'live-ending',
    templateUrl: './ending.component.html',
    styleUrls: ['./summary.component.scss']
})
export class EndingComponent {
    brickAttempt: BrickAttempt;
    aBrick: BehaviorSubject<Brick>;
    _brick: Brick

    constructor(private bricks: BricksService, private router: Router, private route: ActivatedRoute) {
        if(bricks.currentBrickAttempt == null) {
            router.navigate(["../live"], { relativeTo: route });
        }
        this.aBrick = bricks.currentBrick;
        this.aBrick.subscribe(val => { this._brick = val });
        this.brickAttempt = bricks.currentBrickAttempt;
        bricks.publishBrickAttempt(this.brickAttempt);
    }

    finish() {
        this.bricks.currentBrick = null;
        this.bricks.currentBrickAttempt = null;
        this.router.navigate(['fortress', 'pallet', this._brick.pallet.id])
    }
}

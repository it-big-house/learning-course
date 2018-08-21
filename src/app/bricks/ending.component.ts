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

    constructor(private bricks: BricksService, router: Router, route: ActivatedRoute) {
        if(bricks.currentBrickAttempt == null) {
            router.navigate(["../live"], { relativeTo: route });
        }
        this.aBrick = bricks.currentBrick;
        this.brickAttempt = bricks.currentBrickAttempt;
    }
}

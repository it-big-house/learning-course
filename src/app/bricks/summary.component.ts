import { Component, Input } from "@angular/core";
import { BrickAttempt, Brick } from "../bricks";
import { BricksService } from "./bricks.service";

import { BehaviorSubject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'live-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
    brickAttempt: BrickAttempt;
    brick: BehaviorSubject<Brick>;

    constructor(private bricks: BricksService, router: Router, route: ActivatedRoute) {
        if(bricks.currentBrickAttempt == null) {
            router.navigate(["../live"], { relativeTo: route });
        }
        this.brick = bricks.currentBrick;
        this.brickAttempt = bricks.currentBrickAttempt;
    }
}

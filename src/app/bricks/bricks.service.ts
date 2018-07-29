import { Injectable } from '@angular/core';
import { DatabaseService } from '../database.service';

import { BehaviorSubject } from 'rxjs';

import { Brick, BrickAttempt } from '../bricks';

@Injectable({
    providedIn: 'root'
})
export class BricksService {
    constructor(private database: DatabaseService) {
        this.currentBrick = new BehaviorSubject(null);
    }

    currentBrick: BehaviorSubject<Brick>;

    loadBrick(id: string) {
        this.currentBrick = this.database.getBrick(id);
    }

    publishBrickAttempt(ba: BrickAttempt) {
        this.database.createBrickAttempt(ba).subscribe(() => {
            console.log("published brick!");
        });
    }
}
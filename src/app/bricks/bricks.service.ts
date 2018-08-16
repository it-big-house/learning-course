import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';

import { BehaviorSubject } from 'rxjs';

import { Brick, BrickAttempt } from '../bricks';

@Injectable({
    providedIn: 'root'
})
export class BricksService {
    constructor(public database: DatabaseService) {
        this.currentBrick = new BehaviorSubject(null);
    }

    currentBrick: BehaviorSubject<Brick>;

    currentBrickAttempt: BrickAttempt;

    loadBrick(id: string) {
        this.currentBrick = this.database.getBrick(id);
    }

    markBrick(ba: BrickAttempt) {
        ba.answers.forEach((ans) => {
            ans.components.forEach((comp) => {
                comp.correct = true;
            })
            ans.correct = false;
        })
        this.currentBrickAttempt = ba;
    }

    publishBrickAttempt(ba: BrickAttempt) {
        this.database.createBrickAttempt(ba).subscribe();
    }
}
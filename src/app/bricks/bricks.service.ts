import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';

import { BehaviorSubject, Observable } from 'rxjs';

import { Brick, BrickAttempt, Pallet } from '../bricks';

@Injectable({
    providedIn: 'root'
})
export class BricksService {
    constructor(public database: DatabaseService) {
        this.currentBrick = new BehaviorSubject(null);
    }

    currentBrick: BehaviorSubject<Brick>;
    currentPallet: Observable<Pallet>;
    currentBrickAttempt: BrickAttempt;

    loadBrick(id: string) {
        this.currentBrick = this.database.getBrick(id);
        this.currentBrick.subscribe(val => {
            if(val) {
                this.currentPallet = this.database.getPallet(val.pallet.id);
            }
        })
    }

    publishBrickAttempt(ba: BrickAttempt) {
        this.database.createBrickAttempt(ba).subscribe((msg) => {
            console.log(msg);
        });
    }
}

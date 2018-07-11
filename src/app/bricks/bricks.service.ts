import { Injectable } from '@angular/core';
import { DatabaseService } from '../database.service';

import { BehaviorSubject } from 'rxjs';

import { Brick } from '../bricks';

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
}
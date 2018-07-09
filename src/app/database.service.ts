import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { Brick } from './bricks';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(private http: HttpClient) { }

    getBrick(id: string) : BehaviorSubject<Brick> {
        var bs = new BehaviorSubject<Brick>(null);
        console.log("Requesting... " + id);
        // TODO: Change to environment variable!
        this.http.get<Brick>("https://learning-fortress-backend.herokuapp.com/brick/"+id)
            .subscribe((data) => {
                bs.next(data);
            })
        return bs;
    }
}
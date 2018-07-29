import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
    'Content-Type':  'application/json'
})

import { environment } from '../environments/environment';

import { Observable, BehaviorSubject } from 'rxjs';

import { Brick, BrickAttempt, Question } from './bricks';

import { getComponent } from './bricks/comp/comp_index';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(private http: HttpClient) { }

    getBrick(id: string) : BehaviorSubject<Brick> {
        var bs = new BehaviorSubject<Brick>(null);
        console.log("Requesting " + id + " from " + environment.apiUrl);
        // TODO: Change to environment variable!
        this.http.get<Brick>(environment.apiUrl+"brick/"+id)
            .subscribe((data : Brick) => {
                data.questions.forEach((question: Question) => {
                    question.components.forEach((component) => {
                        component.component = getComponent(component.name);
                    });
                });
                bs.next(data);
            })
        return bs;
    }

    createBrickAttempt(brickAttempt: BrickAttempt) : Observable<any> {
        var newBrickAttempt = brickAttempt.toRefOnly({ answers: true });
        console.log("Creating brickAttempt: " + JSON.stringify(newBrickAttempt) + " at URL " + environment.apiUrl);
        return this.http.post<any>(environment.apiUrl+"brickattempt", newBrickAttempt, { headers: headers, observe: 'response' });
    }
}
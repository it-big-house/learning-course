import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

console.log(environment);

const headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa(environment.auth_username+':'+environment.auth_password)
})

import { environment } from '../environments/environment';

import { Observable, BehaviorSubject } from 'rxjs';

import { Brick, BrickAttempt } from './bricks';

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
        this.http.get<Brick>(environment.apiUrl+"brick/"+id, { headers: headers })
            .subscribe((data) => {
                data.questions.forEach((question) => {
                    question.components.forEach((component) => {
                        component.component = getComponent(component.name);
                    });
                });
                bs.next(data);
            })
        return bs;
    }

    createBrickAttempt(brickAttempt: any) : Observable<any> {
        console.log("Creating brickAttempt: " + JSON.stringify(brickAttempt) + " at URL " + environment.apiUrl);
        return this.http.post<any>(environment.apiUrl+"brickattempt", brickAttempt, { headers: headers, observe: 'response' });
    }
}
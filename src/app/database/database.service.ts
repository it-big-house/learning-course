import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { AngularFirestore, DocumentSnapshot, QuerySnapshot, DocumentReference, AngularFirestoreDocument, DocumentChangeAction, Action, AngularFirestoreCollection, QueryDocumentSnapshot } from 'angularfire2/firestore';

const headers = new HttpHeaders({
    'Content-Type':  'application/json'
})

import { environment } from '../../environments/environment';

import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromPromise';

import { Brick, BrickAttempt, Question, Pallet, QuestionAttempt, toRefOnly } from '../bricks';

import { getComponent } from '../bricks/comp/comp_index';
import { Observer } from 'firebase';
import { BricksComponent } from '../bricks/bricks.component';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(public afs: AngularFirestore) { }

    getBrick(id: string) : BehaviorSubject<Brick> {
        let brickRef : AngularFirestoreDocument<Brick> = this.afs.collection('bricks').doc<Brick>(id);
        let bs : BehaviorSubject<Brick> = new BehaviorSubject<Brick>(null);

        const brick$ = brickRef.valueChanges();
        const questions$ = brickRef.collection<Question>('questions').snapshotChanges()
            .pipe(
                map((actions: DocumentChangeAction<Question>[]) => actions.map(action => action.payload.doc)),
                map((qs: DocumentSnapshot<Question>[]) => {
                    return qs.map((q: DocumentSnapshot<Question>) => {
                        let qstn = q.data();
                        qstn._ref = q.ref;
                        qstn.components.forEach((comp) => {
                            comp.component = getComponent(comp.name);
                        })
                        return qstn;
                    })
                })
            );

        combineLatest(brick$, questions$)
            .pipe(
                tap(() => console.log("hello")),
                map((data: [Brick, Question[]]) => {
                    let brick = data[0];
                    brick._ref = brickRef.ref;
                    brick.questions = data[1];
                    return brick;
                })
            )
            .subscribe(bs);

        return bs;
    }

    createBrickAttempt(brickAttempt: BrickAttempt) : Observable<AngularFirestoreDocument<BrickAttempt>> {
        return Observable.fromPromise(
            this.afs.collection('brickattempts').add(brickAttempt)
                .then((ba: DocumentReference) => {
                    brickAttempt.answers.map(ans => ba.collection('questions').add(ans));
                    return new AngularFirestoreDocument<BrickAttempt>(ba, this.afs);
                })
        );
    }

/*
    createBrickAttempt(brickAttempt: BrickAttempt) : Observable<any> {
        var newBrickAttempt = brickAttempt.toRefOnly({ answers: true });

        let brick = Object.assign({}, newBrickAttempt);
        delete brick.answers;

        brick.student = this.afs.doc(newBrickAttempt.student).ref;
        brick.brick = this.afs.doc(newBrickAttempt.brick).ref;

        var prom = this.afs.collection('brickattempts').add(brick)
            .then((studentbrick: DocumentReference) => {
                let answersRef = studentbrick.collection('answers');
                return Promise.all(newBrickAttempt.answers.map((answerData: any, index: number) => {
                    //Firestore SDK doesn't allow for custom objects to be added to collections.
                    var data = {};
                    Object.keys(answerData).map(key => data[key] = answerData[key])
                    answersRef.add(data);
                }));
            })
        return Observable.fromPromise(prom);
    }
    */
}
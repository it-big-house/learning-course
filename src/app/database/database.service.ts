import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { AngularFirestore, DocumentSnapshot, QuerySnapshot, DocumentReference, AngularFirestoreDocument, DocumentChangeAction, Action, AngularFirestoreCollection, QueryDocumentSnapshot } from 'angularfire2/firestore';

const headers = new HttpHeaders({
    'Content-Type':  'application/json'
})

import { environment } from '../../environments/environment';

import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

import { Brick, BrickAttempt, Question, Pallet, QuestionAttempt, toRefOnly } from '../bricks';

import { getComponent } from '../bricks/comp/comp_index';
import { Observer } from '../../../node_modules/firebase';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(public afs: AngularFirestore) {
    }

    getBrick(id: string, shallow?: boolean) : BehaviorSubject<Brick> {
        let brickRef : DocumentReference = this.afs.collection('bricks').doc<Brick>(id).ref;
        let bs : BehaviorSubject<Brick> = new BehaviorSubject<Brick>(null);

        let b : Brick;

        brickRef.get()
            .then((brick: DocumentSnapshot<Brick>) => {
                b = brick.data();
                b._ref = brick.ref;
                return b._ref.collection('questions').get()
            })
            .then((questions: QuerySnapshot<Question>) => {
                b.questions = questions.docs.map((question: QueryDocumentSnapshot<Question>) => {
                    let q = question.data();
                    q._ref = question.ref;
                    q.components.map((component) => {
                        component.component = getComponent(component.name);
                    })
                    return q;
                })
                return b.pallet.get();
            })
            .then((pallet: DocumentSnapshot<Pallet>) => {
                let p = pallet.data();
                p._ref = pallet.ref;
                b._pallet = p;
                bs.next(b);
            })

        return bs;
    }

    createBrickAttempt(brickAttempt: BrickAttempt) : Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            observer.next("Sorry, this isn't implemented yet lol");
        })

        var newBrickAttempt = toRefOnly(brickAttempt, { answers: true });

        let brick: BrickAttempt = Object.assign({}, newBrickAttempt);
        delete brick.answers;
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
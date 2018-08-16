import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { AngularFirestore, DocumentSnapshot, QuerySnapshot, DocumentReference, AngularFirestoreDocument, DocumentChangeAction, Action, AngularFirestoreCollection, QueryDocumentSnapshot } from 'angularfire2/firestore';

const headers = new HttpHeaders({
    'Content-Type':  'application/json'
})

import { environment } from '../../environments/environment';

import { Observable, BehaviorSubject, combineLatest, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromPromise';

import { Brick, BrickAttempt, Question, Pallet, QuestionAttempt, toRefOnly, StudentPallet } from '../bricks';

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
        const questions$ = brickRef.collection<Question>('questions', ref => ref.orderBy('number')).snapshotChanges()
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
    
    getStudentPallets(uid: string) : Observable<StudentPallet[]> {
        let palletsRef: AngularFirestoreCollection<StudentPallet> = this.afs.collection('students').doc(uid).collection<StudentPallet>('pallets');
        const pallets$ = palletsRef.snapshotChanges()
            .pipe(
                map((actions: DocumentChangeAction<StudentPallet>[]) => actions.map(action => action.payload.doc)),
                map((pallets) => {
                    return pallets.map((pallet) => {
                        let plt = pallet.data();
                        plt._ref = pallet.ref;
                        return plt;
                    })
                })
            );

        return pallets$;
    }

    getPallets(studentPallets: StudentPallet[]) : Observable<Pallet[]> {
        let palletRefs: AngularFirestoreDocument<Pallet>[] = studentPallets.map(studentPallet => this.afs.doc(studentPallet.pallet));
        const pallets$ = combineLatest(palletRefs.map(ref => ref.snapshotChanges()))
            .pipe(
                map((actions: Action<DocumentSnapshot<Pallet>>[]) => actions.map(action => {
                    let plt = action.payload.data()
                    plt._ref = action.payload.ref;
                    return plt;
                })),
                tap((pallets) => { console.log(pallets) })
            )
        return pallets$;
    }

    getPallet(ref: DocumentReference) : Observable<Pallet> {
        let palletRef: AngularFirestoreDocument<Pallet> = this.afs.doc(ref);
        const pallet$ = palletRef.valueChanges()
            .pipe(
                map((pallet) => {
                    pallet._ref = ref;
                    return pallet;
                })
            )
        return pallet$;
    }
}
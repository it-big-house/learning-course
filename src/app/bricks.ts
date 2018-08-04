// This is the representation of the data structures in the app.

import { DocumentReference, DocumentSnapshot, CollectionReference, AngularFirestoreDocument } from 'angularfire2/firestore';

export function toRefOnly(doc: DatabaseDoc, fieldsToKeep?: any) : any {
    var dataDoc : DatabaseDoc = doc;
    var proto = Object.getOwnPropertyNames(dataDoc).map((name) => {
        var prop = Object.getOwnPropertyDescriptor(dataDoc, name).value;
        if(prop != null) {
            if(Object.keys(prop).includes('_ref')) {
                if(fieldsToKeep[name] != null) { dataDoc[name] = prop.toRefOnly(fieldsToKeep[name]); }
                else { dataDoc[name] = prop._ref; }
            } else if (prop.constructor === Array) {
                prop.forEach((obj, index) => {
                    if(Object.keys(obj).includes('_ref')) {
                        if(fieldsToKeep[name] != null) { dataDoc[name][index] = obj.toRefOnly(fieldsToKeep[name]); }
                        else { dataDoc[name][index] = obj._ref; }
                    }
                });
            }
        }
    });
    return dataDoc;
}

export class DatabaseDoc {
    _ref?: DocumentReference;
}

export class Comp {
    name: string;
    component: any;
    data: any;
}

export interface Question extends DatabaseDoc {
    components: Comp[];
    title: string;
}

export interface Brick extends DatabaseDoc {
    title: string;
    brief: string;
    prep: string;
    subject: string;
    type: number;
    pallet: DocumentReference;
    creator: string;
    creationDate: Date;
    highScore: number;
    avgScore: number;
    totalUsers: number;
    questions: Question[];
}

export interface Pallet extends DatabaseDoc {
    name: string;
    bricks: DocumentReference[];
}

export interface ComponentAttempt {
    answer: any,
    correct: boolean
}

export interface QuestionAttempt extends DatabaseDoc {
    question: DocumentReference;
    components: ComponentAttempt[];
}

export interface BrickAttempt extends DatabaseDoc {
    brick: DocumentReference;
    score: number;
    student: DocumentReference;
    answers: QuestionAttempt[];
}

export interface StudentPallet extends DatabaseDoc {
    pallet: DocumentReference;
    student: DocumentReference;
    teacher: DocumentReference;
    bricks: BrickAttempt[];
}

export interface Student extends DatabaseDoc {
    uid: string;
    name: string;
    pallets: StudentPallet[];
}

export interface Class extends DatabaseDoc {
    teacher: DocumentReference;
    students: DocumentReference[];
    pallets: DocumentReference[];
}

export interface Teacher extends DatabaseDoc {
    uid: string;
    name: string;
    classes: DocumentReference[];
}
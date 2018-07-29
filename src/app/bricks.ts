// This is the representation of the data structures in the app.

export class DatabaseDoc {
    _path?: string;
    
    constructor(path: string);
    constructor(data: object);
    constructor(data?: any) { 
        if(typeof data == 'string') {
            this._path = data;
        } else if(typeof data == 'object') {
            Object.assign(this, data);
        }
    }

    toRefOnly(fieldsToKeep?: any) : DatabaseDoc{
        var dataDoc : DatabaseDoc = this;
        var proto = Object.getOwnPropertyNames(dataDoc).map((name) => {
            var prop = Object.getOwnPropertyDescriptor(dataDoc, name).value;
            if(prop != null) {
                if(prop instanceof DatabaseDoc) {
                    if(fieldsToKeep[name] != null) { dataDoc[name] = prop.toRefOnly(fieldsToKeep[name]); }
                    else { dataDoc[name] = prop._path; }
                } else if (prop.constructor === Array) {
                    prop.forEach((obj, index) => {
                        if(obj instanceof DatabaseDoc) {
                            if(fieldsToKeep[name] != null) { dataDoc[name][index] = obj.toRefOnly(fieldsToKeep[name]); }
                            else { dataDoc[name][index] = obj._path; }
                        }
                    });
                }
            }
        });
        return dataDoc;
    }
}

export interface DatabaseObj { }

export abstract class Comp implements DatabaseObj {
    name: string;
    component: any;
    data: any;
}

export class Question extends DatabaseDoc {
    components: Comp[];
    title: string;
}

export class Brick extends DatabaseDoc {
    title: string;
    brief: string;
    prep: string;
    subject: string;
    type: number;
    pallet: Pallet;
    creator: string;
    creationDate: Date;
    highScore: number;
    avgScore: number;
    totalUsers: number;
    questions: Question[];
}

export class Pallet extends DatabaseDoc {
    name: string;
    bricks: Brick[];
}

export class ComponentAttempt implements DatabaseObj {
    constructor(
        public answer: any,
        public correct: boolean
    ) { }
}

export class QuestionAttempt extends DatabaseDoc {
    question: Question;
    components: ComponentAttempt[];
}

export class BrickAttempt extends DatabaseDoc {
    brick: Brick;
    score: number;
    student: Student;
    answers: QuestionAttempt[];
}

export class StudentPallet extends DatabaseDoc {
    pallet: Pallet;
    student: Student;
    teacher: Teacher;
    bricks: BrickAttempt[];
}

export class Student extends DatabaseDoc {
    uid: string;
    name: string;
    pallets: StudentPallet[];
}

export class Class extends DatabaseDoc {
    teacher: Teacher;
    students: Student[];
    pallets: Pallet[];
}

export class Teacher extends DatabaseDoc {
    uid: string;
    name: string;
    classes: Class[];
}
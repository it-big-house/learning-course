export abstract class Comp {
    name?: string;
    component?: any;
    data: any;
}

export class Question {
    components: Comp[];
    title: string;
}

export class Brick {
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

export class Pallet {
    name: string;
    bricks: Brick[];
}

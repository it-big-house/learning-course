export interface Component {
    instructions: string;
    title: string;
}

export interface Question {
    component: Component;
    title: string;
    [propName: string]: any;
}

export interface Brick {
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

export interface Pallet {
    name: string;
    bricks: Brick[];
}

import { Injectable } from "@angular/core";
import { timer, Observable, Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    constructor() { }

    seconds : number = 0;
    timer : Observable<number>;
    private subscription : Subscription;

    start() {
        this.timer = timer(0, 1000);
        this.subscription = this.timer.subscribe((t) => {
            this.seconds = t;
        })
    }

    stop() {
        this.subscription.unsubscribe();
        this.timer = null;
    }
}
import { Injectable, EventEmitter } from "@angular/core";
import { timer, Observable, Subscription } from "rxjs";


// TODO: Add call to API to make sure that a brick can't be reset.
export class Timer {
    constructor () { }

    timeElapsed : Date;
    timeLeft : Date;
    timeLimit : Date;

    timeResolution: number;

    timer : Observable<number>;
    timeRanOut: EventEmitter<number>;
    private subscription : Subscription;

    countUp() {
        this.timer = timer(0, this.timeResolution);
        this.timeRanOut = null;
        this.subscription = this.timer.subscribe((t) => {
            this.timeElapsed = new Date(t*this.timeResolution);
        })
    }

    countDown(timeLimit: number) {
        this.timer = timer(0, this.timeResolution);
        this.timeLimit = new Date(timeLimit);
        this.timeRanOut = new EventEmitter<number>()
        this.subscription = this.timer.subscribe((t) => {
            this.timeElapsed = new Date(t * this.timeResolution);
            this.timeLeft = new Date(this.timeLimit.getTime() - this.timeElapsed.getTime());
            if(this.timeLeft.getTime() <= 0) {
                this.timeRanOut.emit();
            }
        })
    }

    stop() {
        this.subscription.unsubscribe();
        this.timer = null;
    }
}

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    constructor () { }

    new () {
        return new Timer();
    }
}
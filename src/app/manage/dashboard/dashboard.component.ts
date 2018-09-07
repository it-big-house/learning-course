import { Component, Input } from "@angular/core";
import { Pallet, Brick } from "../../schema";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DatabaseService } from "../../database/database.service";
import { Observable } from "rxjs";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    bricks: Observable<Brick[]>;

    constructor(public database: DatabaseService) {
        this.bricks = database.getBricks();
    }
    // palletId: string;
    // pallet: Observable<Pallet>;
    // bricks: Observable<Brick[]>;

    // constructor(public database: DatabaseService) {
    //     this.pallet = database.getPallet('bsjsJllNgYkos0w3Wrtv');
    //     this.pallet.subscribe((pallet) => {
    //         this.bricks = database.getBricksInPallet(pallet);
    //     })
    // }
}
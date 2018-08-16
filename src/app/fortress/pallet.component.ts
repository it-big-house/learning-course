import { Component, Input } from "@angular/core";
import { Pallet, Brick } from "../bricks";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DatabaseService } from "../database/database.service";
import { Observable } from "rxjs";

@Component({
    selector: 'pallets',
    templateUrl: './pallet.component.html',
    styleUrls: ['./pallet.component.scss']
})
export class PalletComponent {
    palletId: string;
    bricks: Observable<Brick[]>;

    constructor(public database: DatabaseService, public route: ActivatedRoute) {
        this.route.paramMap
            .subscribe((data: ParamMap) => {
                this.palletId = data.get('id');
                database.getPallet(this.palletId).subscribe((pallet) => {
                    this.bricks = database.getBricks(pallet);
                })
            })
    }
}
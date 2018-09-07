import { Component, Input } from "@angular/core";
import { Pallet, Brick } from "../../schema";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DatabaseService } from "../../database/database.service";
import { Observable } from "rxjs";

@Component({
    selector: 'pallets',
    templateUrl: './pallet.component.html',
    styleUrls: ['./pallet.component.scss']
})
export class PalletComponent {
    palletId: string;
    pallet: Observable<Pallet>;
    bricks: Observable<Brick[]>;

    constructor(public database: DatabaseService, public route: ActivatedRoute) {
        this.route.paramMap
            .subscribe((data: ParamMap) => {
                this.palletId = data.get('id');
                this.pallet = database.getPallet(this.palletId)
                this.pallet.subscribe((pallet) => {
                    this.bricks = database.getBricksInPallet(pallet);
                })
            })
    }
}
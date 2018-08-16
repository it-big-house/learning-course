import { Component, Input } from "@angular/core";
import { Pallet } from "../bricks";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DatabaseService } from "../database/database.service";

@Component({
    selector: 'pallets',
    templateUrl: './pallet.component.html',
    styleUrls: ['./pallet.component.scss']
})
export class PalletComponent {
    palletId: string;

    constructor(public database: DatabaseService, public route: ActivatedRoute) {
        this.route.paramMap
            .subscribe((data: ParamMap) => {
                this.palletId = data.get('id');
                console.log(`id is ${this.palletId}`);
            })
    }
}
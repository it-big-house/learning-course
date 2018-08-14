import { Component, Input } from "@angular/core";
import { Pallet } from "../bricks";

@Component({
    selector: 'pallets',
    template: `
    <div class="pallets-container">
        <mat-grid-list cols="6" rowHeight="1:2" gutterSize="5px" class="pallet-list">
            <mat-grid-tile class="pallet-tile-1" colspan="2">
                <mat-grid-tile-header>Isolation & Companionship</mat-grid-tile-header>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas consequatur voluptatibus nulla sint fugit voluptate, eligendi est similique quam impedit, quod. Ea, minima. Laudantium maxime repellendus sit sunt nihil veniam.</p>
                <mat-grid-tile-footer>
                    <a href="#" mat-icon-button>
                        <mat-icon>arrow_forward</mat-icon>
                    </a>
                </mat-grid-tile-footer>
            </mat-grid-tile>
            <mat-grid-tile class="pallet-tile-1" colspan="2">
                <mat-grid-tile-header>Isolation & Companionship</mat-grid-tile-header>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas consequatur voluptatibus nulla sint fugit voluptate, eligendi est similique quam impedit, quod. Ea, minima. Laudantium maxime repellendus sit sunt nihil veniam.</p>
                <mat-grid-tile-footer>
                    <a href="#" mat-icon-button>
                        <mat-icon>arrow_forward</mat-icon>
                    </a>
                </mat-grid-tile-footer>
            </mat-grid-tile>
            <mat-grid-tile class="pallet-tile-1" colspan="2">
                <mat-grid-tile-header>Isolation & Companionship</mat-grid-tile-header>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas consequatur voluptatibus nulla sint fugit voluptate, eligendi est similique quam impedit, quod. Ea, minima. Laudantium maxime repellendus sit sunt nihil veniam.</p>
                <mat-grid-tile-footer>
                    <a href="#" mat-icon-button>
                        <mat-icon>arrow_forward</mat-icon>
                    </a>
                </mat-grid-tile-footer>
            </mat-grid-tile>
            <mat-grid-tile class="pallet-tile-2" colspan="3">
                <mat-grid-tile-header>Isolation & Companionship</mat-grid-tile-header>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas consequatur voluptatibus nulla sint fugit voluptate, eligendi est similique quam impedit, quod. Ea, minima. Laudantium maxime repellendus sit sunt nihil veniam.</p>
                <mat-grid-tile-footer>
                    <a href="#" mat-icon-button>
                        <mat-icon>arrow_forward</mat-icon>
                    </a>
                </mat-grid-tile-footer>
            </mat-grid-tile>
            <mat-grid-tile class="pallet-tile-2" colspan="3">
                <mat-grid-tile-header>Isolation & Companionship</mat-grid-tile-header>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas consequatur voluptatibus nulla sint fugit voluptate, eligendi est similique quam impedit, quod. Ea, minima. Laudantium maxime repellendus sit sunt nihil veniam.</p>
                <mat-grid-tile-footer>
                    <a href="#" mat-icon-button>
                        <mat-icon>arrow_forward</mat-icon>
                    </a>
                </mat-grid-tile-footer>
            </mat-grid-tile>
            <mat-grid-tile class="pallet-tile-3" colspan="6">
                <mat-grid-tile-header>Isolation & Companionship</mat-grid-tile-header>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas consequatur voluptatibus nulla sint fugit voluptate, eligendi est similique quam impedit, quod. Ea, minima. Laudantium maxime repellendus sit sunt nihil veniam.</p>
                <mat-grid-tile-footer>
                    <a href="#" mat-icon-button>
                        <mat-icon>arrow_forward</mat-icon>
                    </a>
                </mat-grid-tile-footer>
            </mat-grid-tile>
        </mat-grid-list>
    </div>
    `,
    styleUrls: ['./home.component.scss']
})
export class PalletComponent {
    @Input() pallet: Pallet;
}
import { Component, Input } from "@angular/core";
import { register } from "./comp_index";
import { Comp, ComponentAttempt } from "../../schema";
import { CompComponent } from "./comp.component";

export class CompList extends Comp {
    data: { items: string[] }

    constructor(data: { items: string[] }) {
        super();
        this.data = data;
    }
}

@register("List")
@Component({
    selector: "list",
    template: `
    <div class="comp-list-container" fxLayout="row wrap" fxLayoutAlign="center space-evenly">
        <div class="comp-list-item" fxFlex="1 0 25%" *ngFor="let choice of data.data.items">{{choice}}</div>
    </div>
    `,
    styleUrls: ["../live.component.scss"]
})
export class ListComponent extends CompComponent {
    constructor() { super() }

    @Input() data: CompList;
    
    getAnswer() : null { return null; }
}
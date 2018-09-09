import { Component, Input } from "@angular/core";
import { register } from "./comp_index";
import { Comp, ComponentAttempt } from "../../../schema";
import { CompComponent } from "./comp.component";

export class CompText extends Comp {
    data: { text: string }

    constructor(data: { text: string }) {
        super();
        this.data = data;
    }
}

@register("Reveal")
@Component({
    selector: "reveal",
    template: `
    <div *ngIf="attempt" class="comp-text-container">
        <p style="background:#FFFC7F; color: #000;">{{data.data.text}}</p>
    </div>
    `,
    styleUrls: ["../live.component.scss"]
})
export class RevealComponent extends CompComponent {
    constructor() { super() }

    @Input() data: CompText;

    getAnswer() : null { return null; }
}
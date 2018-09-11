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

@register("Text")
@Component({
    selector: "text",
    template: `
    <div class="comp-text-container">
        <div [innerHTML]="data.data.text"></div>
    </div>
    `,
    styleUrls: ["../live.component.scss"]
})
export class TextComponent extends CompComponent {
    constructor() { super() }

    @Input() data: CompText;

    getAnswer() : null { return null; }
}
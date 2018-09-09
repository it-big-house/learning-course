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
    styles: [
        ':host >>> .background-green { background: green; }',
        ':host >>> .color-red { color: red; }'
        ],
    template: `
    <div class="comp-text-container">
        <p [innerHTML]="data.data.text"></p>
    </div>
    `,
    styleUrls: ["../live.component.scss"]
})
export class TextComponent extends CompComponent {
    constructor() { super() }

    @Input() data: CompText;

    getAnswer() : null { return null; }
}
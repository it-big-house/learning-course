import { Component, Input } from "@angular/core";
import { register } from "./comp_index";
import { Comp, ComponentAttempt } from "../../bricks";
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
        <p>{{data.data.text}}</p>
    </div>
    `,
    styleUrls: ["../live.component.scss"]
})
export class TextComponent extends CompComponent {
    constructor() { super() }

    @Input() data: CompText;

    getAnswer() : null { return null; }

    getAttempt() : ComponentAttempt {
        return new ComponentAttempt(this.getAnswer(), null);
    }
}
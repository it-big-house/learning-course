import { Component, Input } from "@angular/core";
import { register } from "./comp_index";
import { Comp } from "../../bricks";

export class CompText extends Comp {
    data: { text: string }

    constructor(data: { text: string }) {
        super();
        this.data = data;
    }
}

@Component({
    selector: "text",
    template: `
    <div class="comp-text-container">
        <p>{{data.data.text}}</p>
    </div>
    `,
    styleUrls: ["../live.component.scss"]
})
@register("Text")
export class TextComponent {
    constructor() { }

    @Input() data: CompText;
}
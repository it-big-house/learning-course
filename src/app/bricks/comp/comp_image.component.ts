import { Component, Input } from "@angular/core";
import { register } from "./comp_index";
import { Comp, ComponentAttempt } from "../../bricks";
import { CompComponent } from "./comp.component";

export class CompImage extends Comp {
    data: { src: string }

    constructor(data: { src: string }) {
        super();
        this.data = data;
    }
}

@register("Image")
@Component({
    selector: "image",
    template: `
    <div class="comp-image-container">
        <img class="comp-image" [src]="data.data.src" />
    </div>
    `,
    styleUrls: ["../live.component.scss"]
})
export class ImageComponent extends CompComponent {
    constructor() { super() }

    @Input() data: CompImage;
    
    getAnswer() : null { return null; }

    getAttempt() : ComponentAttempt {
        return new ComponentAttempt(this.getAnswer(), null);
    }
}
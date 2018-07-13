import { Component, Input } from "@angular/core";
import { register } from "./comp_index";
import { Comp } from "../../bricks";

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
export class ImageComponent {
    constructor() { }

    @Input() data: CompImage;
}
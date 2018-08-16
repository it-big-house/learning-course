import { Component, Input, Directive } from '@angular/core';

import { Comp, ComponentAttempt } from '../../bricks';
import { register } from './comp_index';
import { CompComponent } from "./comp.component";

export class CompTextHighlighting extends Comp {
    name = "Text Highlighting";
    data: { text: string }

    constructor(data: { text: string }) {
        super();
        this.data = data;
    }
}

@register("TextHighlighting")
@Component({
    selector: 'text-highlighting',
    template: `
    <p class="text-highlighting">
        <span *ngFor="let word of words; let i = index" [highlight]="word.highlight" (click)="toggleHighlight(i)">{{ word.word }} </span>
    </p>
    `,
    styleUrls: ['../live.component.scss']
})
export class TextHighlightingComponent extends CompComponent {
    @Input() data: CompTextHighlighting;

    words: { word: string, highlight: boolean }[];

    getAnswer() : number[] {
        return this.words
            .map((word, index) => { return { w: word, i: index } })
            .filter((word) => word.w.highlight == true)
            .map((word) => word.i);
    }

    ngOnInit() {
        this.words = this.data.data.text.split(" ").map((word) => { return { word: word, highlight: false } });
    }

    toggleHighlight(i: number) {
        this.words[i].highlight = !this.words[i].highlight;
    }
}
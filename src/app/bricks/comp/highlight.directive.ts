import { Directive, Input, ElementRef } from "@angular/core";

@Directive({
    selector: "[highlight]",
})
export class HighlightDirective {
    _highlight: boolean;

    constructor(public el: ElementRef) { }

    @Input() set highlight(highlight: boolean) {
        this._highlight = highlight;
        this.onHighlightChange();
    };

    onHighlightChange() {
        this.el.nativeElement.style.backgroundColor = this._highlight ? "#00dece" : "#ffffff";
    }
}
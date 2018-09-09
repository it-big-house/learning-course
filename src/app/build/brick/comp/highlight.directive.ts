import { Directive, Input, ElementRef } from "@angular/core";

@Directive({
    selector: "[highlight]",
})
export class HighlightDirective {
    _highlight: boolean;
    @Input() state: number;

    constructor(public el: ElementRef) { }

    @Input() set highlight(highlight: boolean) {
        this._highlight = highlight;
        this.onHighlightChange();
    };

    onHighlightChange() {
        if(!this.state) {
            this.el.nativeElement.style.backgroundColor = this._highlight ? "#00dece" : "#ffffff";
        } else {
            this.el.nativeElement.style.backgroundColor = this._highlight ? (this.state == 1 ? "#55ff55" : "#ff5555") : "#ffffff"
        }
    }
}

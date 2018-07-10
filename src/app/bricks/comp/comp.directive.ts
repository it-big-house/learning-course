import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[comp]',
})
export class CompDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
import { Component, Input, ViewChild, ComponentFactoryResolver } from "../../../../node_modules/@angular/core";
import { Comp } from "../../bricks";
import { CompDirective } from "./comp.directive";

import {MultipleChoiceComponent} from './comp_multiple_choice.component';

@Component({
    selector: 'compo',
    template: `
    <mat-step>
        <ng-template matStepLabel>Question {{questionNo}}</ng-template>
        <ng-template comp></ng-template>
    </mat-step>
    `,
    styleUrls: ["../live.component.scss"]
})
export class CompComponent {
    @Input() questionNo: number;
    @Input() component: Comp;
    @ViewChild(CompDirective) comphost: CompDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    loadComponent() {
        let factory = this.componentFactoryResolver.resolveComponentFactory((<any>window)["MultipleChoiceComponent"]);
        
        let viewContainerRef = this.comphost.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(factory);
        (<Component>componentRef.instance)["data"] = this.component;
    }
}
import { Component, Type } from '@angular/core';

const registry = new Map<string, any>();

export function getComponent (name: string) : any {
    return registry.get(name);
}

export function register (name: string) {
    return function(comp: any) {
        registry.set(name, comp);
    }
}
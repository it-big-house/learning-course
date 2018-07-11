import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'brickTime' })
export class BrickTimePipe implements PipeTransform {
    transform(value: number): Date {
        switch(value) {
            case 1: return new Date(1200000);
            case 2: return new Date(2400000);
            case 3: return new Date(3600000);
            default: return new Date(0);
        }
    }
}
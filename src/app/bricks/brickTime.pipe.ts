import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'brickTime' })
export class BrickTimePipe implements PipeTransform {
    transform(value: number): number {
        switch(value) {
            case 1: return 20;
            case 2: return 40;
            case 3: return 60;
            default: return 0;
        }
    }
}
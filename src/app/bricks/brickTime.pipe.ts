import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'brickTime' })
export class BrickTimePipe implements PipeTransform {
    transform(value: number, type: string): Date {
        switch(type) {
            case "intro": switch(value) {
                case 1: return new Date(300000);
                case 2: return new Date(600000);
                case 3: return new Date(900000);
                default: return new Date(0);
            }
            case "live": switch(value) {
                case 1: return new Date(500000);
                case 2: return new Date(1000000);
                case 3: return new Date(1500000);
                default: return new Date(0);
            }
            case "summary": switch(value) {
                case 1: return new Date(200000);
                case 2: return new Date(400000);
                case 3: return new Date(600000);
                default: return new Date(0);
            }
            case "review": switch(value) {
                case 1: return new Date(200000);
                case 2: return new Date(400000);
                case 3: return new Date(600000);
                default: return new Date(0);
            } default: switch(value) {
                case 1: return new Date(1200000);
                case 2: return new Date(2400000);
                case 3: return new Date(3600000);
                default: return new Date(0);
            }
        }
    }
}

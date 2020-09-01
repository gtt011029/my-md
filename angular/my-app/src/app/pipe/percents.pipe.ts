import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percents'
})
export class PercentsPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return `${value}%`;
  }

}

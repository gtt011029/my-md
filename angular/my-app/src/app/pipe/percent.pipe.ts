import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percent'
})
export class PercentPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    console.log(args); // 这边是一个数组，所有的参数都存放在这里面
    return `${value * 100}%`;
  }

}

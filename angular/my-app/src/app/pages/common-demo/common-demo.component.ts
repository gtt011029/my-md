import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/shared/logger.service';

function getUser<T, U>(a: U) {
  return new Array<T>();
}

// function fn1(x: number, y: number): number;
// function fn1(x: string, y: string): string;

@Component({
  selector: 'app-common-demo',
  templateUrl: './common-demo.component.html',
  styleUrls: ['./common-demo.component.css'],
  // providers: [LoggerService]
})
export class CommonDemoComponent implements OnInit {

  constructor(private loggerService: LoggerService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.letcode([2,8,7,11,15], 9);
    const arr = getUser<{id: number, name: string}, string>('1');
    console.log(arr);
    this.loggerService.getLogger();
    this.router.queryParamMap.subscribe((resp) => {
      console.log(resp);
    });
    this.router.params.subscribe((resp) => {
      console.log(resp);
    });
    this.test();
    this.fn1(1, '1');
  }

  letcode(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length -1 ; i++) {
      for (let j = i+1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
          return [i, j];
        }
      }
    }
  }

  fn() {
    return 'heh';
  }

  test() {
    this.fn.prototype.nametest = 'xixi';
    console.log(this.fn);
  }

  fn1(x: any, y: any): any {
    return x + y;
  }

}

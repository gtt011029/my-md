import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {
  public observableNumberValue = 0;

  constructor() { }

  ngOnInit() {
    // this.testObservable();
  }
  testObservable() {
    const testObservableFn = new Observable((observer) => {
      setTimeout(() => {
        if (this.observableNumberValue === 10) {
          observer.error('error msg');
        }
        observer.next(this.observableNumberValue);
      }, 1000);
      return {
        unsubscribe() {
          console.log('return unsubscribe 取消订阅');
        }
      };
    });
    testObservableFn.subscribe((resp) => {
      console.log(resp);
    }, (error) => {
      console.log(error, '');
    });
  }
  testObservable2() {
    const sequence = new Observable((observer) => {
      let value = 0;
      setTimeout(() => {
        value = 100;
        observer.next(value);
      }, 1000);
      observer.next(2);
      observer.next(3);
      // 这边如果放在异步的外面会直接显示完成取消订阅，例如这边如果加上的话，定时器中的100不会打印
      observer.complete();
      return {
        unsubscribe() {
          console.log('取消订阅');
        }
      };
    });
    sequence.subscribe((resp) => {
      console.log('next返回的东西： ', resp);
    }, () => {
      console.log('第二个函数，返回error的msg');
    }, () => {
      console.log('第三个函数：这边是执行处理完毕的通知');
    });
  }
}

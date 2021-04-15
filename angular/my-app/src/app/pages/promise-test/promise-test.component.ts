import { Component, OnInit } from '@angular/core';

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class PromiseCustom {
  private status = PENDING;
  private value = undefined;
  private reason = undefined;

  constructor(executor) {

    // 调用此方法就是成功
    const resolve = (value) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if (this.status ===  PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    };

    // 调用此方法就是失败
    const reject = (reason) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if (this.status ===  PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }
    };

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者
      executor(resolve, reject);
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error);
    }
  }

  // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }

    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}

class PromiseTry {
  private status = undefined;
  private value = undefined;
  private onResolvedCallbacks = []; // 存放成功的回调，这边把他给存起来了，留给
  private onRejectedCallbacks = []; // 存放失败的回调

  constructor(executor) {
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        console.log(this.onResolvedCallbacks);
        this.onResolvedCallbacks.forEach((fn) => {
          fn();
        });

      }

    };
    const reject  = (value) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.value = value;
        this.onRejectedCallbacks.forEach((fn) => {
          fn();
        });
      }

    };
    try {
      this.status = PENDING;
      executor(resolve, reject);
    } catch (e) {
      this.status = REJECTED;
      reject(e);
    }
  }

  then(thenResolve, thenReject = null) {
    if (this.status === FULFILLED) {
      thenResolve(this.value);
    }
    if (this.status === REJECTED) {
      thenReject(this.value);
    }
    if (this.status === PENDING) {
      console.log(thenResolve);
      this.onResolvedCallbacks.push(() => { thenResolve(this.value); });
      this.onRejectedCallbacks.push(() => { thenReject(this.value); });
    }
  }
}

@Component({
  selector: 'app-promise-test',
  templateUrl: './promise-test.component.html',
  styleUrls: ['./promise-test.component.css']
})
export class PromiseTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.promiseTest().then((data) => {
    //   console.log(data);
    // }, (err) => {
    //   console.log('错误的数据是输出不出来的吗----原来resolve和reject只有一个可以执行');
    //   console.log(err);
    // });



    this.promiseTry(true).then((value) => {
      console.log(value);
    });
  }
  private promiseTest(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('现在是在promise里面');
      // resolve('哇哦，这边是成功的输出哦');
      reject('这边是失败的输出');
    });
  }

  private promiseTry(state: boolean) {
    return new PromiseTry((resolve, reject) => {
      console.log('开始测试手写promise');
      setTimeout(() => {
        console.log('定时器开始启动');
        if (state) {
           resolve('这边是传给resolve的数据');
        } else {
           reject('这边是传给reject的数据');
        }
      }, 3000);
    });
  }

}

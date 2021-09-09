interface IU {
    (x: number): number;
    uname: string;
}

function fn1(x: number, y: number): number;
function fn1(x: string, y: string): string;

function fn1(x: any, y: any): any {
    return x + y;
}

function testFn(x: number) {
    return x * 10;
  }

testFn.uname = 'hahah';

function f(callback: IU) {
    return 'haha';
}

f(testFn);

fn1(1, 1);

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {  // 这边处理控制器委托的更复杂的任务
    return 'Hello World!hahhaa';
  }
}

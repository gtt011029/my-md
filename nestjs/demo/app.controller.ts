// 带有单个路由的基本控制器示例
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // 装饰器，这边就相当于路由，这边使用路由前缀可以轻松的对一组路由进行分组，并最大程度地减少重复代码
export class AppController {
  constructor(private readonly appService: AppService) {}  // 通过构造器，注入依赖关系

  @Get()  // 请求装饰器：http请求方法装饰器，告诉nest为Http请求的特定端点创建处理程序（请求方法）
  getHello(): string {
    return this.appService.getHello();
  }
}

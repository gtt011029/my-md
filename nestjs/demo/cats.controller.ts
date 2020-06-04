import { Controller, Get, Req, Post, HttpCode, Header, Param, Body } from '@nestjs/common'
// import { Request } from 'express'
import { CreateCatDto } from "./create-cat.dto";
import { CatsService  } from './cats.service'
import { Cat } from './interfaces/cat.interface';

@Controller('cat')  //这个地方对应的是路由前缀
export class CatsController {
  constructor(private readonly catsService: CatsService) {}


  // @Get()
  // findAll(@Req() request: Request): string {
  //   // console.log(request)  //这边就可以知道客户端请求的所有细节
  //   return `This action returns all cats`
  // }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll()
  }


  @Get(':id')
  findOne(@Param('id') id: number): string {
    return this.catsService.findOne(id)
  }

  // @Post()
  // @HttpCode(204)  // 改变状态码
  // @Header('Cache-Control', 'none')  // 自定义响应头
  // create(): string {
  //   console.log('hHh')
  //   return 'add a cat'
  // }

  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    console.log(createCatDto)
    return 'add a cat'
  }

}

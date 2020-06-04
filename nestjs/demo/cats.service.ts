import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  findOne(id) {
    return `this is ${id} cat`
  }
  findAll(): Cat[] {
    return [
      {
        name: 'afaf',
        age: 18,
        breed: 'haha'
      },
      {
        name: 'afaf',
        age: 19,
        breed: 'haha'
      },
      {
        name: 'afaf',
        age: 10,
        breed: 'haha'
      }
    ]
  }
}
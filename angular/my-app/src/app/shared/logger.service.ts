import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  getLogger() {
    console.log('logger 依赖');
  }
}

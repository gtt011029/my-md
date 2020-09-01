import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-first-child',
  templateUrl: './first-child.component.html',
  styleUrls: ['./first-child.component.scss']
})
export class FirstChildComponent implements OnInit, AfterViewInit {
  @Input() param: object[]; // 接收父组件传来的数据
  @Output() ok = new EventEmitter<string>(); // 接收父组件传来的方法，通过function.emit调用

  constructor() { }

  ngOnInit() {
    console.log(this.param);
  }
  ngAfterViewInit() {
    // console.log(this.param);
  }

}

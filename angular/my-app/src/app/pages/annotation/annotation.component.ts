import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate, transition, query
} from '@angular/animations';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-100px)'
        })
      ])
    ]),
    trigger('openClose', [
      state('open', style({
        height: '500px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      state('duration', style({
        height: '300px',
        opacity: 0.8,
        backgroundColor: 'pink'
      })),
      transition('open <=> closed, open <=> duration, closed <=> duration', [
        animate('1s 0.1s ease-in-out', )
      ])
    ])
  ] // 添加动画的元数据属性，可以把用来定义动画的触发器放进animation元数据属性中
  // 这边是两个状态之间添加简单的转场动画。
  // transition 的 stateChangeExpr竟然是有作用的，表示是由哪个状态到哪个状态过渡时的动画
})
export class AnnotationComponent implements OnInit {
  public isOPen = true;
  public state = 'open';

  constructor() { }

  ngOnInit() {
  }
  toggle() {
    console.log(this.state);
  }

}

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html',
  styleUrls: ['./view-child.component.css']
})
export class ViewChildComponent implements OnInit, AfterViewInit {
  @ViewChild('myViewChild', {static: true}) myViewChildRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log(this.myViewChildRef); // 这边就可以拿到当前的dom元素
  }

}

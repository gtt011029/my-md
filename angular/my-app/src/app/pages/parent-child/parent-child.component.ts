import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-child',
  templateUrl: './parent-child.component.html',
  styleUrls: ['./parent-child.component.scss']
})
export class ParentChildComponent implements OnInit {
  public data: object[];
  public list = ['haha', 'hehehe', 'hohoho', 'xixixixi'];

  constructor() { }

  ngOnInit() {
    this.data = [{
        name: 'tina',
        age: 18
      }, {
        name: 'kent',
        age: 20
      }];
  }
  childOk(child) {
    console.log(child);
  }
}

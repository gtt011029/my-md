import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-parent-child',
  templateUrl: './parent-child.component.html',
  styleUrls: ['./parent-child.component.scss']
})
export class ParentChildComponent implements OnInit {
  public data: object[];
  public list = ['haha', 'hehehe', 'hohoho', 'xixixixi'];

  constructor(private router: Router) { }

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
  intoCommonDemoPage() {
    this.router.navigate(['/commonDemo'], {queryParams:  {name: 'haha'}});
  }
}

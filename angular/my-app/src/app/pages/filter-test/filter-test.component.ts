import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-test',
  templateUrl: './filter-test.component.html',
  styleUrls: ['./filter-test.component.css']
})
export class FilterTestComponent implements OnInit {
  public arr = [{
    name: 'aa'
  },
  {
    name: 'bb',
    children: [
      {
        name: '11'
      },
      {
        name: '22'
      }
    ]
  }, {
    name: 'cc',
    children: [
      {
        name: '11',
      },
      {
        name: '22'
      },
      {
        name: '33'
      }
    ]
  }, {
    name: 'dd'
  }, {
    name: 'ee',
    children: [{
      name: '1'
    }]
  }];

  public selected = ['cc-22', 'aa', 'ee-1'];

  constructor() { }

  ngOnInit() {

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/shared/logger.service';

@Component({
  selector: 'app-common-demo',
  templateUrl: './common-demo.component.html',
  styleUrls: ['./common-demo.component.css'],
  // providers: [LoggerService]
})
export class CommonDemoComponent implements OnInit {

  constructor(private loggerService: LoggerService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.loggerService.getLogger();
    this.router.queryParamMap.subscribe((resp) => {
      console.log(resp);
    });
    this.router.params.subscribe((resp) => {
      console.log(resp);
    });
  }

}

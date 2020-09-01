import { Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {AdDirective} from '../../directive/ad.directive';
interface AdItem {
  hh: string;
}

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.css']
})

export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: any;
  currentAdindex = -1;
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  interval: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  loadComponent() {
    this.currentAdindex = (this.currentAdindex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdindex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
  }
  getAds() {}

}

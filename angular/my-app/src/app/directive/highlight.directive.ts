import { Directive, ElementRef, Input, HostListener } from '@angular/core';
// 响应用户引发的事件

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() highlightColor: string;

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.setHighlightColor(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setHighlightColor(null);
  }

  setHighlightColor(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

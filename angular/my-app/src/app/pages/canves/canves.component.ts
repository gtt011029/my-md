import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canves',
  templateUrl: './canves.component.html',
  styleUrls: ['./canves.component.css']
})
export class CanvesComponent implements OnInit, AfterViewInit {
  private myCanvas: any;
  public ctx: any ;
  @ViewChild('imageCanvas', {static: true}) private imageCanvasRef: ElementRef;

  constructor() { }

  ngOnInit() {
    this.myCanvas = document.getElementById('canvas');
    this.myCanvas = this.imageCanvasRef.nativeElement as HTMLCanvasElement;
    this.ctx = this.myCanvas.getContext('2d');
    const imgData = {
      width: 640,
      height: 360,
      src: ''};
    this.ctx.drawImage(imgData, 0, 0);
    // const ctx = this.myCanvas.getContext('2d');
    // this.ctx.lineWidth = 3;
    // this.ctx.beginPath();
    // this.ctx.moveTo(25, 25);
    // this.ctx.lineTo(105, 25);
    // this.ctx.lineTo(25, 105);
    // this.ctx.lineTo(200, 200);
    // this.ctx.closePath();
    // this.ctx.stroke();
    //
    // this.ctx.beginPath();
    // this.ctx.arc(300, 300, 50, 0, 180, false);
    // this.ctx.stroke();
    // // this.ctx.fill();
    // // this.ctx.fillRect(10, 10, 300, 200);
    // this.ctx.beginPath();
    // this.ctx.arcTo(100, 100, 200, 200, 100); // 这里为什么不行，很奇怪
    // this.ctx.stroke();
  }
  ngAfterViewInit() {
    this.myCanvas = document.getElementById('canvas');
    this.myCanvas = this.imageCanvasRef.nativeElement as HTMLCanvasElement;
  }

  onMousedown(event) {
    this.ctx.scale(2, 2);
    console.log('down');
    // console.log(event);
  }
  onMousemove(event) {
    // console.log(event);
  }
  onMouseup(event) {
    // console.log(event);
  }

}

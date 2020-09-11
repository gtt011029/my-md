import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canves',
  templateUrl: './canves.component.html',
  styleUrls: ['./canves.component.css']
})
export class CanvesComponent implements OnInit, AfterViewInit {
  public drawCtx: CanvasRenderingContext2D;
  @ViewChild('drawCanvas', {static: true}) private drawCanvasRef: ElementRef;
  private drawingCanvas: HTMLCanvasElement;
  public cpx: number;
  public cpy: number;

  constructor() { }

  ngOnInit() {
    // this.myCanvas = document.getElementById('canvas');
    // this.myCanvas = this.imageCanvasRef.nativeElement as HTMLCanvasElement;
    // this.ctx = this.myCanvas.getContext('2d');
    // const imgData = {
    //   width: 640,
    //   height: 360,
    //   src: ''};
    // this.ctx.drawImage(imgData, 0, 0);
  }
  ngAfterViewInit() {
    this.drawingCanvas = this.drawCanvasRef.nativeElement as HTMLCanvasElement;
    this.drawCtx = this.drawingCanvas.getContext('2d');
    // this.drawCtx.fillRect(10, 10, 200, 200); // 画填充的不需要stoke，画框的话需要
    // this.drawCtx.rect(200, 200, 100, 100);
    // this.drawCtx.stroke();
    // this.drawCtx.strokeRect(300, 0, 300, 300); // 这条指令是直接画rect
    // this.drawCtx.beginPath();
    // this.drawCtx.moveTo(100, 200);
    // this.drawCtx.lineTo(800, 500);
    // this.drawCtx.stroke();
    // this.drawCtx.beginPath();
    // this.drawCtx.arc(200, 200, 100, 0, 360, false);
    // this.drawCtx.arcTo(800, 500, 800, 10, 300);
    // // this.drawCtx.fill();
    // this.drawCtx.stroke();
    this.drawChart();
  }
  onMouseMove($event) {
    this.drawCtx.clearRect(0, 0, 1000, 1000);
    this.cpx = $event.x;
    this.cpy = $event.y;
    this.drawChart(this.cpx, this.cpy);
    // this.drawBezier(this.cpx, this.cpy);
  }
  onMouseUp($event) {
    console.log({mouseUp: [this.cpx, this.cpy]});
  }
  // 二次贝塞尔曲线
  drawChart(cpx = null, cpy = null) {
    this.drawCtx.beginPath();
    this.drawCtx.moveTo(75, 25);
    this.drawCtx.quadraticCurveTo(25, 25, 25, 62.5);
    this.drawCtx.quadraticCurveTo(25, 100, 50, 100);
    this.drawCtx.quadraticCurveTo(50, 120, 30, 125);
    this.drawCtx.quadraticCurveTo(60, 120, 65, 100);
    this.drawCtx.quadraticCurveTo(125, 100, 125, 62.5);
    this.drawCtx.quadraticCurveTo(125, 25, 75, 25);
    this.drawCtx.stroke();

    this.drawCtx.beginPath();
    this.drawCtx.moveTo(500, 450);
    this.drawCtx.quadraticCurveTo(520, 385, 600, 400);
    this.drawCtx.quadraticCurveTo(640, 420, 640, 450);
    this.drawCtx.quadraticCurveTo(640, 500, 550, 500);
    this.drawCtx.quadraticCurveTo(540, 530, 500, 550);
    this.drawCtx.quadraticCurveTo(530, 526, 520, 500);
    this.drawCtx.quadraticCurveTo(488, 489, 500, 450);
    this.drawCtx.stroke();

    this.drawCtx.beginPath();
    this.drawCtx.moveTo(200, 400);
    this.drawCtx.quadraticCurveTo(14, 155, 200, 200);
    this.drawCtx.quadraticCurveTo(384, 133, 200, 400);
    this.drawCtx.stroke();
  }
  // drawBezier(cp1x, cp1y) {
  //   this.drawCtx.beginPath();
  //   this.drawCtx.moveTo(200, 400);
  //   this.drawCtx.bezierCurveTo(cp1x, cp1y,00, 200);
  // }

}

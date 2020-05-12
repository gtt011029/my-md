class Point {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x,
    this.y = y
  }
}
interface PointInstanceType {
  x: number;
  y: number
}
//interface Point3d extends PointInstanceType
interface Point3d extends Point {
  z: number
}

let point3d: Point3d = {x:1, y: 2, z: 3}
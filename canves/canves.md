简介：

canves是一个可以使用脚本（通常为js）来绘制图形的HTML元素，它可以用来绘制图表、制作图片或者制作简单的动画

其只有两个属性，width、height

```ts
var canves = document.getElementById('mydiv')
var ctx = canves.getContext('2d') // 这个方法是用来获得渲染上下文和它的绘画功能

fillRect(x, y, width, height)  //绘制一个填充的边框 ps：矩形：Rectangle
stokeRect(x, y, width, height) // 绘制一个矩形的边框
clearRect(x, y, width, height) // 清楚制定矩形区域，让清除部分完全透明
ctx.fillStyle = '' // ''中填写css样式

绘制路径：
beginPath() // 新建一条路径
closePath() // 闭合路径
stroke() // 绘制已定义的路径。
fill() // 过填充当前路径
clip() //从原始画布剪切任意形状和尺寸的区域


moveTo(x, y)// 移动笔触
lineTo(x, y) // 绘制一条从当前位置到指定x以及y位置的直线。



drawImage(img, 10, 10) //在画布上绘制图片


// 圆弧arc
arc(x, y, radius, startAngle, endAngle, anticlockwise?: boolean)
// 详解：（x, y）圆心  startAngle：起始角（3点钟方向为0度）endAngle：结束角 anticlockwise: 规定是顺时针绘图还是逆时针绘图（true 为逆时针，false为顺时针）

arcTo(x1, y1, x2, y2, r);// 画弧线


isPointInPath(x, y) // 判断当前路径中是否包含监测点
// x：测试的x轴坐标，y：测试的y轴坐标


```

转换

```typescript
scale(scalewidth, scaleheight) // 缩放当前绘图至更大或更小 
```



## Path2D对象

Path2D 类提供一个表示任意几何形状路径的简单而又灵活的形状。

Path2D() 会返回一个新初始化的Path2D对象（可能将某一个路径作为变量——创建一个它的副本，或者将一个包含SVG path数据的字符串作为变量）

```ts
new Path2D();     // 空的Path对象
new Path2D(path); // 克隆Path对象
new Path2D(d);    // 从SVG建立Path对象
```

[所有的路径方法都可以在Path2D中使用。]()

```ts
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
  }
}
```









## canves bug

https://github.com/remaxjs/remax/issues/310
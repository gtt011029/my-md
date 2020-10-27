链接：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API

简介：

canves是一个可以使用脚本（通常为js）来绘制图形的HTML元素，它可以用来绘制图表、制作图片或者制作简单的动画

其只有两个属性，width、height

canvas 创造了一个固定大小的画布，公开了一个或多个渲染上下文（这边注意，画布的大小是固定的，渲染上下文可以为多个）

stoke: 画

绘制路径：路径是图形的基本元素，一个路径甚至一个子路径都是闭合的。使用路径绘制图形需要一些额外的步骤

步骤：

1、创建路径的起始点（beginPath）新建一条路径，生成之后，指向当前路径

2、使用画图命令去画出命令

3、把路径封闭  （closePath）闭合路径之后，重新指向上下文中

4、当路径生成时，就可以通过描边或者填充区域来渲染图形。（stroke）绘制图形轮廓， （fill）填充图形



```ts
var canves = document.getElementById('mydiv')
var ctx = canves.getContext('2d') // 用来获得渲染上下文和它的绘画功能

// 基本命令：
fillRect(x, y, width, height)  //绘制一个填充的边框 ps：矩形：Rectangle，注意这边是填充
stokeRect(x, y, width, height) // 绘制一个矩形的边框
clearRect(x, y, width, height) //清除指定矩形区域，让清除部分完全透明，一般情况的下清除，都用这个
ctx.fillStyle = '' // ''中填写css样式

绘制路径：
beginPath() // 新建一条路径
closePath() // 闭合路径
stroke() // 绘制已定义的路径。
fill() // 过填充当前路径
clip() //从原始画布剪切任意形状和尺寸的区域


moveTo(x, y)// 移动笔触：将笔触移动到制定x，y坐标上，基本山每次beginPath后就需要执行moveTo进行定点
lineTo(x, y) // 绘制一条从当前位置到指定x以及y位置的直线。



drawImage(img, 10, 10) //在画布上绘制图片


// 圆弧arc
arc(x, y, radius, startAngle, endAngle, anticlockwise?: boolean)
// 详解：（x, y）圆心  startAngle：起始角（3点钟方向为0度）endAngle：结束角 anticlockwise: 规定是顺时针绘图还是逆时针绘图（true 为逆时针，false为顺时针）

arcTo(x1, y1, x2, y2, r);// 画扇形


isPointInPath(x, y) // 判断当前路径中是否包含监测点
// x：测试的x轴坐标，y：测试的y轴坐标


```

二次贝塞尔曲线及三次贝塞尔曲线

```ts
quadraticCurveTo(cp1x, cp2y, x, y)  // cp1x, cp1y为控制点， x，y为结束点

// 绘制三次贝塞尔曲线，cp1x, cp1y为控制点一；cp2x，cp2y为控制点二；x，y为结束点
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x y) 

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
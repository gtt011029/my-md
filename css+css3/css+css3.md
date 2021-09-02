## css3汇总

### 五大浏览器：

谷歌：webkit内核，前缀为-webkit 也叫谷歌内核，chrome浏览器最先开发使用

safari：webkit内核

欧盟（opera）：presto内核，前缀 -o-

火狐： Gecko内核 前缀为-moz- 

IE: Trident 前缀为-ms- 也成为ie内核



### border-radus 圆角

```css
div {
    border: 1px solid blue;
	border-radius: 20px 30px 40px 50px;
}
```



### shadow 盒子阴影

box-shadow 

text-shadow

```css
div {
	text-shadow： 10px 40px 3px red, 2px 3px 3px yellow, 5px 6px 7px bule;
    box-shadow： 2px 4px 20px red; // x y 外延值 颜色（不给默认黑色）
    box-shadow： 2px 4px inset red; // x y 外延值 颜色（不给默认黑色）内置阴影
}  // 10px 为x轴的位置  40px为Y  3px为模糊度    可加多个阴影
```



### gradients渐变

线性渐变 linear Gradients

径向渐变 Radial Gradients

```css
div {
	 background: linear-gradient( to top, red , yellow);
     background: linear-gradient( 0deg, red , yellow);
     background: linear-gradient( to left bottom, red , yellow);
     background: linear-gradient( to left bottom, red 30%, yellow 70%);
    
    
    
    
    
     background: radial-gradient(center, red, yellow);
     background: radial-gradient( circle, red 60%, blue);
     background: radial-gradient( at 20% 20%, red, blue); // 左上角
}
// linear-gradient( 方向 , color1, color2, ...) 方向默认向下，可自定义 to top, to left, to right, 

// radial-gradient( center, shape, size, color1, color2, ...)
// shape 取值（circle， ellipse(默认值)）
// size： 最近边 closest-side
// 最远边：farthest-side
// 最近角：closest-corner
// 最远角： farthest-corner
```





### Transform转换

transform属性使用函数来定义的，2D函数包括了translate() , scale(), rotate(), skew()

transition： all 1s；

```css
div:hover {
    transform: translate(20px, 30px); // x y
    
    transform: rotate(30deg); // 旋转
    
    transform: scale(1.2); // 缩放
    transform: scale(1.2, 0.9); // 缩放
    
    transform: skew(30deg, 45deg); //根据水平轴和垂直轴翻转  倾斜
}  


// transform: 函数名（key， value）
```



3D属性：比2d属性多了一个z轴， z轴指向里面

translate3d

scale3d

rotate3d

```css
backface-visibility: hidden;   // 反转到背面隐藏
```

```css
// perspective 透视（呈现伪3D效果）近大远小   给父亲加的
#transform3d {
      width: 200px;
      height: 200px;
      background-color: pink;
      perspective: 40px;  //眼睛在正前方40px处看图形
    }
    #transform3d>div {
      width: 100%;
      height: 100%;
      background-color: blue;
      transform: translate3d(100px, 300px, -400px);
    }
```





### transition过渡

css属性值在一段时间内平滑的过渡

过渡属性：transition-property： all|none|property

过渡时间： transition-duration:   xx s / xx ms

过渡函数: transition-timming-function: ease| linear|ease-in |ease-out | ease-in-out

过渡延迟时间:transition-delay:  s| ms





### animation动画

可以制作类似flash动画

通过关键帧控制动画的每一步，使元素从一种样式转换为另一种样式，产生复杂的动画

animation-names|ms

animation-durantion： s|ms

animation-timiing-function

animation-delay： s|ms

animation-iteration-count: 播放次数  infinite无限播放

animation-direction： mormal|alertnate 动画播放方向

animation-fill-mode： forwards； 动画停在最后一帧

animation-play-state： paused| running ；规定动画正在运行还是暂停，默认运行

```css
div {
      animation: myName 10s ease infinite 1s;

    }
    @keyframes myName {
      20% {
        margin-left: -2100px;
      }
      40% {
        margin-left: -4200px;
      }
      60% {
        margin-left: -6300px;
      }
      80% {
        margin-left: -8400px;
      }
      100% {
        margin-left: -10500px;
      }
    }








@keyframes myName {
      from {
        margin-left: -2100px;
      }
      40% {
        margin-left: -4200px;
      }
      60% {
        margin-left: -6300px;
      }
      80% {
        margin-left: -8400px;
      }
      to {
        margin-left: -10500px;
      }
    }
  </style>
```





## scss特性

css的预处理语言

scss是sass3.0引入的语法，可以理解为是一个升级的版本



### 特点：

1.import 其他的css scss文件

2.继承

```scss
.container {
	padding:0;
}

.myText {
	@extend .container;
    font-size: 1rem;
}
```



3.Scss 占位符 %

没有被继承就不会被编译

```
%m5 {
	background-color: 3px;
}
.p1 {
	@extend %m5;
}
```





4. @mixin   写一些公用的css ，别人就可以@include 这些样式

   

5. 可嵌套

6. 可定义一些变量

   1. ```scss
      $no-0: 0;
      $no-0p4: 0.4rem;
      $no-0p7: 0.7rem;
      $no-1: 1rem;
      $no-2: 1.2rem;
      $no-3: 1.5rem;
      $no-4: 2rem;
      $no-5: 3rem;
      ```

      
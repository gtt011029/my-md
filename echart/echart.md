基本步骤就是（使用方法）：

1、准备一个容器装表格

2、this.chart = echarts.init(this.$el.querySelector('.metric-chart')) echart初始化绑定这个容器，初始化一个echart实例

3、指定图表的配置项和数据（option配置）

```
var option = {
            title: {
                text: 'ECharts 入门示例'    // title
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {    // x轴的数据
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},   // y轴的数据
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

```

4、用setOption方法生成一个简单的柱状图  //  chart.setOption(option, true)



Echarts提供了丰富的自定义配置选项，并且能够从全局、系列、数据三个层次去设置数据图形的样式。





## type		（ echarts类型）

1、 ‘bar’：柱状图

2、‘pie’：饼图





## roseType		（是否展示成南丁格尔图）

是否展示成南丁格尔图（玫瑰类型，不觉得南丁格尔图很像玫瑰吗）：会通过半径表示数据的大小







## itemStyle		（用来配置一些通用的样式）

echarts中有一些通用样式，诸如阴影、透明度、颜色、边框颜色、边框宽度等，这些样式一般都会在==系列==的itemStyle里设置（这边也可以给每个data都设置）

```
itemStyle: {
    // 阴影的大小
    shadowBlur: 200,
    // 阴影水平方向上的偏移
    shadowOffsetX: 0,
    // 阴影垂直方向上的偏移
    shadowOffsetY: 0,
    // 阴影颜色
    shadowColor: 'rgba(0, 0, 0, 0.5)'
}
```

==注意：itemStyle的emphasis是鼠标hover时候的高亮样式==





##  backgroundColor         （背景色）

 背景色是全局的，所以直接在 option 下设置 backgroundColor 





## textStyle      （文本样式）

这边可以全局设置也可以每个系列设置

```
textStyle: {
            color: '#5E6978',
            fontFamily: 'PingFangSC-Regula',
            fontSize: '12'
          }
```

```
setOption({
    textStyle: {
        color: 'rgba(255, 255, 255, 0.3)'
    }
})
```





## label         （标签）

这个东西里面放着设置的标签的样式







## visualMap组件       （将数组大小映射到明暗度）

把数据的哪个维度映射到什么视觉元素上

```
visualMap: {
    // 不显示 visualMap 组件，只用于明暗度的映射
    show: false,
    // 映射的最小值为 80
    min: 80,
    // 映射的最大值为 600
    max: 600,
    inRange: {
        // 明暗度的范围是 0 到 1
        colorLightness: [0, 1]
    }
}
```







## 调色盘

 调色盘，可以在 option 中设置。它给定了一组颜色，图形、系列会自动从其中选择颜色。 可以设置全局的调色盘，也可以设置系列自己专属的调色盘。 

```
option = {
    // 全局调色盘。
    color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],

    series: [{
        type: 'bar',
        // 此系列自己的调色盘。
        color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
        ...
    }, {
        type: 'pie',
        // 此系列自己的调色盘。
        color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
        ...
    }]
}
```









## 异步数据加载和更新

很多时候数据需要在异步加载后填入

这边呢比较简单，就是在myChart.setOption(option, true)之前把数据准备好，塞进入就可以了



这边也可以分两步，先设置完其他的样式，显示一个空的直角坐标轴，然后获取数据填入







## loading      动画

```js
myChart.hideLoading();    // 放在setoption的前面，这是echarts自己的
myChart.setOption(...);
```







## 数据的动态更新

echarts 由数据驱动，数据的改变驱动图表展现的改变，因此动态数据的实现也变得异常简单

所有的数据更新都通过setoption实现，所以，这边就是定期的获取新的数据，塞进setOption中就行了





## 使用dataset管理数据









## echarts中的事件和行为

```
myChart.on('click', function (params) {
    // 控制台打印数据的名称
    console.log(params.name);
});
```

 ECharts 支持常规的鼠标事件类型，包括 `'click'`、`'dblclick'`、`'mousedown'`、`'mousemove'`、`'mouseup'`、`'mouseover'`、`'mouseout'`、`'globalout'`、`'contextmenu'` 事件。 

```
this.chart.on('mouseover', (params) => {
      if (params.componentType === 'xAxis') {
        let str = []
        str.push()
        self.nameValue = [params.value]
        self.top = parseInt(params.event.offsetY) + 10
        self.left = parseInt(params.event.offsetX) + 5
        self.showTooltip = true
      }
})
this.chart.on('mouseout', (params) => {
      if (params.componentType === 'xAxis') {
        self.showTooltip = false
      }
})
```







series   				（系列列表。每个系列通过type决定自己的图标类型）









# setOption配置项

## text

标题组件



## legend

图例组件（展示了不同系列的标记（symbol），颜色和名字，可以通过图例控制哪些系列不显示）

itemGap：图例每项之间的间隔

formatter：用来格式化图例文本，支持字符串模板和回调函数两种形式（就是改变legend的name展示）

selectedMode： 控制是否可以通过点击图例系列改变显示的状态（string，boolean）

 tooltip ：默认不显示，可以在legend文字很多的时候对文字做裁剪开启ToolTip







## grid  直角坐标系内绘图网格







## xAxis   x轴

boundaryGap：坐标轴两边留白，默认为true，当如果想要line类型的话，这边可以设为false



## tooltip提示框组件

类似于一种hover上去的显示，类似于div的title属性

1、可以写一个formatter函数（格式器函数），return你想要返回的数据

一般这个函数会传入一个params的参数，取这个参数里面的数据进行展示

2、trigger：触发类型

主要类型有：

‘item’：数据项目图形触发，主要在散点图、饼图、等无类目轴的图表中使用（默认）

‘axis’：坐标轴触发，主要在柱状图、折线图等会使用类目轴的图表中使用

‘none’：什么都不触发







## polar极坐标系



##  radiusAxis：极坐标系的径向轴



##  angleAxis： 极坐标系的角度轴

 **axisLine** ：坐标轴线相关设置（是不是显示或者隐藏啊，是不是要箭头啊，箭头的大小是多少啊）

 **axisTick** ：是否展示坐标轴刻度（间隔是多少啊，朝里朝外啊，颜色样式啊等等）

 **axisLabel** ： 是否展示坐标轴刻度标签的相关设置（间隔啊，朝里朝外啊，边距样式啊，内容格式器啊）





## serise[i]列表

系列列表，每个系列通过type决定自己的图表样式类型

这边呢可用于==直角坐标系==和==极坐标系==

### type类型

#### 1、line0(线形)  

1、symbol（点点的样式，默认原型、也可以是方形啊，自定义形状、用图片代替也行）

2、hoverAnimation：hover上去的动画，默认是开着的

3、stack堆叠效果

4、 smooth是否以平滑的效果显示，这边默认为false

5、 emphasis图形高亮的样式

#### 2、bar（条形）

1、barGap（不同系列的柱间距离，如果想要重叠的话（可以设置barGap：‘-100%’））

2、roundCap（是否在环形柱条两侧使用圆弧效果）（仅对极坐标系有效）

#### 3、pie（饼图）

主要用于变现不同类目的数据在总和中的占比。每个的弧度表示数据数量的比例

legendHoverLink：hover时联动高亮（默认为true）

hoverAnimation：hover时扇区放大（默认为true）

hoverOffset：高亮扇区偏移距离（默认10）

selectedMode：选中模式表示是否支持多个选中（默认关闭，支持string（single、multiple）、boolean）

selectedOffest：选中扇区的偏移距离（默认为10）

clockwise：饼图的扇区是顺时针排布（默认为true）

startAngle：起始角度（默认90）

minAngle：最小扇区角度（默认为0）

minShowLabelAngle：小于这个角度就不展示label（默认为0）

roseType：是否展示为南丁格尔图（默认为false）

markPoint

#### 4、scatter（散点图、气泡图）

可以应用在==直角坐标系==、==极坐标系==、==地理坐标系==

#### 5、effectScatter（带有涟漪特效的散点、气泡图）











## toolbox工具栏

导出图片、数据视图、动态类型切换、数据区域缩放、重置五个工具

1、orient 工具栏布局朝向（默认横着的（horizontal）（vertical竖着的））

2、itemSize（icon的大小）

3、itemGap（每个icon之间的间隔）

4、showTitle（hover时是否展示每个icon的标题。默认展示）

5、feature（obj各工具配置项）这里面也可以有自定义的工具，工具的名字要以my开头

5.1、saveAsImage（obj保存为图片，默认保存为png图片，这边也可以改type来设置图片的类型）

5.2、restore 配置项还原

5.3、dataView（数据视图工具，可以展示当前图表所用的数据，编辑后可以动态更新）

5.4、dataZoom（数据区域缩放，目前只支持直角坐标系的缩放）

5.5、magicType（动态类型切换）其中type的类型有（line、bar、stack堆叠模式、tiled平铺模式）

5.6、brush（选框组件的控制按钮）





##  **brush** （区域选择组件）

用户可以选择途中的一部分数据，从而便于向用户展示被选中数据，或者他们的一些统计计算结果

 目前 brush 组件支持的图表类型：scatter、bar、candlestick（parallel 本身自带刷选功能，但并非由 brush 组件来提供）。 






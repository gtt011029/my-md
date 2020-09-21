# ROS

https://blog.csdn.net/tennysonsky/article/details/45062079： 浅谈c/s b/s架构

## 简介：

https://www.ncnynl.com/archives/201608/501.html

https://zhuanlan.zhihu.com/p/21252651

https://www.ncnynl.com/archives/201709/2133.html

http://robotwebtools.org/jsdoc/roslibjs/current/Vector3.html

（Robot Operating System）机器人操作系统，是一个在计算机上对机器人进行操作的一个开源系统。

ROS系统通常由大量的**节点**组成，其中任何一个节点均可以通过**发布/订阅**的方式与其他节点进行通信。

例如：机器人上的一个位置传感器如雷达单元就可以作为ROS的一个节点，雷达单元可以以信息流的方式发布雷达获取的信息





## ROS通信（3种）：

1、单向消息发送 / 接收方式的话题（topic）；（异步单向，连续不断的发送数据）

2、双向消息请求 / 响应方式的服务（service）；（同步双向，需要对请求该出即使响应的情况， 一次性消费，响应完成时两个节点就会断开）

3、双向消息目标（goal）/ 结果（result） / 反馈（feedback）方式的动作（action）（异步双向，请求与响应之间需要太长的事件，所以难以使用服务的情况，或需要中途反馈值的情况）

节点使用的参数可以从外部进行修改

参数也可以看作一种消息通信。可以认为参数是**节点中使用的全局变量**，可以通过使用来自外部的写入功能来实时地改变设置值



![image-20200915164712354](/home/xyz/Documents/my-md/ROS/image/image-20200915164712354.png)

运行机制：

1、ROS主节点使用Roscore命令来运行，并使用XMLRPC运行服务器

2、主节点为了节点与节点的连接，会注册节点的名称、话题、服务、动作名称、消息类型、URI地址和端口，并在有请求时将此信息通知给其他节点

3、$roscore



a、订阅者节点使用rosrun、roslaunch命令来运行。订阅者节点在运行时向主节点注册订阅节点名称、话题名称、消息类型、URI地址和端口。主节点和节点使用XMLRPC进行通信

。。。。。

TCPROS连接：

订阅者节点使用TCPRos常见一个与发布者节点对应的客户端，并直接与发布者节点连接。节点间通信使用一种称为TCPROS的TCP/IP方式

![image-20200915172402906](/home/xyz/Documents/my-md/ROS/image/image-20200915172402906.png)









## interactive marker（互动标记物）

允许用户通过改变其位置或旋转，还可以点击它们或从分配给每个标记的上下文菜单中选择东西与之互动

包含着上下文菜单和几个控制（interactiveMarkerControl）

控制：定义了交互标记的不同的视觉部分，不同的视觉部分可以由多个常规标记物（visualization_msg/Marker）组成，并各自具有不同的功能

如果想要创建一个提供了互动标记的节点，需要实例化一个InteractiveMarkerServer对象。这对象会处理与客户端（通常RViz）的连接，并确保传输全部的更改，且用户在交互式标记物上执行的所有操作都会通知到应用程序

![image-20200915135301533](/home/xyz/Documents/my-md/ROS/image/ROS.png)





```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />

<script type="text/javascript" src="http://cdn.robotwebtools.org/threejs/current/three.min.js"></script>
<script type="text/javascript" src="http://cdn.robotwebtools.org/EventEmitter2/current/eventemitter2.min.js"></script>
<script type="text/javascript" src="http://cdn.robotwebtools.org/roslibjs/current/roslib.min.js"></script>
<script type="text/javascript" src="http://cdn.robotwebtools.org/ros3djs/current/ros3d.min.js"></script>

<script type="text/javascript" type="text/javascript">
  /**
   * Setup all visualization elements when the page is loaded.
   */
  function init() {
    // Connect to ROS.
    var ros = new ROSLIB.Ros({
      url : 'ws://localhost:9090'
    });

    // Create the main viewer.  // 创建ros3D view对象用于放置内容
    var viewer = new ROS3D.Viewer({
      divID : 'markers',
      width : 800,
      height : 600,
      antialias : true
    });

    // Setup a client to listen to TFs.  // 创建TFClient对象，订阅TF树的变换
    var tfClient = new ROSLIB.TFClient({
      ros : ros,
      angularThres : 0.01,
      transThres : 0.01,
      rate : 10.0,
      fixedFrame : '/rotating_frame'
    });

    // Setup the marker client.  // 实例化InteractiveMarkerClient，创建InteractiveMarkerClient 用于显示交互内容
      这里提供了上面创建的Ros节点对象、TF clent、要渲染到的查看器场景、摄影机的引用，以及要渲染的交互式编辑主题名称
    var imClient = new ROS3D.InteractiveMarkerClient({
      ros : ros,
      tfClient : tfClient,
      topic : '/basic_controls',
      camera : viewer.camera,
      rootObject : viewer.selectableObjects
    });
  }
</script>
</head>

<body onload="init()">
  <h1>Simple Marker Example</h1>
  <div id="markers"></div>
</body>
</html>
```













































## ROS与js的交互：

```typescript
// 连接ROS
var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

ros.on('connection', function() {  // 增加监听事件
    console.log('Connected to websocket server.');
});
ros.on('error', function(error) {
    console.log('Erroe connecting to websocket server: ', error)
});
ros.on('close', function () {
    console.log('Connecting to websocket server closed.')
});


// 发布一个话题
var cmdVel = new ROSLIB.Topic({
    ros: ros,
    name: '/cmd_vel',
    messageType: 'geometry_msga/Twist'
});

var twist = new ROSLIB.Message({   // 创建消息内容并发布
    linear: {
        x: 0.1,
        y: 0.2,
        z: 0.3
    },
    angular: {
        x: -0.1,
        y: -0.2,
        z: -0.3
    }
});
cmdVel.publish(twist)    // 发送一个话题


// 订阅一个话题
var listener = new ROSLIB.Topic({
    ros: ros,
    name: '/listener',
    messageType: 'std_msgs/String'
});

listener.subscribe(function(message) {
    console.log('Receved message on' + listener.name + ': ' + message.data);
    listener.unsubscribe(); // 取消订阅
})



// Calling a service

var addTwoIntsClient = new ROSLIB.Service({
    ros: ros,
    name: '/add_two_ints',
    serviceType: 'rospy_tutorials/AddTwoInts'
})

var request = new ROSLIB.ServiceRequest({
    a: 1,
    b: 2
});
addTwoIntsClient.callService(request, function(result) {
    // 这边得到请求的结果数据
    console.log('Result for service call on' + addTwoIntsClient.name + ': ' + result.sum);
})

// 获取和设置一个参数值
ros.getParam(function(params) {
    console.log(params);
})

var maxVelX = new ROSLIB.Param({
    ros: ros,
    name: 'max_vel_y'
});

maxVelX.set(0.8);  // 设置参数
maxVelX.get(function(value) {
    console.log('MAX VAL: ' value);
});
```



TF：TensorFlow（张量的流动），张量（tensor）即任意维度的数据，一维、二维、三维、四维等数据统称为张量

张量的流动是指：保持计算节点不变，让数据进行流动。这样的设计是针对连接式机器学习算法

连接式的机器学习算法可以把算法表达成一张图，张量从图中从前到后走一遍就完成了前向运算；而惨差从后往前走一遍就完成了后向传播

Tensor：可以看做一个数组，其实就是流图中的边，数据要流过，就需要适合这个‘边’



map：地图坐标，固定坐标系

odom： 机器人初始位置坐标，固定坐标系

base_link：机器人中心位置坐标

ps：一般认为有map、base_link就可以了，而从网上的各种资料来看，之所以加odom因为在机器人导航运行过程中会出现视觉定位偏差，里程计误差积累等等问题，当算法纠正这些偏差时，base_link会出现机器人中心位置在map坐标上不连续发生跳跃，而有了odom



查看任意两个坐标系之间的transform：

T2 = T(world) * T1;

当T1为map时，T2为base_link，这时的transform就是机器人在map上的坐标。即课可以看成以T1为坐标系，T2坐标系的坐标原点在T1坐标系上的位置。



### roslib编写actionlib客户端

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<script type="text/javascript" src="http://cdn.robotwebtools.org/EventEmitter2/current/eventemitter2.js"></script>
<script type="text/javascript" src="http://cdn.robotwebtools.org/roslibjs/current/roslib.js"></script>

<script type="text/javascript" type="text/javascript">
  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });

  var fibonacciClient = new ROSLIB.ActionClient({  // actionClient作为actionlib客户端，发送一个目标到actionlib服务器端并获取一个反馈
    ros : ros,
    serverName : '/fibonacci',
    actionName : 'actionlib_tutorials/FibonacciAction'
  });

  var goal = new ROSLIB.Goal({   // goal是一个actionlib目标，用于发送到actionlib服务器端
    actionClient : fibonacciClient,
    goalMessage : {
      order : 7
    }
  });

  goal.on('feedback', function(feedback) {   // 回调函数获取feedback和result信息
    console.log('Feedback: ' + feedback.sequence);
  });

  goal.on('result', function(result) {
    console.log('Final Result: ' + result.sequence);
  });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });

  goal.send();
</script>
</head>

<body>
  <h1>Fibonacci ActionClient Example</h1>
  <p>Check the Web Console for output</p>
</body>
</html>
```



### 在roslibjs中使用TF

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<script src="http://cdn.robotwebtools.org/EventEmitter2/current/eventemitter2.min.js"></script>
<script src="http://cdn.robotwebtools.org/roslibjs/current/roslib.min.js"></script>

<script type="text/javascript" type="text/javascript">
  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });

  var tfClient = new ROSLIB.TFClient({    // 利用TFClient对象订阅TF
    ros : ros,
    fixedFrame : 'world',
    angularThres : 0.01,
    transThres : 0.01
  });

  tfClient.subscribe('turtle1', function(tf) {    // 订阅坐标系world和turtle之间的转换
    console.log(tf);
  });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
</script>
</head>

<body>
  <h1>Simple TF Example</h1>
  <p>Check the JavaScript console for the output.</p>
</body>
</html>
```





### 利用Roslibjs数学运算

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<script type="text/javascript" src="http://cdn.robotwebtools.org/EventEmitter2/current/eventemitter2.js"></script>
<script type="text/javascript" src="http://cdn.robotwebtools.org/roslibjs/current/roslib.js"></script>

<script type="text/javascript" type="text/javascript">
  var v1 = new ROSLIB.Vector3({   // 创建3维的vector对象，并可进行不同函数的处理
    x : 1,
    y : 2,
    z : 3
  });
  var v2 = v1.clone();
  v1.add(v2);
  console.log(v1);

  var q1 = new ROSLIB.Quaternion({  // 创建Quaternion对象，并可进行不同函数的处理
    x : 0.1,
    y : 0.2,
    z : 0.3,
    w : 0.4
  });
  var q2 = q1.clone();
  q1.multiply(q2);
  q1.invert();
  console.log(q1);

  var p = new ROSLIB.Pose({
    position : v1,
    orientation : q1
  });
  console.log(p);

  var tf = new ROSLIB.Transform({
    translation : v2,
    rotation : q2
  });
  p.applyTransform(tf);
  console.log(p);
</script>
</head>

<body>
  <h1>Math Example with Roslibjs</h1>
  <p>Check the JavaScript console for the output.</p>
</body>
</html>
```


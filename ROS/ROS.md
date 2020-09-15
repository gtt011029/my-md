
ROS

### 简介：

https://www.ncnynl.com/archives/201608/501.html

https://zhuanlan.zhihu.com/p/21252651

（Robot Operating System）机器人操作系统，是一个在计算机上对机器人进行操作的一个开源系统。

ROS系统通常由大量的**节点**组成，其中任何一个节点均可以通过**发布/订阅**的方式与其他节点进行通信。

例如：机器人上的一个位置传感器如雷达单元就可以作为ROS的一个节点，雷达单元可以以信息流的方式发布雷达获取的信息





### ROS通信（3种）：

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









### interactive marker（互动标记物）

允许用户通过改变其位置或旋转，还可以点击它们或从分配给每个标记的上下文菜单中选择东西与之互动

包含着上下文菜单和几个控制（interactiveMarkerControl）

控制：定义了交互标记的不同的视觉部分，不同的视觉部分可以由多个常规标记物（visualization_msg/Marker）组成，并各自具有不同的功能

如果想要创建一个提供了互动标记的节点，需要实例化一个InteractiveMarkerServer对象。这对象会处理与客户端（通常RViz）的连接，并确保传输全部的更改，且用户在交互式标记物上执行的所有操作都会通知到应用程序

![image-20200915135301533](/home/xyz/Documents/my-md/ROS/image/ROS.png)

### ROS与js的交互：

```typescript
// 连接ROS
var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

ros.on('connection', function() {
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

var twist = new ROSLIB.Message({   // 这边是要发送的消息
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
```


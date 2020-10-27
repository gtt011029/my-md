四元数介绍：

旋转是三种坐标变换（缩放、旋转、平移），中最复杂的一种了，有一种旋转的方法叫做四元数，这边还有另外两种旋转的方法（矩阵旋转、欧拉旋转）

矩阵旋转：使用4*4大小的矩阵来表示任意轴旋转的变换矩阵

欧拉旋转：按照一定的坐标轴顺序（例如：先x，再y，最后z）、每个轴旋转一定的角度来变换坐标或向量，实际上是一系列坐标旋转的组合

四元数：本质上是一种高阶复数，是一个四维空间 ，虚部，x = a + bi + cj + dk

q = x + xi + yj + zk    =》 q = ((x,y,z),w) = (v,w)， 其中v是向量，w是实数





visor sensor 编译：catkin_make -DCATKIN_WHITELIST_PACKAGES="xyz_vision_sensor" 





'rosrun', 'xyz_vision_sensor', 'xyz_vision_sensor_node', '--noHikvision'







```python
# app_path = os.popen('readlink which $CODE_BASE/app').read().strip()
```





标注：训练模板





问题：切换到标注页面，标注相机的图片卡住报错

![image-20201015165041534](../xyz补充知识点/image/image-20201015165041534.png)



### 工业机器人的工作中心点：

机器人要完成指定的生产任务，就会在机械臂的末端固定一个工具，比如：焊枪、胶枪、夹具、吸盘等，但是这些工具的形状大小各不相同，就产生一个问题，如何选择一个点代表整个工具呢（机器人工具中心点）Tool Central Point 简写TCP。

初始状态的工具中心点是工具坐标系的原点。当我们以手动或编程的方式让机器人去接近空间的某一点时，其本质就是让工具中心点去接近该点。

机器人的工具一般可以分为两大类：夹具、枪类





### 摄像机标定：

我们平常的拍照，得到的只是一堆感兴趣的像素而已，怎么样才能把这些像素转化到显示世界的对象中呢？也就是说，究竟要怎样对这些仅存在于图像中的东西进行测量，才能得到具有实际意义的尺寸的数据呢。此为摄像机标定存在的意义。



首先：了解一下通过摄像机标定我们可以得到些什么：

1、外参数矩阵（告诉你现实世界点（世界坐标）是怎样经过旋转、平移，然后落到另一个现实世界点（摄像机坐标上））

2、内参数矩阵（告诉你上述那个点在1的基础上，是如何继续经过摄像机镜头、并通过针孔成像和电子转化而成为像素的）

3、畸变矩阵（告诉你为什么上面那个像素并没有落在理论计算该落在的位置上，还产生了一定的偏移和变形）



内参：

只由相机决定，不会因为外部环境而改变





```
rosparam set /vision_system_backend/ ''
rosparam get /vision_system_backend
```







```python
@socketio.on('error')
def test_error():
    print 'error'

@socketio.on_error()
def error_handler(e):
    print('error')
    print (e)


@socketio.on_error_default
def default_error_handler(e):
    print ('error default')
    print (e)
```


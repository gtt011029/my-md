1、print()：打印

可以接受多个字符串，遇到逗号会打印一个空格

2、input()：输入，如果想要用户从电脑上输入一些字符，python提供了一个input（），可以让用户输入字符串，并放到一个变量中

例如：>>>name = input()

‘hah’

\>>>name

'hah'

3、ord()：获取字符的整数表示

例：>>>ord('A')   65

4、chr()：把编码转化为对应的字符

例：>>>chr(25991) '文'

5、len()  数组的长度

命令行模式：在此模式下，可以执行python进入python交互模式，也可以执行python hello.py 运行一个.py文件

python交互模式

# **python语法**

语法比较简单，采用缩进的形式

a = 100

if a >= 0:

print(a)

else:

print(-a)

\#注释

其他每一行都是一个语句

当语句以冒号结尾时，缩进的语句视为代码块

# **数据类型**

五个标准的数据类型

Number、String、List、Tuple（元组）、Dictionary（字典）

```python
>>> type(11)
<type 'int'>
>>> type('aa')
<type 'str'>
>>> type(11.11)
<type 'float'>
>>> type([1])
<type 'list'>
>>> type({'key': 'value'})
<type 'dict'>
>>> 
```

字符串中如果包含‘’引号等，可以使用转义字符\，也可以使用r' '表示' '内部的字符串不转义

这边定义一个变量，不会给其加上类型，比如当前变量是整型还是浮点型；弱类型语言

格式化：%运算符就是用来格式化字符串的

%s 字符串替换 string

%d 整数替换  

%f 浮点             float

%x 16进制        x16

有几个%？占位符，后面就跟几个变量或者值，顺序对应好

## **List**

len() 数组的长度

append(‘hahha’) 尾部添加

inset(index, value) 插入

pop() 尾部删除    array.pop(index)

sort（）排序

```python
list = [1, 2, 3, 4]
print(list[1])
print(list[-1])    // 这边index可以为负  -1表示数组的最后一个元素
```



## **tuple**

元组：与array类似，不同之处，定义之后不可更改

```python
>>> classmates = ('Michael', 'Bob', 'Tracy')
```



## **dict  set**

dict：数据结构

dict:等同于 map，使用（key -value）存储

object.get('keyName', 'initvalue')：通过dict提供的get（）方法，如果key不存在，可以返回none，或者知己指定的initvalue

通过key获取当前字典制定数据时，如果key不存在就会报错

dict的一些方法：

```python
config.get('keyName') //查看当前dict中是否有指定key字段，如果没有返回none config.update('keyName': value) // 更新key字段，如果没有这个字段会自动加入 config.pop('keyName') //删除key
```

优缺点：

1、查找和插入的速度极快，不会随着key的增加而变慢

2、需要占用大量的内存，内存浪费多

set与dict类似，也是一组key的集合但是不存储value，key不重复，这边可以用于过滤

例：

s1 = set([1, 2, 3])

s1.add(4)

s1.remove(4)

s2 = set([2,6,7])

s1 & s2   交集

s1 | s2    并集

str

replace（‘newvalue’， ‘oldvalue’）

# **条件判断**

if    else

# **循环**

1、for item in itemList

2、while     break    continue

# **function**

define function  

def my_abs(x):

​    if x >= 0:

​        return x

​    else:

​        return -x

print(my_abs(90))

pass可以用来定义一个空函数

# **模块**

python本身内置了很多模块，只要import导入，就可以使用

模块中定义的变量的作用域问题：

有的函数和变量，若只希望在函数内部使用，可以通过_前缀来实现

__XXX__ 这样的变量是特殊变量，可以直接被引用，但是有特殊用途

# **面向对象编程：oop**

把对象作为程序的基本单元

面向对象的设计思想是从自然界中来的，因为在自然界中，类（class）、实例（instance）的概念是很自然的。

class是一种抽象概念，比如我们定义的class-student

实例（instance）是具体的

# **面向对象高级编程**

动态绑定允许我们在程序运行的过程中给class加上功能，这在静态语言中很难实现

__slots__   = ('name', 'age') 限制实例的属性，这边的话就允许该class实例，只能添加 name 、age

## **@property**

在绑定属性的时候，如果我们直接把属性暴露出去，虽然写起来很简单，但是没有办法检查参数，

这边可以用属性的get、set方法，对其进行代理拦截，这样的话，就可以根据实际的业务逻辑进行校验或者改写

这个装饰器就是把一个方法变成属性调用的。

这边如果想要把一个getter方法变成属性，只需要加上@property就可以了

这边@property本身又创建了另一个装饰器@score.setter，负责把一个setter方法变成属性赋值

```python
class Student(object):
    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise  ValueError('score must between 0 ~ 100')
        self._score = value

tina = Student()
tina.score = 45
print(tina.score)
```



## **多重继承**

感觉这边更像是继承接口而不是类

ps：类的括号中填写的是所继承的类，如果不继承别的定义好的类，就继承object原型

class Animal(object):    pass class Runnable(object):    def run(self):        print('runnig...') class Flyable(object):    def fly(self):        print('flying....') class Dog(Animal, Runnable):    pass dog = Dog() dog.run()

# **定制类**

python中有很多有特殊用途的函数，可以帮助我们定制类

__str__(): 返回字符串

__init__(): 初始化入参   这边的话可以入参

__iter__(): 当类想被用于for循环中，类似list、tuple那样，可以使用它，该方法返回一个迭代对象，然后for循环就会不断调用该迭代对象的__next__()方法拿到循环的下一个值，直到遇到StopIteration错误时循环退出    注意：在3.0版本是这样写的，但是2.x版本是nest，不加下划线

class Fib(object):    def __init__(self):        self.a, self.b = 0, 1     def __iter__(self):        return self     def next(self):        self.a, self.b = self.b, self.a + self.b        if self.a > 20:            raise StopIteration()        return self.a fib = Fib() for n in fib:    print(n)

__getitem__: 可以取第几个元素ps: 看名字就可以知道当前函数是干嘛用的（get item）

class Fib(object):    def __init__(self):        self.a, self.b = 0, 1     def __iter__(self):        return self     def next(self):        self.a, self.b = self.b, self.a + self.b        if self.a > 20:            raise StopIteration()        return self.a     def __getitem__(self, index):        a, b = 1, 1        if isinstance(index, int):            for x in range(index):                a, b = b, a + b            return a        if isinstance(index, slice):            start = index.start            stop = index.stop            if start is None:                start = 0            L = []            for x in range(stop):                if x > start:                    L.append(a)                a, b = b, a + b            return L  fib = Fib() print(fib[10]) print(fib[0:9])  # for n in fib: #     print(n)

__setitem__()

class Fib(object):    def __init__(self, key, value):        self.arr = [1, 2, 3, 4, 5, 6]        self.a, self.b = 0, 1        if key and value:            self.arr[key] = value     def __iter__(self):        return self     def next(self):        self.a, self.b = self.b, self.a + self.b        if self.a > 20:            raise StopIteration()        return self.a     def __getitem__(self, item):        if isinstance(item, int) and item < len(self.arr):            return self.arr[item]        if isinstance(item, slice) and item.stop < len(self.arr):            start = item.start            # start = item.start if item.start else 0            stop = item.stop            L = []            for x in range(stop):                if x > start:                    L.append(self.arr[x])            return L        else:            return 'input some error'     def __setitem__(self, key, value):        self.arr[key] = value  fib = Fib(2, 100) print(fib[2])   // 100 fib[2] = 200    //这边就是一个字典的操作，会自动调用类中定义的set item 方法来设置相应的值 print(fib[2])  //200

__delitem__()

# **错误处理**

try...except...finally

例子：

try:    print('in try')    r = 1000 / 0    print('result: ', r) except ZeroDivisionError as e:    print('in expect: ', e) finally:    print('in finally')  print('end')

except 捕获到ZeroDivisionError，因此被执行

不管是否发生错误，finally都会被执行

错误种类有很多个，这边可以依据不同的错误种类，写多个except

# IO编程

读写文件：

读：f = open('文件名', '标识符')      f = open('/Users/michael/test.txt', 'r')

r 表示读

如果文件不存在的话，就是抛出IOError错误，并且会详细的告诉你文件不存在

  

f.read() 如果打开成功的话，就可以一次性读取该文件的全部内容

f.close() 关闭文件

写：

f = open('文件的相对路径'， ‘标识符’)   这边的标识符就是 ‘w’

f.write('想要写入的内容')

f.close()

注意：

路径问题：这边既可以用相对路径也可以用绝对路径

相对路径：如果.py文件想要打开同级的文件，必须移到上一级在往下查找

例如： xxx.py   和   test.txt都是在containerFile 文件夹下面，这边如果直接./test.txt是错误的

得往上找一级../containerFile/test.txt

绝对路径：

import os

path = os.getcwd()   // 获取当前路径

with open(path+'./containerFile/test.txt', 'r') as file



# **python自带的常用的库**

TCPServer

UDPServer





python--socketio

https://www.yinxiang.com/everhub/note/5f033c0e-a565-416d-8878-1c5e094cb9b4









# 字符串操作

（截取、替换、查找、分割）

```python
str = '123456789'
print str[0:1]
print str[-5] // 字符串右5位

// 替换
str = 'akakakak'
str = str.replace('k', '8')
print str // a8a8a8a8

// 查找
str = 'a,hello'
print str.find('hello')   // 2 输出结果

// 分割
str = 'a,b,c,d'
strlist = str.split(',') // 用逗号分割字符串并保存到列表
strlist = str.split(',', 1) // 注意这边第二个参数代表它分割的次数['a', 'b, c, d'] 

// 头尾删除
str = 'xyz_template_config'
str.strip('xyz_')  //去除头尾指定字符 template_config
```



# list常用操作



``` python
// 索引
li = ['q', 'w', 't']
print li[0]
print li[0:2]
print li[-1] // t 负数索引

// 增加元素
li = ['a', 'b', 'mpilgrim', 'z', 'example']
li.append('new')
li.inset(2, 'new')
li.extend(['two', 'elements'])   // ['a', 'b', 'mpilgrim', 'z', 'example', 'two', 'elements']


// 搜索
li.index('example')
'c' in li

// 删除元素
li.remove('z')
li.pop() //删除list的最后一个元素，然后返回删除的元素的值

// 运算符
li = li + ['example', 'new']
li += ['two']
li = [1, 2] *3  // [1, 2, 1, 2, 1, 2]

// 使用join链接list成为字符串
li = ['server=mpilgrim', 'uid=sa', 'database=master', 'pwd=secret']
s = ';'.join(li)  // 'server=mpilgrim;uid=sa;database=master;pwd=secret'(ps: 感觉和js是相反的用法)

// 映射解析
li = [1, 9, 8, 4]
li = [elem*2 for elem in li] // [2, 18, 16, 8]

// dictionary中的解析
params = {'server': 'milgrim', 'database': 'master', 'uid': 'sa', 'pwd': 'secret'}
params.keys() // ['server', 'database', 'master', 'uid', 'pwd']
params.values() // ['milgrim', 'master', 'sa', 'secret']
params.items() // [('server', 'milgrim'), (...)]
[v for k, v in params.items()] //  ['milgrim', 'master', 'sa', 'secret']
["%s=%s" % (k, v) for k, v in params.items()] // ['server=mpilgrim', 'database=master', ...]


// 过滤
li = ["a", "mpilgrim", "foo", "b", "c", "b", "d", "d"]
[elem for elem in li if len(elem) > 1]  // ['mpilgrim', 'foo']
[elem for elem in li if elem != 'b']
[elem for elem in li if li.count(elem) == 1]  // 在列表中出现一次的


```















注意：python中没有三目运算符







```
activate_app()
{
  if [ $# -ne 1 ]; then
    echo "missing app_name"
    return
  fi
  if [ -d $CODE_BASE/catkin_ws/src/xyz_app_config/$1 ]; then
    if [ -d $CODE_BASE/app ]; then
      echo "deactivate current app"
      rm $CODE_BASE/app
    fi
    ln -s $CODE_BASE/catkin_ws/src/xyz_app_config/$1 $CODE_BASE/app
    echo "activate $1"
  else
    echo "target app not exist, availabe apps:"
    ls $CODE_BASE/catkin_ws/src/xyz_app_config/
  fi
  update_app_name
}

```

```
shell = 'if [ -d $CODE_BASE/catkin_ws/src/xyz_app_config/'+config_package_name+' ]; then ' +\
                'rm $CODE_BASE/app fi ln -s $CODE_BASE/catkin_ws/src/xyz_app_config/'+config_package_name +\
                ' $CODE_BASE/app '+'echo "success" else echo "false"'
```


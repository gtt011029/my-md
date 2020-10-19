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



## string

（截取、替换、查找、分割）

```python
str = '123456789'
print str[0:1]
print str[-5]  # 字符串右5位

# 替换
str = 'akakakak'
str = str.replace('k', '8')
print str # a8a8a8a8

# 查找
str = 'a,hello'
print str.find('hello')   # 2 输出结果

# 分割
str = 'a,b,c,d'
strlist = str.split(',')  # 用逗号分割字符串并保存到列表
strlist = str.split(',', 1) # 注意这边第二个参数代表它分割的次数['a', 'b, c, d'] 


# 头尾删除
# 格式
str.strip(rm)   # str为字符串。rm为要删除的字符串序列
str = 'xyz_template_config'
str.strip('xyz_') #去除头尾指定字符 template_config

# ps： 当rm为空时，默认删除空白符（包括'\n','\r','\t',''）
'abaaaaaaaabbbb1\n'.strip()   # 'abaaaaaaaabbbb1'

# 注意：这里的rm删除序列是只要边（开头或结尾）上的字符在删除序列内就删掉
'abaaaaaaaabbbb1\n'.strip('ab')   # '1\n'
'abaa2abbbbb1\n'.strip('ba')    # '2abbbbb1\n'

```



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

```python
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



## **tuple**

元组：与array类似，不同之处，定义之后不可更改

```python
>>> classmates = ('Michael', 'Bob', 'Tracy')
```



## **dict  set**

dict：数据结构，字典

dict:等同于 map，使用（key -value）存储

object.get('keyName', 'initvalue')：通过dict提供的get（）方法，如果key不存在，可以返回none，或者知己指定的initvalue

通过key获取当前字典制定数据时，如果key不存在就会报错

dict的一些方法：

```python
config.get('keyName') //查看当前dict中是否有指定key字段，如果没有返回none 
config.update('keyName': value) // 更新key字段，如果没有这个字段会自动加入 
config.pop('keyName') //删除key
del config['sex']  # 删除独立元素‘sex’
config.clear() # clear清空字典
```

优缺点：

1、查找和插入的速度极快，不会随着key的增加而变慢

2、需要占用大量的内存，内存浪费多

set与dict类似，也是一组key的集合但是不存储value，key不重复，这边可以用于过滤

例：

```python
s1 = set([1, 2, 3])

s1.add(4)

s1.remove(4)

s2 = set([2,6,7])

s1 & s2   交集

s1 | s2    并集

str

replace（‘newvalue’， ‘oldvalue’）


```



## 列表、元组、字典、集合的区别

列表list：和数组很相似，本质区别就是，内部数据可重复，类型可不同（ps：貌似js的array也可以，可重复，类型可不同）

元组tuple：元组和列表在结构上没有什么区别，唯一的差异在于元组是只读的，不能修改

字典dictionary：字典定义了键和值一对一的关系，但是它们是以无序的方式存储的

集合set：和其他语言类似，是一个无序不重复元素集，基本功能包括关系测试和消除重复元素



# **条件判断**

if    else

# **循环**

1、for item in itemList

2、while     break    continue

# **function**

```python
# define function  

def my_abs(x):
    if x >= 0:
        return x
    else:
        return -x

print(my_abs(90))

# pass可以用来定义一个空函数
```



## 匿名函数

lambda表示匿名函数

```python
def f(x):
    return x*x

lambda x: x*x
```



## 装饰器

假设要增强函数的功能，比如在调用函数时自动打印日志，但又不希望修改该函数的定义，这种在代码运行期间动态增加功能的方式，称之为‘装饰器’（Decorator）

```python
def log(func):   #接收一个函数作为参数
    def wrapper(*args, **kw):
        print('call %s():' % func._name_)
        return func(*args, **kw)
    return wrapper

@log
def now():
    print ('xxxxx')
    
# 现在在调用now函数，不仅会运行now函数本身，还会在运行now函数前（ps：记得是前前）打印一行日志

#解析：由于log（）是一个decorator，返回一个函数，所以，原来的now（）函数依然存在，只是现在同名的now变量指向了新的函数，于是调用now（）将执行新函数，即在log（）函数中返回的wrapper（）函数

# wrapper函数的参数是（*args, **kw）,因此wrapper函数可以接收任意参数的调用。在wrapper函数中，首先打印日志，再调用原始函数

# 如果decorator本身需要传入参数，那就需要编写一个返回decorator的高阶函数

def log(text):
    def decorator(func):
        def(*args, **kw):
            print ('%s %s():' %(text, func._name_))
            return func(*args, **kw)
        return wrapper
    return decorator

@log('execute')
def now():
    print ('xxxxx')
```



## 偏函数



# 高级特性

## 切片

获取list、tuple的某一部分的值

```python
list = [0, 1, 2, 3, 4, 5, 6， 7， 8， 9， 10， 11， 12]
list[0:2] # [0, 1]   表示从索引0开始，直到索引2结束，但不包括2
list[-2:] # 取最后两个元素
list[:10] # 取前面两个元素
list[:10:2] # 取前两个数，每两个取一个
```



## 迭代

## 列表生成式

```python
[x * x for x in range(1, 11)]  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```



## 生成器

## 迭代器









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

oop程序设计（object oriented programming）

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

当子类和父类拥有同名的方法时，子类中的方法会覆盖父类的方法

理解多态：当我们定义一个class的时候，我们实际上就定义了一种数据类型（这边可以把class name理解为一种自定义的数据类型）。我们定义的数据类型和python自带的数据类型，比如str、list、dict没什么两样。

```python
class Animal(object):    
    pass class Runnable(object):    
    def run(self):        
        print('runnig...') 
class Flyable(object):    
    def fly(self):        
        print('flying....') 
class Dog(Animal, Runnable):    
    pass 
dog = Dog() 
dog.run()
```



# **定制类**

python中有很多有特殊用途的函数，可以帮助我们定制类

__

```python
str__(): 返回字符串

__init__(): 初始化入参   这边的话可以入参

__iter__(): 当类想被用于for循环中，类似list、tuple那样，可以使用它，该方法返回一个迭代对象，然后for循环就会不断调用该迭代对象的__next__()方法拿到循环的下一个值，直到遇到StopIteration错误时循环退出    注意：在3.0版本是这样写的，但是2.x版本是nest，不加下划线

class Fib(object):    def __init__(self):        self.a, self.b = 0, 1     def __iter__(self):        return self     def next(self):        self.a, self.b = self.b, self.a + self.b        if self.a > 20:            raise StopIteration()        return self.a fib = Fib() for n in fib:    print(n)

__getitem__: 可以取第几个元素ps: 看名字就可以知道当前函数是干嘛用的（get item）

class Fib(object):    def __init__(self):        self.a, self.b = 0, 1     def __iter__(self):        return self     def next(self):        self.a, self.b = self.b, self.a + self.b        if self.a > 20:            raise StopIteration()        return self.a     def __getitem__(self, index):        a, b = 1, 1        if isinstance(index, int):            for x in range(index):                a, b = b, a + b            return a        if isinstance(index, slice):            start = index.start            stop = index.stop            if start is None:                start = 0            L = []            for x in range(stop):                if x > start:                    L.append(a)                a, b = b, a + b            return L  fib = Fib() print(fib[10]) print(fib[0:9])  # for n in fib: #     print(n)

__setitem__()

class Fib(object):
	def __init__(self, key, value):
    	self.arr = [1, 2, 3, 4, 5, 6]
        self.a, self.b = 0, 1        
        if key and value:            
            self.arr[key] = value     
    def __iter__(self):        
        return self     
    def next(self):        
        self.a, self.b = self.b, self.a + self.b        
        if self.a > 20:            
            raise StopIteration()        
        return self.a     
    def __getitem__(self, item):        
        if isinstance(item, int) and item < len(self.arr):            
            return self.arr[item]        
        if isinstance(item, slice) and item.stop < len(self.arr):            
            start = item.start            
            # start = item.start if item.start else 0            stop = item.stop            L = []            for x in range(stop):                if x > start:                    L.append(self.arr[x])            return L        else:            return 'input some error'     def __setitem__(self, key, value):        self.arr[key] = value  fib = Fib(2, 100) print(fib[2])   // 100 fib[2] = 200    //这边就是一个字典的操作，会自动调用类中定义的set item 方法来设置相应的值 print(fib[2])  //200

__delitem__()
```









# **错误处理**

try...except...finally

例子：

try:    print('in try')    r = 1000 / 0    print('result: ', r) except ZeroDivisionError as e:    print('in expect: ', e) finally:    print('in finally')  print('end')

except 捕获到ZeroDivisionError，因此被执行

不管是否发生错误，finally都会被执行

错误种类有很多个，这边可以依据不同的错误种类，写多个except



except种类：

TyprError







# IO编程

## 读写文件

（读写文件是常见的IO操作。python内置了读写文件的函数，用法和c是兼容的）

（ps：读写文件前，要了解一下，在磁盘上读写文件的功能是由操作系统提供的，现代操作系统不允许普通的程序操作磁盘，所以，读写文件就是请求操作系统打开一个文件对象（通常称为文件描述符）， 然后，通过操作系统提供的接口从这个文件对象中取读数据（读文件），或者把文件数据写入这个文件对象（写文件））

读：f = open('文件名', '标识符')    

```python
f = open('/Users/michael/test.txt', 'r')
```

r 表示读

如果文件不存在的话，就是抛出IOError错误，并且会详细的告诉你文件不存在

  

```python
f = open('/User/michael/test.txt', 'r')

f.read()  #如果打开成功的话，就可以一次性读取该文件的全部内容

f.close() #关闭文件


```

写：

```python
f = open('文件的相对路径'， ‘标识符’)   # 这边的标识符就是 ‘w’

f.write('想要写入的内容')

f.close()


```

注意：

路径问题：这边既可以用相对路径也可以用绝对路径

相对路径：如果.py文件想要打开同级的文件，必须移到上一级在往下查找

例如： xxx.py   和   test.txt都是在containerFile 文件夹下面，这边如果直接./test.txt是错误的

得往上找一级../containerFile/test.txt

绝对路径：

```python
import os

path = os.getcwd()   # 获取当前路径

with open(path+'./containerFile/test.txt', 'r') as file
```



python引入with语句来自动帮助我们调用close（）方法

```python
with open('/path/to/file', 'r') as f:
    print(f.read())
    
    
# 如果文件很小，read（）一次性读取最方便；如果不能确定文件大小，反复调用read（size）比较保险
# 如果是配置文件，调用readlines（）比较好
for line in f.readlines():
    print(line.strip()) # 把末尾的‘\n’删除
```



## 操作文件和目录

操作系统提供的命令只是简单的调用了操作系统提供的接口函数，python内置的 os 模块也可以直接调用操作系统提供的接口函数

```python
import os
os.name   # 操作系统类型 ‘posix’  说明系统是linux、unix、mac os 
os.uname() #详细信息 
#('Linux',
# 'xyz-rebinning-expunit',
# '4.15.0-99-generic',
# '#100~16.04.1-Ubuntu SMP Wed Apr 22 23:56:30 UTC 2020',
# 'x86_64')


# 查看当前的绝对路径
os.path.abspath('.')


# 在某个目录下创建一个新的目录，首先把新的目录的完整路径表示出来
os.path.join('/Users/michae', 'testdir')   # '/Users/michae/testdir'
# 合并路径时，最好不要直接的拼接，最好使用join，因为在linux下join会返回‘part-1/part-2’，而在windows系统下会返回'part-1\part-2'

# 所以在拆分的时候最好也不要直接拆分，而是使用
os.path.split('/Users/michae/testdir/test.txt')  # ('/Users/michae/testdir', 'test.txt')
os.path.splitext('/Users/michae/testdir/test.txt')  # ('/Users/michae/testdir/text', 'txt') 直接获取其扩展名

# 再创建目录
os.path.mkdir('/Users/michae/testdir')

# 删掉一个目录
os.path.rmdir('/Users/michae/testdir')

# 对文件进行重命名
os.rename('text.txt', 'file.txt')

# 删除文件
os.remove('test.py')
```



# **python自带的常用的库**

TCPServer

UDPServer





python--socketio

https://www.yinxiang.com/everhub/note/5f033c0e-a565-416d-8878-1c5e094cb9b4







# 内置函数

列出一些基本的内置函数

```python
abs (x)   # 返回数字的绝对值



divmod(a, b) # 把除数和余数运算结果结合起来，返回一个包含商和余数的元组（a//b, a%b）
divmod(7, 2) # (3, 1)



input('input content: ') # 3.x：接受一个标准的输入数据，返回String类型；2.x中相当于eval(raw_input(prompt))，用来获取控制台的输入。
raw_input('') # 将所有输入作为字符串看待，返回字符串类型。而input()在对待纯数字输入时具有自己的特性，它返回所输入的数字的类型（int、float）
# ps(input() 和 raw_input() 的区别，二者均能接收字符串，但raw_input()直接读取控制台的输入，而input它希望能够读取一个合法的python表达式; 例如input输入的是3+2会返回5，而raw_input就会返回‘3+2’)



open(name[, mode[, biffering]])
# name: 一个包含了你要访问的文件名称的字符串值（ps：？）
# mode： 决定打开文件的模式：只读r、写入w、追加a
# buffering： 如果设为0，就不会有寄存。设为1，访问文件时会寄存行。值大于1，表明的就是寄存区的缓冲大小。如果取负值，寄存区的缓冲大小则为系统默认
# file = open('test.txt')
# file.read()






all(iterable) # 用于判定可迭代参数中所有元素是否都为true
all([0, 2, 3, 4]) # false
all([1, 2, 3, 4]) # true



enumerate(sequence, [start=0]) # 用于将一个可遍历的对象（列表、元组、字符串）组合为一个索引序列，同时列出数据和数据下标，一般用于for循环中




any(iterable) # 用于判定可迭代参数中所有元素是否存在true，存在true则为true，否则为false
any([0]) #false
any([0, 1]) #true



eval()  # 用于执行一个字符串的表达式，并返回表达式的值


execfile(filename[, global[, locals]])  # 用来执行一个文件，返回表达式执行结果
# filename 文件名（文件路径）
# globals 变量作用域，全局命名空间，如果被提供，则必须是一个字典对象
# locals 变量作用域，局部命名空间，如果被提供，可以使任何映射对象
execfile('python/python-demo/first.py')



bin(x) # 返回一个整数的二进制表示
bin(222) # '0b11011110'




tuple([list]) #将列表转换为元组
tuple([1, 2, 3]) # (1, 2, 3)




filter() #用于过滤序列，过滤掉不符合条件的元素，返回由符合条件元素组成的新列表
filter(function, iterable)
def is_odd(item):
    return item % 2 == 1
filter(is_odd, [1, 2, 3, 4, 5]) # [1, 3, 5]





range(start=0, stop, step=1) #创建一个整数列表,常用于for循环中
range（1， 10， 2） # [1, 3, ,5, 7, 9]



list() #将元组换为列表



callable() # 检查对象是否可调用
callable(0) # false
def add(a, b):
    return a+b
callable(add) #true




lacals() # 会以字典的形式返回当前位置全部的局部变量




reduce() #高阶函数，返回函数计算结果
reduce(function, iterable[, initializer])  # 函数、可迭代对象、初始参数
def add(x, y):
    return x+y
reduce(add, [1, 2, 3, 4, 5]) #15
reduce(lambda x, y: x+y, [1, 2, 3, 4, 5]) #15  使用lambda匿名函数


reload() #重新载入之前载入的模块
```



file对象的方法：



```python
file.read([size]) # size未指定则返回整个文件，如果文件大小大于2倍内存则有问题，f.read()读到文件尾时返回‘’（空字符串）
file.readline() # 返回一行
file.readlines([size]) #返回包含size行的列表，size未指定则返回全部行
file.write('hello\n') #如果要写入字符串以外的数据，现将它转换为字符串
file.tell() #返回一个整数，表示当前文件指针的位置
file.seek(偏移量,[起始位置]) #用来移动指针
file.close() # 关闭文件
```











注意：python中没有三目运算符





# supervisor

supervisor是用python开发的一套通用的进程管理程序，能将一个普通的命令京城变为后台daemon，并监控进程状态，异常退出时能自动重启。他说通过fork/exec的方式把这些被管理的进程当做supervisor的子进程来启动，这样只要在supervisor的配置文件中，把要管理的进程的可执行文件的路径写进去即可。也实现了当子进程挂掉的时候，父进程可以准确获取子进程挂掉的信息，可以选择是否自己启动或报警。supervisor还提供了一个功能，可以为supervisor或者每个子进程设置一个非root的user，这个user就可以管理它对应的进程。
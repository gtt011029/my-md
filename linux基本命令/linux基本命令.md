https://hackmd.io/@Eotones/Hy7LCIteE?type=view

### 杂记

一、关机

shutdown -h now 关机

reboot 重启

logout 注销



二、文件和目录

cd /home

cd ../

cd ../..

cd - 返回上次所在目录

pwd 显示工作路径（print work directive）

ls 查看目录中的文件          ls = list

ls -F 查看目录中的文件

ls -l 显示文件和目录的详细资料

ls -a 显示隐藏资料

tree 显示文件和目录由根目录开始的树形结构



rm -f  file1    删除文件file1            （remove  file   ‘filename’）

rmdir dir1   删除目录 dir1      （remove   directory   ‘directory Name’）

cp file1 file2 复制一个文件     （copy）

vi filename 创建一个文件



### rm：删除

：remove

格式： rm  【option】  name

option：1、 -i    删除前逐一询问

​				2、-f    即使原档案属性为只读，依旧删除不考虑不留情

​				3、-r    将目录及以下之档案亦逐一删除

rm -f  file1    删除文件file1            （remove  -force   ‘filename’）

rmdir dir1   删除目录 dir1      （remove   directory   ‘directory Name’）



### mkdir： 创建文件夹

：make directive

格式： mkdir [选项] DirName

选项： 1、-m 用于对新建目录设施存取权限，也可以用chmod命令进行设置

​			2、-p 需要时创建上层文件夹（或目录），如果文件夹已存在则不视为报错（ps：就是当前文件树已经存在一部分的话，会继续往内延伸，不会新建一份dir tree）

mkdir  dir1  创建一个叫dir1的目录           （make   directory）

mkdir -p /tmp/dir1/dir2  创建一个目录树



### cat：连接

英文全拼：concatenate： 连接

用于连接文件并打印到标准输入设备上





### touch：

用于修改文件或者目录的时间属性，包括存取时间和更改时间。若文件不存在，系统会新建一个文件

语法：touch 【-acfm】【-d<日期时间>】【-r<参考文件或目录>】【-t<日期时间>】【--help】【--version】【文件或目录】

参数：1、a：改变时间记录

​			2、m：改变修改时间记录

​			3、c：假如目标档案不存在不会新建档案。与--no-create的效果一样

​			4、f：不使用，是为了与其他的unix系统相容性而保留

​			5、r：使用参考档的时间记录，与--file的效果一样

​			6、d：（date）设定时间与日期





解压缩filename.tar.gz的压缩

```
tar -zxvf filename.tar.gz
```

其中zxvf含义如下：

z： gzip  压缩格式

x： extract    解压

v： verbose  详细信息

f： file      文件







### find：查找

https://blog.gtwang.org/linux/unix-linux-find-command-examples/

#### 指定档案名查找：

```typescript
// 在当前目录底下寻找某个文件
find . -name gtwang.txt     // 这边find会列出所有名字叫这个的档案列表
find /home -name gtwang.txt  // 在home目录底下，找文件名为gtwang.txt的文件
find /home -iname gtwang.txt  //在home目录下面，找该文件，文件名不区分大小写 
find ./react -name react.md
```



#### 指定档案类型（type）查找：

```typescript
//  type的参数可以有一下几个
// d: 目录（directive）
// p：具名的pipe（FIFO）
// f: file
// l: 连结档？
// s: socket档案

find 【想要查找的路径】 -type 【指定类型，就是上面那几个参数】 -name 【名字：比如你选择的类型是d目录，那这边就是目录的名字】

find /home/xyz/Documents/ -type d -name react
// 输出：
// /home/xyz/Documents/my-md/angular/animation/node_modules/@babel/types/lib/validators/react
// /home/xyz/Documents/my-md/angular/animation/node_modules/@babel/types/lib/utils/react
// /home/xyz/Documents/my-md/angular/animation/node_modules/@babel/types/lib/builders/react
// /home/xyz/Documents/my-md/angular/my-app/node_modules/@babel/types/lib/validators/react
// /home/xyz/Documents/my-md/angular/my-app/node_modules/@babel/types/lib/utils/react
// /home/xyz/Documents/my-md/angular/my-app/node_modules/@babel/types/lib/builders/react
// /home/xyz/Documents/my-md/react



find /home/xyz/Documents/ -type f -name react.md
// 输出：
// /home/xyz/Documents/my-md/react/react.md


find /home/xyz/Documents/my-md -type f -name "*.md"    // 查找md格式的文件



 // 档案权限 -perm，可以指定档案权限，例如：列出所有权限是777的所有档案
find  . -type f -perm 0777
```





### 档案权限详解

http://linux.vbird.org/linux_basic/0210filepermission.php#filepermission_perm

```typescript
ls -al react/
// drwxrwxr-x  2 xyz xyz  4096 8月  17 14:26 .
// drwxrwxr-x 33 xyz xyz  4096 9月  27 16:38 ..
// -rw-rw-r--  1 xyz xyz 18092 8月  17 14:26 react.md

```

分别解释一下这边输出的都是什么意思：
  -rw-rw-r--：档案类型权限，共有10个字元。

​						（1）档案类型：（d：目录）、（-：档案）、（l：连结档）、......

​						（2、3、4：档案拥有者的权限）（2）可写、（3）可读、（4）可执行、

​						（5、6、7：档案所属群组之权限）（5）可写、（6）可读、（7）可执行

​						（8、9、10）其他人之权限

1：连结数，表示有多少档名连结到此节点（i-node）。

xyz：档案拥有者

xyz：档案所属群组

18092：档案容量，预设单位bytes

18092 8月  17 14:26： 档案最后被修改时间

react.md： 档案名 





### service：服务

service --status-all : 列出运行中的服务

service [service name] status :   查看某项服务的。例如：service nginx status

service [service name] start/ stop/ restart:    启动、暂停、重启



 

### dpkg

https://man.linuxde.net/dpkg

dpkg命令是Debian Linux 系统用来安装、创建、和管理软件包的实用工具



语法：dpkg（选项）（参数）

例子：dpkg -l | grep xyz      （ps：|grep ： global regular expression print ）



选项：

-i ：安装软件包（install）

-r：删除软件包（remove）

-P：删除软件包的同时删除其配置文件

-L：显示于软件包关联的文件

-l：显示已安装软件包列表

--unpack：解开软件包

-c：显示软件包文件列表

--confiugre：配置软件包







### grep

全局正则表达式版本

ps：|grep ： global regular expression print ）

https://www.cnblogs.com/peida/archive/2012/12/17/2821195.html









ssh

ps -aux |grep vision_sensor


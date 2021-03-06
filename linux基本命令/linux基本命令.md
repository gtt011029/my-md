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

cp file1 file2 复制一个文件     （copy） 将源文件复制到目标文件内

vi filename 创建一个文件



文件移动命令：

```python
mv [-fiv] source destination

# 参数说明
# -f：force，强制直接移动而不询问
# -i：若目标文件（destination）已经存在，就会询问是否覆盖
# -u：若目标文件已经存在，且源文件比较新，才会更新

# 如将/test1目录下的file1复制到/test3目录，并将文件名改为file2，可以输入一下命令
# mv /test1/files /test3/file2
```



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





### tar：

用来压缩和解压文件。tar本身不具有压缩功能，只是具有打包的功能，有关压缩及解压是调用其它的功能来完成

打包：将一大堆文件或目录变成一个总的文件



解压缩filename.tar.gz的压缩

```
tar -zxvf filename.tar.gz
```

其中zxvf含义如下：

z： gzip  压缩格式

-c, --create   创建一个新归档

x： extract    解压

v： verbose  详细信息

f： file      文件



```js
tar -zcvf  self.tar.gz self    // 把self文件夹打包成gz文件
```



使用rar软件



```
压缩文件
rar a CentOS-7.repo.rar CentOs-7.repo

解压文件
rar x CentOs-7.repo.rar
```







### find：查找

https://blog.gtwang.org/linux/unix-linux-find-command-examples/

#### 指定档案名查找：

```typescript
// 在当前目录底下寻找某个文件
find . -name gtwang.txt     // 这边find会列出所有名字叫这个的档案列表(.表示当前目录)

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

dpkg是Debian Packager的简写 是Debian软件包管理器的基础

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





### ps: 查看进程信息

（process status）用于显示当前进程的状态，类似于windows的任务管理器

 查看进程信息并通过less分页显示

ps -aux |less -N

ps -aux |grep vision_sensor

ps：|grep ： global regular expression print ）

https://www.cnblogs.com/peida/archive/2012/12/17/2821195.html





### ssh：远程连接工具

可以给予ssh加密协议实现安全的远程登录服务器

ssh(选项)(参数)



- 安装 SSH(Secure Shell) 服务以提供远程管理服务 
  `sudo apt-get install ssh`
- SSH 远程登入 Ubuntu 机 
  `$ssh username@192.168.0.1`
- 将 文件/文件夹 从远程 Ubuntu 机拷至本地(scp) 
  `$scp -r username@192.168.0.1:/home/username/remotefile.txt`
- 将 文件/文件夹 从本地拷至远程 Ubuntu 机(scp) 
  `$scp -r localfile.txt username@192.168.0.1:/home/username/`
- 将 文件/文件夹 从远程 Ubuntu 机拷至本地(rsync)





### ln命令：

https://www.cnblogs.com/peida/archive/2012/12/11/2812294.html

ln是linux中一个较为重要的命令，该功能为：为某一个文件在另外的位置建立一个同步的链接，当我们需要在不同的目录，用到相同的文件时，我们不需要在每一个目录下面都放一个相同的文件，只需要把需要的文件放在固定位置，然后在其它需要该文件的地方用ln命令link链接它就可以了，不必重复的占用磁盘空间。

```python
# 格式：

ln [参数][源文件或目录][目标文件或目录]
```

参数：

-b  删除，覆盖以前建立的链接

-d 允许超级用户制作目录的硬链接

-f 强制执行

-i 交互模式，文件存在则提示用户是否覆盖

-n 把符号链接视为一般目录

-s 软连接（符号链接）

-v 显示详细的处理过程



在linux系统中，所谓的链接（link），可以将其视为档案的别名，而链接分为两种：硬链接（hard link）与软连接（symbolic link）

（ps：无论是硬链接还是软链接，文件都保持同步变化）

硬链接：

1. 一个档案可以有多个名称，
2. 以文件副本的形式存在，但不占用实际空间
3. 不可以给目录创建硬链接
4. 只能存在于同一个文件系统中

软连接：

1. 产生一种特殊的档案，该档案的内容是指向另一个档案的位置，
2. 可以跨越不同的文件系统
3. 以路径的形式存在。类似于windows操作系统的快捷方式
4. 可以对一个不存在的文件名进行链接
5. 可以对目录进行链接

```python
# 创建软链接
ln -s log.log linklog
```







### systemctl







pip install --upgrade tornado==4.5.0











vision_system_backend/ros_params_path



sudo systemctl status nginx.service







```
&#13


"说明： &#13;
         1、选择需要进行验证的相机. &#13;
         2、移动机械臂使得整个标定板图案在相机视野中（若使用的是3D相机，则需同时能够看到标定板的点云）. &#13;
         3、点击”显示“按钮可以看到2D相机图片和3D场景中出现的坐标轴“board_array”. &#13;
         4、若2D相机图片中红色点和绿色点重合度较好（若使用的是3D相机，则需依照2D图片中显示的坐标轴和标定板图案的位置关系，来验证3D场景中的坐标轴”board_array”和标定板点云位置是否匹配），则可以初步说明标定结果满足需求。"
```







![img](/home/xyz/Documents/self/img.jpeg)







|          |                |        | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | 10   | 11   |
| -------- | -------------- | ------ | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 输入     | 投入1元5角硬币 | （1）  | 1    | 1    | 1    | 1    | 0    | 0    | 0    | 0    | 0    | 0    | 0    |
| 输入     | 投入2元硬币    | （2）  | 0    | 0    | 0    | 0    | 1    | 1    | 1    | 1    | 0    | 0    | 0    |
| 输入     | 按“可乐”按钮   | （3）  | 1    | 0    | 0    | 0    | 1    | 0    | 0    | 0    | 1    | 0    | 0    |
| 输入     | 按“雪碧”按钮   | （4）  | 0    | 1    | 0    | 0    | 0    | 1    | 0    | 0    | 0    | 1    | 0    |
| 输入     | 按“红茶”按钮   | （5）  | 0    | 0    | 1    | 0    | 0    | 0    | 1    | 0    | 0    | 0    | 1    |
| 中间节点 | 已投币         | （11） | 1    | 1    | 1    | 1    | 1    | 1    | 1    | 1    | 0    | 0    | 0    |
| 中间节点 | 已按钮         | （12） | 1    | 1    | 1    | 0    | 1    | 1    | 1    | 0    | 1    | 1    | 1    |
| 输出     | 退还5角硬币    | （21） | 0    | 0    | 0    | 0    | 1    | 1    | 1    | 0    | 0    | 0    | 0    |
| 输出     | 送出可乐       | （22） | 1    | 0    | 0    | 0    | 1    | 0    | 0    | 0    | 0    | 0    | 0    |
| 输出     | 送出雪碧       | （23） | 0    | 1    | 0    | 0    | 0    | 1    | 0    | 0    | 0    | 0    | 0    |
| 输出     | 送出红茶       | （24） | 0    | 0    | 1    | 0    | 0    | 0    | 1    | 0    | 0    | 0    | 0    |









192.168.1.43 debin



### lsof

(list open files)列出当前系统打开文件的工具

可用于查看进程打开的文件

```
lsof [参数][文件]

```

lsof -i:4200



命令参数：

-a：列出打开文件存在的进程

-c<进程名>列出当前进程所打开的文件

-g 列出GID进程详情

-d<文件号>列出占用该文件的进程

-i<条件> 列出符合条件的进程（4、6、协议、：端口、@ip）









## linux terminal 快捷键

Ctrl + Alt + t：打开一个新的终端，就是新开一个窗口

Shift + Ctrl + t：在已有终端上打开一个新的tab

Shift + Ctrl  + n：在已有终端上打开一个新的终端，即一个新的窗口

Ctrl + d： 关闭tab，如果一个终端有多个tab，只关闭当前tab

Shift + Ctrl + w：效果类似于Ctrl + d 但又不同，当一个终端只有一个tab时，这个快捷键不起作用

Shift + Ctrl + q： 关闭当前终端，如果终端有多个tab，所有的tab都将关闭



移动光标：

Ctrl + b：同键盘左键，向左移动光标

Ctrl + f：同鼠标右键，向右

Ctrl + a：移动到首行

https://zhuanlan.zhihu.com/p/29538650


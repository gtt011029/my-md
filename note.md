<-------------------------------------产品开始------------------------------------->
# 产品

+ [用户手册](https://www.zstack.io/help/product_manuals/user_guide/)

+ [运维手册](https://www.zstack.io/help/product_manuals/maintenance_manual/)

+ [产品剖析](https://www.zstack.io/help/product_manuals/white_paper/2.html#c2_2)

+ [ctl手册](https://www.zstack.io/help/product_manuals/ctl_manual/)

+ [cli手册](https://www.zstack.io/help/product_manuals/cli_manual/)

+ [产品功能](https://www.zstack.io/help/product_manuals/white_paper/3.html#c3)

+ [术语表](https://www.zstack.io/help/product_manuals/white_paper/5.html#c5)

<-------------------------------------产品结束---------------------------------->


<-------------------------------------脚本相关开始----------------------------------->
# 下载

+ wget   http://172.20.198.234/mirror/mevoco_ci/#版本号

# 升级

+ bash  ZStack-enterprise-installer-master-版本号.bin -u

# 个人公网ip网段

+ 10.204.140.0 - 10.204.140.255

# 生成log日志

+ zstack-ctl configured_collect_log --full

# 链接共享文件

+ net use x: \\192.168.200.100\share password /user:smb

# ISO
+ sh zstack-upgrade -r ./ZStack-x86_64-DVD-3.1.0-181009-c74.iso

# 后端数据库变更，升级安装失败
+ virsh list --all
+ virsh destroy id
+ virsh undefine name
+ rm -rf /usr/local/zstack/
+ bash ZStack-enterprise-installer-master-版本号.bin -D

# [搭建sharedBloack主存储](https://note.youdao.com/ynoteshare1/index.html?id=fe14a3f2ea8ac76ff7eb1c21b544496c&type=note#/)

    cd /etc/yum.repos.d/
    vi a.repo
    cd ~
    touch /etc/yum.repo.d/a.repo
    
    ~~~
        # CentOS-Base.repo
        #
        # The mirror system uses the connecting IP address of the client and the
        # update status of each mirror to pick mirrors that are updated to and
        # geographically close to the client.  You should use this for CentOS updates
        # unless you are manually picking other mirrors.
        #
        # If the mirrorlist= does not work for you, as a fall back you can try the
        # remarked out baseurl= line instead.
        #
        #
    
        [base]
        name=CentOS-$releasever - Base
        #mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os
        baseurl=https://mirrors.ustc.edu.cn/centos/$releasever/os/$basearch/
        gpgcheck=1
        gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
    
        #released updates
        [updates]
        name=CentOS-$releasever - Updates
        # mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=updates
        baseurl=https://mirrors.ustc.edu.cn/centos/$releasever/updates/$basearch/
        gpgcheck=1
        gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
    
        #additional packages that may be useful
        [extras]
        name=CentOS-$releasever - Extras
        # mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras
        baseurl=https://mirrors.ustc.edu.cn/centos/$releasever/extras/$basearch/
        gpgcheck=1
        gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
    
        #additional packages that extend functionality of existing packages
        [centosplus]
        name=CentOS-$releasever - Plus
        # mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=centosplus
        baseurl=https://mirrors.ustc.edu.cn/centos/$releasever/centosplus/$basearch/
        gpgcheck=1
        enabled=0
        gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
    ~~~
    
    ~~~
        esc 
        shift + :
        wq!
    ~~~
    
    yum install targetcli -y
    systemctl start target
    systemctl enable target
    targetcli
    /backstores/block create blksda /dev/sda
    cd iscsi
    create
    cd iqn.2003-01.org.linux-iscsi.ocfs2-volume.x8664:sn.fe9c8a556405/tpg1/luns
    create /backstores/block/blksda
    cd ..
    set attribute authentication=0 demo_mode_write_protect=0 generate_node_acls=1 cache_dynamic_acls=1
    
    =======================================================================
    
    /backstores/block create blksdb /dev/sdb
    cd iscsi
    create
    cd iqn.2003-01.org.linux-iscsi.ocfs2-volume.x8664:sn.fe9c8a556405/tpg1/luns
    create /backstores/block/blksdb
    cd ..
    set attribute authentication=0 demo_mode_write_protect=0 generate_node_acls=1 cache_dynamic_acls=1
    exit  

# 防火墙

+ iptables -L
+ iptables -F
+ systemctl stop firewalld     //临时关闭
+ systemctl disable firewalld  //禁止开机自启动  
+ firewall-cmd --state         //查看防火墙状态

# 查看所有java进程

+ jps -l


# 清除进程

+ sudo kill -9 x x 


# 查看java路径

+ echo $PATH
+ whereis java
+ which java


# 查看cpu，内存状态

+ top


# 文件和目录

+ scp root@192.168.6.137:/usr/local/Tomcat/wepapps/   /home/odp-web.war  //目标机器拷到本机
+ scp /home/odp-web.war  root@192.168.6.137:/usr/local/Tomcat/wepapps/   //本机拷到目标机器
+ touch file.txt  
+ mkdir cat
+ tar -cvf **.tar a.jsp b.java    将a和b打成**.rar 
+ tar -xvf **.tar a.jsp b.java    将**.tar 解包 

# 用户

+ who
+ su root

# 程序
+ ./catalina.sh stop      
+ ./catalina.sh start

<-------------------------------------脚本相关结束--------------------------------->









## git

本地代码脏乱

git fetch --all && git reset --hard origin/master && git pull
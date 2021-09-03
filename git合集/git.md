

# git  合集

## 二、开发中遇到的问题总结

对非线性开发模式的强力支持（允许成千上万个并行开发的分支）

完全分布式

每次进行切换的时候，实际上是切换的HEAD指针的指向

https://www.imooc.com/learn/208

![](img/git.png)

### 1、使用git在本地创建一个项目的过程

```
进入项目目录

git init                                      //初始化，创建版本库

touch README                                 //创建README文件

git add README							     //将README文件添加到暂存区

git commit -m ‘first commit’                 //提交更新到仓库，并注释信息‘first commit’

git remote add origin git@github.com:dedsf/hello-world.git    //连接远程github项目

git push -u origin master                    //将本地项目更新到github项目上去
```

==注意：==有可能会遇到一下的问题：

在进行远程连接的时候如果遇到fatal: remote origin already exists.     可以先$ git remote rm origin   再进行远程连接



### 2、git rebase（关运行）

平常开发新feature的时候会在当天把代码commit到本地，到最后开发完成的时候会一起rebase一份，提交到远端分支，具体做法

1、（平常开发的时候）

	git   commit    -a  -m   'feature-xxxx-当天时间'         

2、（最后一天准备提交的时候）

	git   commit    -a  -m   'feature-xxxx-当天时间' 
	
	git   status     （查看此时分支是否干净）
	
	git   log		（查看日志，看它们的commit号）
	
	git   rebase   -i    commit号（第一次提交之前的那个commit号）
	
	除第一个pick以外，其他的改pick为s    
	
	保存退出   ：wq
	
	git   status  （查看是否rebase完成）
	
	记录此次的commit号

注意： 

如果你异常退出了，可以git rebase –edit-todo 重新进入，继续编辑；

如果遇到下图这样的问题，直接git  add .  即可解决

![](img/rebase异常.png)



3、把远端分支拉下来，并在本地建立一个相同名字的分支

```html
git   checkout   master

git    fetch    origin    feature-xxxx: feature-xxxx  （把远端代码拉下来，并在本地创建一个名称相同的分支）

git     checkout    feature-xxxx    （切换到那个分支）

git 	cherry-pick     commit号（之前rebase的那个commit号）

git  	push   my   feature-xxxx	（push到远端）

gitlab上请求merge，选择需要的远端分支
```

### 3、当从feature branch 提到master上去时

（以feature-common-error为例）（这边好像理解错了，这边是直接在原来本地和远端同名的分支上提交的，但是这边这样的话，应该会有冲突吧，和master上的代码）（所以这边应该可以在master上新建一个本地的分支，然后直接pull远端feature分支的代码，rebase之后就可以提交了）

​	本地分支名：feature-common-error

​	远端分支名：feature-common-error

​	1、git   pull   origin    feature-common-error 	 (在本地的分支上把远端的featureBranch上的代码pull下来)

​	2、git   log																 (找最初的commit号)

​	3、git   rebase     -i      (commit 号)						(进行rebase)

​	4、git    log																(查看是否rebase成功)

​	5、git    status														   (查看此前状态)

​	6、git    push   my    feature-common-error		(推到master上去)



### 4、如果推到maser有冲突的话

根据（2）推到master 如果出现下面的问题，有可能是和master上面的代码有冲突

![](img/推到master失败.png)

1、可以看一下，代码是否有冲突，如果有冲突，进行解冲突

2、结完冲突后，看下状态 git  status   

![](img/解完冲突后的状态.png)

3、git  add

4、git  push   --continue

5、git   status



### 5、推到master上面的另一种方法

这边和在master的新分支上pull远端分支上的代码是一样的，我觉得这样会比较好，冲突可以在本地发现

1、git  status

2、git  log

3、git   rebase   -i   commit号

4、改pick为s   :wq 保存并退出

5、git  log

6、在maser上新开一个分支，把最新的commit 号，cherry-pick过去   （如果cherry-pick有冲突，就解冲突，解完冲突看状态，git add 后   git   cherry-pick   --continue）

7、再push

8、有冲突解冲突，没冲突就over

### 6、git reflog	

可以看到在当前分支所做的所有操作

### 7、git    xxx     --abort 

回到什么指令之前，例：git   merge    --abort



### 8、遇到pull  master上代码pull不下来的情况

有时候pull代码，会pull不下来，会遇到以下这种情况

![](img/pull不下来代码.png)

再次pull无果后，可以这样：git pull  origin master:master

### 9、编译出错

##### 1、there is another module with anequal name when case is ignored

这种情况，可以看一下，import的路径的大小写是否写对



![](img/编译错误.png)

### 10、本地代码脏乱，一键搞定

git fetch --all && git reset --hard origin/master && git pull

### 11、删除本地分支

git    branch   -d   '分支名'             //注意：删除分支之前，先切换到其他分支

![](img/删除本地分支.png)

### 12、pr冲突

当提的pr冲突时，可以在本地更改后，重新-f进去

如果，在本地没有发现冲突，可能是本地的分支和远端的不同步，导致冲突，可以把本地的分支fetch一份远端的，同步远端的，此时可以rebase一下（有时候rebase  master 上的代码不成功，可以fetch 一份 origin上的）

```
git fetch origin feature-netflow-ha
git rebase origin/feature-netflow-ha
git diff
git checkout feature-netflow-ha-changeVrouterName
git rebase feature-netflow-ha     （此时就会发现冲突，解完冲突后）
git status
git add .
git rebase --continue
git staus
git push -f my feature-netflow-ha-changeVrouterName
git status

```

### 13、提交错误

如果输入git push origin  master ，提示错误：error:failed to push som refs to …….

解决方法：

​	

```
git pull origin master   //先把远端的github上面的文件拉下来

git push origin master
```



### 14、git回退版本并提交

直接找到需要回退的版本号(83ff2785)，reset之后，强推

查询所需要回退的版本号：如图

![](img/git版本回退.png)

```js
git reset –hard 83ff2785

git push -f origin matser

git reset HEAD 暂存区的恢复到工作区

git reset --soft HEAD~1

// --soft这行命令表示，将最近一次提交 HEAD~1 从本地仓库回退到暂存区，--soft 不会丢弃修改，而是将修改放到暂存区，后续继续修改，或者丢弃暂存区的修改就可以随意了。如果要撤销本地两次修改，则改成 HEAD~2 即可，其他同类。
```

```
git reset HEAD <file>  // 可以把暂存区的修改回退到工作区
```



### 15、git防坑：git push 远端无分支不提示

如果你git push 感觉push上去了，在远端查一下，确保真正的push上去了，因为如果远端没有该分支的话，不会报错



### 16、在feature上rebase master上的代码

有时候会出现这样的问题，你的feature会和别人的feature之间有影响，所以要在你的feature-branch上和master上的代码合并一下，再次测试是否适配

这样的话，可以在本地和你feature-branch同名的分支上     git   rebase origin/master

然后push上去。



### 17、git checkout .

git checkout  -- <file>(文件url)

把工作区的修改全部清空，回到最近的一次add或者commit

git clean -df 

删除当前目录下没有被track过的文件和文件夹    删除一些没有被 git add 的文件





### 18、git reset HEAD <file>  （文件名）

(use "git reset HEAD <file>..." to unstage) 可以把暂存区的修改撤销掉

这边可以把提交到暂存区的代码clean掉  重新放回到工作区



### 19、git blame

查找指定文件被谁修改过

例：git blame -L 10, 50 src/windows/V2V/Page.vue

==注意：逗号左右没有空格==

### 20、没有权限改代码

![](img/没有权限改代码.png)

有时候，提交代码的时候会遇到冲突，可是在本地看的时候，看不见冲突，有可能是没有权限改代码，权限被禁掉了，这时候可以把node关了，再次git status就会发现冲突，这时候解冲突就可以了。



### 21、权限问题-2

![](img/1571033240379.png)

这边可以看到是因为公钥的原因，有可能是更新的电脑的公钥，把本地电脑的公钥，再次添加一下就可以了。



### 22、remote添加

 git remote add my http://*** 



### 23、git stash

用于想要保存当前的修改，但是想回到之前最后一次提交的干净的工作仓库时进行的操作，

最新的存储待在refs/stash

将本地的修改保存起来，并且将当前代码切换到HEAD提交上

git stash list 查看

git stash show 用于校验

git stash apply 用于重新存储

git stash pop 让保存的代码重新进入工作区（移除单个存储单元）

git stash === git stash save

注意：git stash命令会把以下修改存储到新堆栈中

1、暂存区中的修改

2、工作区中已经存在的文件的修改

所以，默认情况下，git stash 不会存储下列文件

1、工作区中新增的文件（untracked files）

2、被版忽略的文件（.gitignore）

如果想要存储 untracked files

```
git stash -u
```

如果既想存储untracked files文件，又想存储.gitignore文件

```
git stash -a
```



```
// 平常情况下我们可以在stash的时候加个message，方便事后回想记忆

git stash save '备注信息'
```







### 24、push报错（the remote end hung up unexpectedly）

问题描述：Git在推送项目时报错：fatal: The remote end hung up unexpectedly。

问题原因：推送的文件太大。

解决方法：

1、修改git config 文件的postBuffer的大小

```
git config --local http.postBuffer 524288000
```

ps：--local 只对本地有效

2、直接修改本地仓库的.config文件

.git   => config 打开文件

postBuffer 修改

3、重新push一次     





git reabse和git merge的区别：

git merge: 会保留所以commit的记录，无论是master分支还是git分支,commit会按照日期的从新到旧进行排列

git rebase：改变feature分支从master上拉出分支的位置；没有多余的合并历史的记录；这边看起来会更清爽一些



### **25、多人协作开发**

看了廖雪峰 的官网，觉得他写的多人协作开发并不是很好

我觉得这样会好点：首先先从远端fetch一份远端仓库的代码下来，最好远端个本地的branch name相同，便于理解，，最好保持这个分支和远端同步，基于这个分支在创建一个新的分支用于自己的开发，然后就开始自己的开发，中间如果有别的紧急bug要处理，这边可以stash，或者commit，等开发完成之后，本地的commit可以rebase成一个commit，便于远端查看提交记录，切到featch下来的那个分支，拉下远端最新代码，把开发的commit cherry-pick进去，在push到远端，然后git pull --rebase（git fetch + git rebase：其实这边的rebase就可以看成是远端pull下来的commit和本地的commit合并了，这样的话就只有一个commit看起来就比较清晰，如果直接pull的话，你的commit中就有别人的commit记录，这样的话远端就很混乱，所以这边就把所有的commit合并一下成为一个新的commit就比较清晰）远端代码到本地，有冲突的解冲突，解完冲突push到远端

git rebase 的作用：把一个分支的修改合并到当前分支

在本地常见和远程分之对应的分支：

```
git checkout -b branch-name origin/branch-name
```

git branch --set-upstream-to=origin/dev dev   设置本地dev和远程origin/dev的连接

多人协作的工作模式

1、首先，可以试图 git push origin <branch-name>

2、如果推送失败，则因为远程分支比你本地的更新，git pull 一下试图合并

3、如果有冲突的话解决冲突，

4、没有冲突或冲突解决掉以后，再次推送

注意：如果 git pull 提示no traking information ，则说明本地分支和远端分支没有创建链接关系，用命令 git branch --set-upstream-to <branch-name> origin/<branch-name>





### 26、关联和取消远程仓库

1.在本地目录下关联远程repository ：

```
git remote add origin git@github.com:git_username/repository_name.git
```



2.取消本地目录下关联的远程库：

```
git remote remove origin
```





### 27、本地分支与远端分支进行关联

```
git branch --set-upstream-to=origin/gw-refactor  gw-refactor
```





### 28、重写分支

```
git-filter-branch  - 重写分支
```







### 29、git stash

```
git stash 
git stash list
git stash apply xxx
git stash pop
```





### 30、git  commit

重新提交



```
git commit --amend 重新提交
git commit -a -m '' 将所有被修改或者已删除的已经被Git管理的文档提交到仓库
```



### 31、Git remote

```
git remote -v 查看远端仓库url
git remote show origin 查看远端仓库信息
git remote add origin xxx 添加仓库
git remote remove origin 删除与远端仓库的连接
git remote rename pb paul 重命名，将pb改为paul
```



### 32、Git tag

标签：（轻量标签：很像一个不会改变的分支，只是一个特定提交的引用；

附注标签：存储在git数据库中的一个完整对象，它们是可以被校验的）

```
git tag 查看已经打的标签
```



### 33、git config

就是对git 进行一些配置，这些配置都是写在配置文件中



local：仓库级配置（.git/config）当前仓库有效（针对一个仓库）

global：全局级配置（~/.gitconfig）用户目录下的配置文件有效（针对一个用户））

system：系统级配置（/etc/gitconfig）对所有用户都普遍适用的配置

```
git config [--global | --local | --system] --list		查看当前生效的配置文件

配置文件的增删改查：
git [--global | --local | --system] --add section.name value		增
git [--global | --local | --system] --unset | --unset-all section.name		删
git [--global | --local | --system] setction.naem newValue		改

别名：
git config --global alias.co commit
git config --global alias.st status
```





```
git branch branchName		创建分支

HEAD指向的是当前所在的本地分支
```



# 重温

git  add （最好的理解：精确的将内容添加到下一次提交中）



git diff --staged (比对已暂存的文件和最后一席提交的文件差异)
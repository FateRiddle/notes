# 学习git

### 其他
0. 资源：  
   * 简易[git guide](https://rogerdudler.github.io/git-guide/) 

1. github每次传输省去用户名密码：  
设置SSH，windows下  
    * 输入`ssh-keygen`,生成文件
    * 进入github设置，将public key粘贴到ssh设置内。

2. 无视本地文件，完全同步远端master  
    `git fetch origin`  
    `git reset --hard origin/master`
3. 回退单个文件到上一次commit  
    `git checkout -- <filename>`

### 第一课  
`ls -a`  所有的目录  
`git init`    **.git** 文件夹包含所有git信息，删除它即删除git  
`git add -A` / `git add .`  添加所有  
`git remote add origin git@github.com:FateRiddle/notes.git` 添加源
`git remote set-url origin git://new.url.here`  修改源
`git remote -v`  查看源

### 第二课
`git clone`

### 第三课
最简工作流：  
`git status`  
`git add -A`  
`git commit -m "first commit"`
`git push`  
第一次则 `git push -u origin master` 设定好push到哪个分支（这里是master）。  

### 第四-五课
`git pull` =   
`git fetch`  拉下远端的，但不合并到本地代码里  
+  
`git merge`  将fetch的代码与本地代码合并  

### 第六课
`git branch new`  新建 **new** 分支，并copy你checkout的分支的代码（比如现在你在master，new分支就copy master）  
`git checkout new`  换分支  
`git chekcout -` 换回上一个分支  
`git checkout -b new2` 新建 **new2** 分支并checkout到它  

### 第七课
当分支完成任务后，可以`git merge` 将其merge回master分支:  
`git checkout master` 切换到接受merge的分支  
`git merge new2`  选择将new2分支merge  
`git branch -d new2`  merge成功后将new2分支删除

### 第八课  
`push`不成功，因为其他人也`push`了代码的情况：  
`git pull`  
1. 如果没有冲突，这之后照常add + commit + push
2. 如果有冲突
    * `git status`看详细冲突
    * vscode打开冲突文件，**HEAD**部分是你的代码，下侧是远端代码，修改好  
    * add + commit + push  

### 第九课
`git stash`  处理别的问题时，缓存未完成还不想commit的代码  
`git stash apply`  取回（如果有冲突，vscode打开文件fix冲突）

### 第十-十三课
`git log`  输出内容多时，会进入pager模式。
`q` 退出  
`git log --oneline --graph --stat -p`  单行,图表,数据,具体代码修改  
`git log -3 -i -S"Math" --author="fate" --after="2 months ago" README.md` 最后3条，不区分大小写，搜索Math，作者fate, 从两月前开始

### 第十四课
查看修改了哪些
`git diff --stat`  
`git diff --cached`  
`git diff HEAD`  
非常有用的,在一个new分支  
`git fetch` + `git diff origin/master` 查看本分支和master的区别。






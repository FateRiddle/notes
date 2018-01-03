# 学习 git

### 其他

0. 资源：

   * 简易[git guide](https://rogerdudler.github.io/git-guide/)

1. github 每次传输省去用户名密码：\
   设置 SSH，windows 下\
    _ 输入`ssh-keygen`, 生成文件 _ 进入 github 设置，将 public key 粘贴到 ssh 设置内。 \* add
   remote 时注意使用 SSH 源。

1. 无视本地文件，完全同步远端 master

```bash
git fetch origin
git reset --hard origin/master
```

3. 回退单个文件到上一次 commit

```bash
git checkout -- <filename>
```

### 重命名分支

```bash
# 1. Rename your local branch
# If you are on the branch you want to rename
git branch -m new-name
# If you are on a different branch:
git branch -m old-name new-name

# 2. Delete the old-name remote branch and push the new-name local branch
git push origin :old-name new-name

# 3. Reset the upstream branch for the new-name local branch
# Switch to the branch and then:
git push origin -u new-name
```

### 删除分支

```bash
# 删除已经merge的local分支
git branch -d feature/login
# 强行删除没有merge的local分支
git branch -D feature/login
# Deleting remote branches in Git
git push origin --delete feature/login
```

### 第一课

```bash
# 所有的目录
ls -a
#  .git 文件夹包含所有 git 信息，删除它即删除 git
git init
# 添加所有
git add -A  git add .
# 添加源
git remote add origin git@github.com:FateRiddle/notes.git
# 修改源
git remote set-url origin git://new.url.here
# 查看源
git remote -v
```

### 第二课

```bash
git clone
```

### 第三课

最简工作流：

```bash
git status
git add -A
git commit -m "first commit"
git push
# 第一次则
git push -u origin master
# 设定好 push 到哪个分支（这里是 master）
```

### 第四 - 五课

```bash
git pull
# =
git fetch
# 拉下远端的，但不合并到本地代码里
# +
git merge
# 将 fetch 的代码与本地代码合并
```

### 第六课

```bash
# 新建 **new** 分支，并 copy 你 checkout 的分支的代码（比如现在你在master，new 分支就 copy master）
git branch new
# 换分支
git checkout new
# 换回上一个分支
git checkout -
# 新建 new2 分支并 checkout 到它
git checkout -b new2
```

### 第七课

当分支完成任务后，可以`git merge` 将其 merge 回 master 分支 :\
`git checkout master` 切换到接受 merge 的分支\
`git merge new2` 选择将 new2 分支 merge\
`git branch -d new2` merge 成功后将 new2 分支删除

### 第八课

`push`不成功，因为其他人也`push`了代码的情况：\
`git pull`

1. 如果没有冲突，这之后照常 add + commit + push
2. 如果有冲突
   * `git status`看详细冲突
   * vscode 打开冲突文件，**HEAD**部分是你的代码，下侧是远端代码，修改好
   * add + commit + push

### 第九课

`git stash` 处理别的问题时，缓存未完成还不想 commit 的代码\
`git stash apply` 取回（如果有冲突，vscode 打开文件 fix 冲突）

### 第十 - 十三课

`git log` 输出内容多时，会进入 pager 模式。 `q` 退出\
`git log --oneline --graph --stat -p` 单行 , 图表 , 数据 , 具体代码修改\
`git log -3 -i -S"Math" --author="fate" --after="2 months ago" README.md` 最后 3 条，不区
分大小写，搜索 Math，作者 fate, 从两月前开始

### 第十四课

查看修改了哪些 `git diff --stat`\
`git diff --cached`\
`git diff HEAD`\
非常有用的 , 在一个 new 分支\
`git fetch` + `git diff origin/master` 查看本分支和 master 的区别。

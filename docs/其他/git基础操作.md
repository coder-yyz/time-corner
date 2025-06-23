# git基础操作

## 1. 仓库初始化

```Bash
git init                     # 初始化本地仓库
git clone <url>              # 克隆远程仓库（支持HTTPS/SSH）
git clone --depth 1 <url>    # 浅克隆（仅最新版本）
```

## 2. 基础工作流

```Bash
git add .                    # 添加所有修改到暂存区
git add -A                   # 包括新增/删除文件的全量添加
git add -p                   # 交互式选择修改片段

git commit -m "message"      # 提交变更
git commit --amend           # 修改最后一次提交（慎用）
git commit -a -m "message"   # 自动添加已跟踪文件的修改
git push origin master       # 推送到远程仓库的master分支

```

## 3. 查看状态

```Bash
git status                   # 查看工作区状态
git status -s                # 简洁状态显示
git diff                     # 查看未暂存修改
git diff --staged            # 查看已暂存修改

```

## 4. 分支管理

```Bash
git branch                   # 查看本地分支
git branch -a                # 查看所有分支（含远程）
git branch <name>            # 创建新分支
git checkout <branch>        # 切换分支
git switch <branch>          # 新版切换命令
git checkout -b <branch>     # 创建并切换到新分支
git merge <branch>           # 合并指定分支到当前分支
git rebase <base-branch>     # 变基操作（重写提交历史）
git cherry-pick <commit>     # 提取特定提交

git branch -d <branch>       # 删除本地分支
git branch -d <branch>       # 删除已合并分支
git branch -D <branch>       # 强制删除未合并分支
git remote prune origin       # 清理远程已删除分支的本地记录
git push origin --delete <branch>  # 删除远程分支

```

## 5.查看提交历史

```Bash
git log                      # 基础提交历史
git log --oneline            # 简洁历史视图
git log --graph              # 图形化分支展示
git log -p                   # 显示具体修改内容
```

## 6.版本回退与恢复

```Bash
git reset HEAD~1             # 撤销最后一次提交（默认mixed模式）
git reset --soft HEAD~1      # 保留修改到暂存区
git reset --hard HEAD~1      # 彻底删除修改（慎用！）

git checkout <commit>        # 临时查看历史版本
git revert <commit>          # 生成反向提交撤销指定修改
```

## 7. 代码暂存

```Bash
git stash                    # 临时保存当前修改
git stash list               # 查看暂存记录
git stash pop                # 恢复最近一次暂存
git stash apply stash@{n}    # 恢复指定暂存记录
```

## 8. 远程操作

```Bash
git remote -v                # 查看远程仓库信息
git remote add <name> <url>  # 添加新远程仓库
git remote rename old new     # 重命名远程仓库
git remote remove <name>     # 删除远程仓库

git push origin main         # 推送本地分支到远程
git push -u origin main      # 设置上游分支（首次推送）
git pull                     # 拉取远程更新（=fetch + merge）
git fetch --all              # 获取所有远程更新
```

## 9. 标签管理

```Bash
git tag                      # 查看标签列表
git tag v1.0                 # 创建轻量标签
git tag -a v1.0 -m "说明"     # 创建注释标签
git push origin --tags       # 推送所有标签到远程
```

## 10. 子模块管理

```Bash
git submodule add <url>      # 添加子模块
git submodule update --init  # 初始化子模块
git submodule foreach git pull  # 批量更新子模块
git submodule deinit <path>  # 移除子模块
git rm --cached <path>       # 从索引中移除子模块
````

## 11. 全局配置

```Bash

# 查看全局配置
git config --global --list

# 身份标识（必填项）
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 默认文本编辑器（VSCode示例）
git config --global core.editor "code --wait"

# 换行符自动转换（跨平台协作关键）
git config --global core.autocrlf input       # Linux/Mac
git config --global core.autocrlf true        # Windows

# 文件权限变更处理
git config --global core.fileMode false

# 凭证存储（按系统选择）
git config --global credential.helper manager-core   # Windows
git config --global credential.helper osxkeychain   # Mac
git config --global credential.helper cache          # Linux（缓存15分钟）

# SSH签名验证
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
```
> 提交规范：推荐使用Conventional Commits格式
> feat: 添加新功能 
> fix: 修复BUG 
> docs: 文档更新 
> style: 代码格式调整 
> refactor: 代码重构
> test: 添加测试
> chore: 构建过程或辅助工具的变更

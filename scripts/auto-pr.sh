#!/bin/bash

# 自动PR脚本

# 检查是否在git仓库中
if [ ! -d ".git" ]; then
  echo "错误: 不是git仓库"
  exit 1
 fi

# 获取当前分支
current_branch=$(git branch --show-current)

# 检查是否是feature分支
if [[ ! $current_branch =~ ^feature/ ]]; then
  echo "错误: 只有feature分支才能创建PR"
  exit 1
fi

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
  echo "错误: 有未提交的更改，请先提交"
  exit 1
fi

# 推送分支到远程
echo "正在推送分支到远程..."
git push origin $current_branch

# 检查推送是否成功
if [ $? -ne 0 ]; then
  echo "错误: 推送失败"
  exit 1
fi

echo "分支推送成功！"
echo "GitHub Actions 将自动创建PR，请稍等..."
echo "您也可以手动创建PR: https://github.com/weiyu199173/TranscendPartner/pull/new/$current_branch"

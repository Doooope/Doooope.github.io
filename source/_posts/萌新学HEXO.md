---
layout: '[layout]'
title: 萌新学HEXO
categories: Web
tags: 
  - web
date: 2019-09-18 10:58:55
---
要创建新帖子或新页面，可以运行以下命令：
```
$ hexo new [layout] <title>
```
post是默认值layout，但您可以提供自己的。您可以通过编辑中的default_layout设置来更改默认布局_config.yml。

布局
有三种默认布局在HEXO： post，page和draft。每个文件创建的文件都保存到不同的路径。新创建的帖子将保存到该source/_posts文件夹中。
```
布局	路径
post	source/_posts
page	source
draft	source/_drafts
```
<!--more-->
不要处理我的帖子！
如果您不希望处理您的帖子，可以layout: false在前面设置。

文档名称
默认情况下，Hexo使用帖子标题作为其文件名。您可以编辑new_post_name设置_config.yml以更改默认文件名。例如，:year-:month-:day-:title.md将为文件名添加帖子创建日期。您可以使用以下占位符：

占位符	描述
```
:title	帖子标题（小写，用连字符替换空格）
:year	创造了一年，例如 2015
:month	创建月份（前导零），例如 04
:i_month	创建月份（没有前导零），例如 4
:day	创建日（前导零），例如 07
:i_day	创建日（没有前导零），例如 7
```
草稿
以前，我们在Hexo中提到了一个特殊的布局：draft。使用此布局初始化的帖子将保存到source/_drafts文件夹中。您可以使用该publish命令将草稿移动到该source/_posts文件夹。publish以与new命令类似的方式工作。
```
$ hexo publish [layout] <title>
```
默认情况下不显示草稿。您可以--draft在运行Hexo时添加该选项，或启用该render_drafts设置_config.yml以呈现草稿。

脚手架
创建帖子时，Hexo将根据文件scaffolds夹中的相应文件构建文件。例如：
```
$ hexo新照片“我的画廊”
```
当您运行此命令时，Hexo将尝试photo.md在该scaffolds文件夹中查找并基于它构建帖子。以下占位符可用于脚手架：
```
占位符	描述
layout	布局
title	标题
date	文件创建日期
```
#新建分类
```
$ hexo new page categories
```

<!--more-->
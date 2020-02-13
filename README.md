## 基于 node 的文档转 sql 文件

### 说明

最近在写数据库字段文档的时候需要将所写的信息转换成 sql 文件，避免手动建表，于是用 node 简单写了一个 demo，以便以后使用。使用该工具需要注意格式，数据库字段文档应该如下格式：

    id int primary key auto_increment 主键
    program_type enum("电影", "电视剧", "动漫", "综艺") 节目类型
    name varchar(255) 节目名称,
    unique(name, program_type)

即：创建表语句时的字段信息 + 字段说明。注意中间用空格隔开。注意字段说明中不允许出现空格（比如中文括号会产生空格）

### 使用

- 1.git clone
- 2.进入根目录执行命令 npm install安装依赖（lodash, express)
- 3.运行命令 node app.js ,根据提示打开浏览器输入网址，然后根据提示生产 sql 文件，sql 文件名与表名一致。生产的 sql 文件会放在 **sqls** 文件夹下。

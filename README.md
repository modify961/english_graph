
下载地址：
[https://neo4j.com/download-center/](https://neo4j.com/download-center/)

JDK17

[Java Downloads | Oracle](https://www.oracle.com/java/technologies/downloads/#jdk17-windows)

下载社区版即可，推荐安装为服务

1、需要先安装JDK17或以上版本
2、配置环境变量，neo4j的安装地址，如：F:\neo4j-5\bin
3、执行 neo4j console(控制台应用程序运行) 或neo4j windows-service install（ Neo4j 安装为服务）
4、浏览地址： [http://localhost:7474](http://localhost:7474/)  默认用户名“neo4j”和默认密码“neo4j”进行连接


技术方案
后端：
    编程语言：Python
    数据库：Neo4j（用于存储知识图谱）
    库：Py2neo（用于与Neo4j交互）
前端：
    框架：React
    库：relation-graph

git地址

React项目创建

npx create-react-app web

启动项目
npm start 

python项目

包安装
pip install neo4j
pip install py2neo




neo4j
登录异常问题
https://blog.csdn.net/Cai_zi_heng/article/details/133764150
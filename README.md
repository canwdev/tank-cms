# node-blog —— Learn Node.js in Action

简介：本项目致力于实现一个基础的博客，使用Express作为Web框架，数据库使用阿里云RDS(MySQL)。

## 初始化项目

全局安装 Express 应用程序生成器：`npm install express-generator -g`

初始化项目：这里使用`ejs`作为模板渲染引擎，`stylus`作为CSS预处理语言

```
express --view ejs --css stylus --git
yarn install
```

## 启动调试

确保全局安装了nodemon：`npm i -g nodemon`

使用VSCode，先 Launch，然后 Attach

或者直接运行`yarn run dev`

## 生产环境

手动部署：将源代码部署至生产环境，运行`yarn run start`启动

自动部署/持续集成：暂无

## 参考

- [Express 文档 - 应用程序生成器](https://expressjs.com/zh-cn/starter/generator.html)
- [Node.js 连接 MySQL - 菜鸟教程](http://www.runoob.com/nodejs/nodejs-mysql.html)
- [async/await封装使用mysql - koa2-note](https://chenshenhai.github.io/koa2-note/note/mysql/async.html)
- [使用Sequelize访问MySQL - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1022910821149312/1101571555324224)
- [Node.JS使用Sequelize操作MySQL](https://www.jianshu.com/p/797e10fe2393)

# TankCMS · 个人版 CMS 开发框架

> 简介：本项目致力于实现一个企业级网站基础框架。使用 Tank 命名，期望这个框架稳定并且机动。 

技术栈：

- 后端：Node.js / Express / MySQL

## 启动项目

配置数据库 `db/config.js`

```sh
yarn install

# 开发环境
npm run dev

# 生产环境
npm run start

# PM2
pm2 start ecosystem.config.js
```

## 部署说明

```sh
yarn install
pm2 start ecosystem.config.js
```

自动化部署：Automate.js（未开源）

## TODOs

TODOs 已移动到文件

## 参考

- [Express 文档 - 应用程序生成器](https://expressjs.com/zh-cn/starter/generator.html)
- [Node.js 连接 MySQL - 菜鸟教程](http://www.runoob.com/nodejs/nodejs-mysql.html)
- [async/await封装使用mysql - koa2-note](https://chenshenhai.github.io/koa2-note/note/mysql/async.html)
- [使用Sequelize访问MySQL - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1022910821149312/1101571555324224)
- [Node.JS使用Sequelize操作MySQL](https://www.jianshu.com/p/797e10fe2393)
 
 

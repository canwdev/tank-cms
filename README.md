# TankCMS · 个人版 CMS 开发框架

> 简介：本项目致力于实现一个个人网站的 CMS 框架。命名为Tank，希望这个框架稳定且机动。 

技术栈：Node.js / Express / MySQL(ORM:Sequelize)

## 启动项目

1. 重命名 `config.example.js` 到 `db/config.js`，并且编辑相应的数据库配置。
2. 新建一个数据库，与配置文件的数据库名对应。初始化数据会自动生成，无需手动配置。

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

自动化部署：[Automate](https://github.com/canwdev/automate)

## 目前已实现的功能

> TODO: 待补充

## 参考

- [Express 文档 - 应用程序生成器](https://expressjs.com/zh-cn/starter/generator.html)
- [Node.js 连接 MySQL - 菜鸟教程](http://www.runoob.com/nodejs/nodejs-mysql.html)
- [async/await封装使用mysql - koa2-note](https://chenshenhai.github.io/koa2-note/note/mysql/async.html)
- [使用Sequelize访问MySQL - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1022910821149312/1101571555324224)
- [Node.JS使用Sequelize操作MySQL](https://www.jianshu.com/p/797e10fe2393)
 
 

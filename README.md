# TankCMS · 个人版 CMS 开发框架

> 简介：本项目致力于实现一个企业级网站基础框架。使用 Tank 命名，期望这个框架稳定并且机动。 

技术栈：

- 后端：Node.js / Express / MySQL

## 启动项目

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

自动化部署：暂无

## TODOs

- [ ] 考虑到需要前后端分离，完善API“代码即文档”
- 功能开发
    - [ ] 基础配置项（站点名称、联系我们信息、SEO信息等）
    - [ ] 特殊栏目页（首页、关于我们等）
    - [ ] 栏目分类（无限级）
    - 资讯功能
        - [X] 资讯列表
        - [ ] 详情
        - [ ] 查询
        - [ ] 依据栏目分类
        - [ ] 依据标签分类
        - [ ] 特殊资讯自定义（如图片列表等）
    - [ ] 用户反馈
    - [ ] 第三方 JS 注入配置（商桥、统计等）
- 研究
    - [ ] 静态化站点生成

## 参考

- [Express 文档 - 应用程序生成器](https://expressjs.com/zh-cn/starter/generator.html)
- [Node.js 连接 MySQL - 菜鸟教程](http://www.runoob.com/nodejs/nodejs-mysql.html)
- [async/await封装使用mysql - koa2-note](https://chenshenhai.github.io/koa2-note/note/mysql/async.html)
- [使用Sequelize访问MySQL - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1022910821149312/1101571555324224)
- [Node.JS使用Sequelize操作MySQL](https://www.jianshu.com/p/797e10fe2393)
 
 

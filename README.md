# TankCMS · 个人版 CMS 开发框架

> 简介：本项目致力于实现一个个人网站的 CMS 框架。命名为Tank，希望这个框架稳定且机动。 

技术栈：Node.js / Express / MySQL(ORM:Sequelize)

## 启动项目

1. 重命名 ``db/config.example.js` 到 `db/config.js`，并且编辑相应的数据库配置。
2. 在 MySQL 新建一个数据库，与配置文件的数据库名对应。初始化数据会自动生成，无需手动配置。

```sh
# 安装依赖
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

自动化部署：[Automate](https://github.com/canwdev/automate)(未开源)

## 目前已实现的功能

全部的 API 路由表：[点此查看](routes/api/index.js)

- Base 接口 `/api`
  - [x] 无限分类菜单的实现 `/menu/list`
  
    - [基础实现](https://segmentfault.com/a/1190000014284076)
    - 内存缓存（memory-cache）
    
  - [x] 网站元数据接口
  
    - Banner 列表：图片、标题、简介、链接 `/banner/list`
    - 基本信息：标题、description、SEO信息`/`
  
  - [x] 加入我们列表 `/recruit/list`
  
    筛选：招聘类别、地区、职位分类
  
    职位：名称、类别、类别、地区
  
  - [ ] 社交媒体列表（关注我们）
  
    标题、二维码、链接
  
  - [ ] 联系我们列表
  
    标题、地址、电子邮件、网址
  
  - [ ] 文章（Post）列表与详情
  
    - [x] 列表 `/post/list`
    - [x] 详情 `/post/detail`
    - [ ] 显示/隐藏
    - [ ] 标签分类/栏目分类
    - [ ] 筛选/查询
  
  - [ ] FAQ 列表
  
    - 问题、答案
  
  - [ ] 订阅功能（表单提交）
  
    - 邮箱、称呼、内容
  
  - [ ] 发展时间轴
  
    - 时间、事件内容
  
- [ ] 服务器发送电子邮件的原理

- [ ] 多用户、多角色的实现

- [x] 后台管理系统登录 `/user`

- [ ] 提交验证码

- [x] 最佳实践

  - [x] 封装全局 res OK、ERROR 处理
  - [x] 全局错误捕获中间件
  - [ ] 不要使用同步函数（`fs.readFileSync`）


## 参考

- [Express 文档 - 应用程序生成器](https://expressjs.com/zh-cn/starter/generator.html)
- [Node.js 连接 MySQL - 菜鸟教程](http://www.runoob.com/nodejs/nodejs-mysql.html)
- [async/await封装使用mysql - koa2-note](https://chenshenhai.github.io/koa2-note/note/mysql/async.html)
- [使用Sequelize访问MySQL - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1022910821149312/1101571555324224)
- [Node.JS使用Sequelize操作MySQL](https://www.jianshu.com/p/797e10fe2393)
- [生产环境最佳实践：性能和可靠性](https://expressjs.com/zh-cn/advanced/best-practice-performance.html)

 

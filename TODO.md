# TankCMS · TODOs

- 官网主要用于展示公司业务、产品、公司信息、甚至服务支持都可以不包括在内，因为现如今很多服务都被拆分到移动APP中，从而导致官网成为展示层面的东西，因此这个项目将实现最基本的功能。

## Backend

- [x] 富文本编辑器工具

- [x] Automate 日志系统使用JSON存储

- 研究OSS API
  
  - [x] 资源上传并获取链接（或直接使用官方工具 oss-browser ）
  
    - oss://obsbot-static-resource-test/picture/test/
    - https://help.aliyun.com/document_detail/32068.html?spm=a2c4g.11186623.3.3.1a5a7070dUxpIg
    - https://blog.csdn.net/zhuming3834/article/details/77531127
    - https://github.com/sikichan/oss-upload-nodejs
  
- 接口
  - [x] 无限菜单的实现
  
    - 基础实现 https://segmentfault.com/a/1190000014284076
    - 内存缓存
    - [x] fix create error
  
  - [x] 网站基本信息配置 /
  
    - Banner 列表：图片、标题、简介、链接
    - 基本信息：标题、description、SEO信息
  
  - [x] 加入我们列表
  
    筛选：招聘类别、地区、职位分类
  
    职位：名称、类别、类别、地区
  
  - [ ] 社交媒体列表（关注我们）
  
    标题、二维码、链接
  
  - [ ] 联系我们列表
  
    标题、地址、电子邮件、网址
  
  - [ ] 文章（Post）列表与详情
  
    - [x] 列表与详情
    - [x] 显示/隐藏
    - [ ] 标签分类/栏目分类
    - [x] 筛选/查询
  
  - [ ] FAQ 列表
  
    问题、答案
  
  - [ ] 订阅功能（表单提交）
  
    邮箱、称呼、内容
  
  - [ ] 公司发展时间轴
  
    时间、事件内容
  
- [ ] 研究服务器发送电子邮件的原理（能否使用腾讯企业邮箱发送），订阅后自动发送邮件

  当用户提交了订阅表单后，发送一封欢迎邮件

- [ ] 研究多用户、多角色的实现

- [ ] 登录与表单提交验证码

- [ ] 完善API“代码即文档”

- [ ] 研究静态化站点生成

- [ ] [生产环境最佳实践：性能和可靠性](https://expressjs.com/zh-cn/advanced/best-practice-performance.html)

  - [x] 封装全局 res OK、ERROR 处理
  - [x] 全局错误捕获中间件
  - [ ] 不要使用同步函数（`fs.readFileSync`）

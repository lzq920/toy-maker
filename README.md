# toy-maker

基于 Vue3.x 编写的可拖拽落地页工具生成工具，可直接部署到 GitHub Pages 服务或者下载静态文件到本地进行部署
> 主要使用 Vue3.x Vue-Router4.x Vuex4.x Element-Plus Tailwindcss 等库开发
>
> 可视化操作，拖拽生成页面，导出```HTML```文件
>
> toy-maker 是一个纯前端项目，数据采用```腾讯云CloudBase```存储

### 预览地址

[toy-maker](https://toy-maker.vercel.app/)
![image](https://cdn.jsdelivr.net/gh/lzq920/picx-image-host@master/20210325/image.2lvatjhnm280.png)
![image](https://cdn.jsdelivr.net/gh/lzq920/picx-image-host@master/20210325/image.635xpu7w3ik0.png)
![image](https://cdn.jsdelivr.net/gh/lzq920/picx-image-host@master/20210325/image.2lvatjhnm280.png)

### 安装入门

```
git clone https://github.com/lzq920/toy-maker.git
cd toy-maker
npm install  //安装依赖包
npm run generator //生成落地页组件包
npm run serve //本地开发预览
npm run build //构建生产环境资源
```

### 腾讯云 CloudBase 配置

- 数据库集合
    - toy-maker-form-data 所有用户可读，仅管理员可写 表单收集表
    - toy-maker-pages 仅创建者及管理员可读写 落地页数据表
    - toy-maker-publish 仅创建者及管理员可读写 发布记录表
- 安全域名配置
    - toy-maker 项目部署的域名
    - toy-maker 落地页发布的域名

- 云函数
    - getFormList.js 获取所有的表单数据
      ```javascript
        'use strict';
        const cloudbase = require("@cloudbase/node-sdk");
        const app = cloudbase.init({
        env: cloudbase.SYMBOL_CURRENT_ENV
        });
        const db = app.database();
        const $ = db.command;
        exports.main = async (event, context) => {
                const { userInfo } = await app.auth().getEndUserInfo();
                const { openId, appId, uid, customUserId } = userInfo;
                const res = await db.collection('toy-maker-pages').aggregate().match({
                    _openid: uid
                }).lookup({
                    from: "toy-maker-form-data",
                    localField: "_id",
                    foreignField: "pageId",
                    as: "formList"
                }).project({
                    allItems: 0,
                    canvasSetting: 0,
                    dataSource: 0,
                }).end()
                return res.data;
        };
  
      ```
    - submit.js 表单提交 (需要配置 http 服务,并修改 src/components/blocks/form/index.vue 中的提交地址)
      ```javascript
      
      'use strict';
      const cloudbase = require("@cloudbase/node-sdk");
      const app = cloudbase.init({
      env: cloudbase.SYMBOL_CURRENT_ENV
      });
      const db = app.database();
      exports.main = async (event, context) => {
              if (event.httpMethod === "POST") {
                  const res = await db.collection("toy-maker-form-data").add(JSON.parse(event.body))
                  return res
              } else {
                  return '非法请求'
              }
      };
  
      ```

### 主要功能介绍

- [x] 元素自由拖拽、放大、缩小
- [x] 可添加图片、单行文本、多行文本、视频、音频、矩形、图表、表单、二维码、Lottie动画组件（更多组件拓展中）
- [x] 组件自动吸附，实时参考线
- [x] 撤销、重做 ( Ctrl + Z / Ctrl + Y )
- [x] 组件复制、粘贴 ( Ctrl + C / Ctrl + V )
- [x] 组件删除 ( Backspace / Delete )
- [x] 组件层级上移下移( Alt + ↑ / Alt + ↓ )
- [x] 组件预览 (Ctrl + P)
- [x] 画布大小自适应组件位置
- [x] 上传 PSD 文件自动解析
- [x] 默认配置数据源, 可通过 ```#{{path.path}}```默认填充指定数据
- [x] 一键导出 HTML 文件
- [x] 一键发布到Github Pages
- [x] 接入第三方图库以及视频库
- [x] 组件动画
- [x] 落地页发布记录
- [x] 落地页表单数据收集

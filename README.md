# 开心金融技术公司官网

这是一个零依赖的静态企业官网模板，使用原生 HTML、CSS 和 JavaScript 构建，适合直接发布到 GitHub Pages、Cloudflare Pages 或其他静态托管服务。

## 本地预览

无需安装依赖，直接打开 `index.html` 即可预览。为了更接近线上环境，也可以在项目目录启动任意静态文件服务器，例如：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 发布

### GitHub Pages

1. 将仓库推送到 GitHub。
2. 在仓库的 **Settings → Pages** 中选择 `Deploy from a branch`。
3. 选择默认分支和 `/ (root)` 目录并保存。

### Cloudflare Pages

1. 在 Cloudflare Pages 中连接该 GitHub 仓库。
2. 构建命令留空，输出目录填写 `/` 或项目根目录。
3. 保存并部署。

页面不依赖外部构建工具；正文固定使用 Noto Sans SC，英文数据标签固定使用 DM Mono，不配置本地系统字体回退链。字体通过 Google Fonts 加载。

## 说明

- 页面文案、品牌名和图形均为开心金融技术公司的演示内容，后续可直接替换成真实业务信息。
- 页面按钮和表单均为演示态，不会跳转到外部地址，也不会向外部服务发送数据。
- 视觉方向参考了企业官网常见的信息层级，以及 Huawei 中国官网的“业务导航、推荐内容、行业实践、公司介绍”组织方式；没有复用其品牌资源或页面代码。

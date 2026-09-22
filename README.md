# 开心科技金融公司官网

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

页面不依赖外部构建工具；使用中文系统字体回退链和原生 CSS/SVG 图形，不依赖外部图片或第三方字体才能完成首屏渲染。

## 说明

- 页面文案、品牌名和图形均为开心科技金融公司的演示内容，后续可直接替换成真实业务信息。
- 页面按钮和表单均为演示态，不会跳转到外部地址，也不会向外部服务发送数据。
- 视觉方向参考了 `HAPPY_FINANCE_REDESIGN_BRIEF.md` 与本地参考页面的首屏、产品入口、指标区和产品矩阵节奏；没有复用参考站的品牌资源或页面代码。

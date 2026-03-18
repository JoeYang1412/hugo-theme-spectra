---
title: "快速上手 Spectra 主題"
date: 2025-01-05
draft: false
tags: [Hugo, 設定, 教學]
math: false
cover: "images/demo02.jpg"
toc: true
description: "從安裝到部署，一步步完成 Spectra 主題的所有設定，包含導覽選單、社群連結與多語言。"
---

## 安裝

將主題加入你的 Hugo 專案，推薦使用 git submodule 方式管理：

```bash
cd your-site
git submodule add https://github.com/your-account/hugo-theme-spectra themes/hugo-theme-spectra
```

接著在 `hugo.toml` 設定主題名稱：

```toml
theme = 'hugo-theme-spectra'
```

## 設定導覽選單

選單透過 `hugo.toml` 的 `[[menus.main]]` 陣列設定，`pre` 欄位為圖示字元：

```toml
[[languages.zh-tw.menus.main]]
  name   = "首頁"
  url    = "/"
  weight = 1
  pre    = "⌂"

[[languages.zh-tw.menus.main]]
  name   = "文章"
  url    = "/posts/"
  weight = 2
  pre    = "✎"
```

## 設定社群連結

社群連結使用 `[[params.social]]` 陣列，主題內建 12 個平台圖示：

```toml
[[languages.zh-tw.params.social]]
  name = "GitHub"
  url  = "https://github.com/your-account"

[[languages.zh-tw.params.social]]
  name = "Twitter"
  url  = "https://x.com/your-account"
```

支援的平台：`GitHub`、`Twitter`/`X`、`HackMD`、`LinkedIn`、`Email`、`RSS`、`Mastodon`、`YouTube`、`Instagram`、`Facebook`、`Discord`、`Threads`。

## Front Matter 範本

每篇文章支援以下 front matter：

```yaml
---
title: "文章標題"
date: 2025-01-01
draft: false
tags: [tag1, tag2]
math: false        # true 則載入 KaTeX
cover: ""          # 封面圖 URL（可留空）
toc: true          # 顯示文章目錄
description: ""    # 摘要，顯示於卡片
---
```

## 部署到 GitHub Pages

專案根目錄建立 `.github/workflows/hugo.yml`，GitHub Actions 會在每次 push 時自動建置並部署。

詳細步驟參考 [Hugo 官方文件](https://gohugo.io/hosting-and-deployment/hosting-on-github/)。

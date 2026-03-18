---
title: "Hugo 深入探索 — 第一篇：專案結構"
date: 2025-02-01
draft: false
tags: [Hugo, Tutorial, Go]
series: [Hugo Deep Dive]
math: false
cover: "images/demo04.jpg"
toc: true
description: "了解 Hugo 如何組織內容、主題和設定檔。"
---

## Hugo 專案結構

一個典型的 Hugo 專案有以下結構：

```
my-site/
├── archetypes/
├── assets/
├── content/
│   └── posts/
├── data/
├── layouts/
├── static/
├── themes/
└── hugo.toml
```

每個目錄在 Hugo 建構流程中都有特定的用途。

## Content 目錄

`content/` 資料夾存放所有的 Markdown 檔案。Hugo 使用目錄結構來決定 URL 路徑：

```
content/
├── posts/
│   ├── hello-world.md     → /posts/hello-world/
│   └── getting-started.md → /posts/getting-started/
├── about/
│   └── _index.md          → /about/
└── _index.md              → /
```

### Front Matter

每個內容檔案都以 front matter 開頭 — 使用 YAML、TOML 或 JSON 格式的中繼資料：

```yaml
---
title: "我的文章"
date: 2025-01-01
draft: false
tags: [Hugo, Tutorial]
---
```

Hugo 利用這些中繼資料進行排序、篩選、分類頁面等功能。

## Layouts 目錄

Layouts 定義了內容如何渲染成 HTML。Hugo 使用 **查找順序** 來匹配內容與模板：

1. `layouts/posts/single.html` — 用於單篇文章
2. `layouts/_default/single.html` — 任何單頁的後備方案
3. `layouts/_default/baseof.html` — 基礎模板

```go-html-template
{{ define "main" }}
<article>
  <h1>{{ .Title }}</h1>
  <div class="content">{{ .Content }}</div>
</article>
{{ end }}
```

## Static 目錄

`static/` 中的檔案會直接複製到輸出目錄，不經任何處理。適用於：

- Favicon 檔案
- 字體
- 預先優化的圖片
- 下載檔案（PDF 等）

## 下一步

在[第二篇](../series-hugo-templates/)中，我們將深入探索 Hugo 的模板系統 — 包括 partials、blocks 和 shortcodes。

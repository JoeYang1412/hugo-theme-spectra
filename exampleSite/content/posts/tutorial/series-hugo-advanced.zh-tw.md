---
title: "Hugo 深入探索 — 第三篇：進階功能"
date: 2025-02-15
draft: false
tags: [Hugo, Tutorial, Go, Configuration]
series: [Hugo Deep Dive]
math: false
cover: "images/demo05.jpg"
toc: true
description: "探索 Hugo 的分類法、相關內容、多語言支援和部署策略。"
---

## 分類法（Taxonomies）

分類法讓你對內容進行分類。Hugo 支援除了標籤和分類之外的自訂分類法：

```toml
[taxonomies]
  tag = 'tags'
  category = 'categories'
  series = 'series'
```

然後在 front matter 中：

```yaml
---
tags: [Hugo, Go]
series: [Hugo Deep Dive]
---
```

Hugo 會自動在 `/tags/`、`/categories/`、`/series/` 等路徑產生各分類的列表頁面。

### 分類模板

你可以自訂分類頁面的外觀：

```go-html-template
{{/* layouts/_default/terms.html */}}
{{ define "main" }}
<h1>{{ .Title }}</h1>
<ul>
  {{ range .Pages }}
  <li>
    <a href="{{ .RelPermalink }}">{{ .Title }}</a>
    <span>({{ len .Pages }} 篇文章)</span>
  </li>
  {{ end }}
</ul>
{{ end }}
```

## 相關內容

Hugo 可以根據共同的分類、日期和自訂參數來找到相關內容：

```toml
[related]
  includeNewer = true
  threshold = 50
  toLower = true
  [[related.indices]]
    name = "tags"
    weight = 80
  [[related.indices]]
    name = "categories"
    weight = 60
```

在模板中使用：

```go-html-template
{{ $related := first 3 (.Site.RegularPages.Related .) }}
{{ range $related }}
  <a href="{{ .RelPermalink }}">{{ .Title }}</a>
{{ end }}
```

## 多語言支援

Hugo 擁有一流的多語言支援。在 `hugo.toml` 中設定語言：

```toml
[languages]
  [languages.en]
    languageName = 'English'
    weight = 1
  [languages.zh-tw]
    languageName = '繁體中文'
    weight = 2
```

內容檔案使用語言後綴：

```
content/posts/
├── my-post.en.md
└── my-post.zh-tw.md
```

### 翻譯字串

使用 `i18n` 檔案進行 UI 翻譯：

```toml
# i18n/en.toml
[read_more]
other = "Read more"

# i18n/zh-tw.toml
[read_more]
other = "閱讀更多"
```

## 部署

### GitHub Pages

最常見的部署方式使用 GitHub Actions：

```yaml
# .github/workflows/hugo.yml
name: Deploy Hugo
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: peaceiris/actions-hugo@v3
      - run: hugo --minify
      - uses: peaceiris/actions-gh-pages@v4
```

### 建構優化

使用 `hugo --minify` 進行正式建構。Hugo 還可以：

- 為資源加上指紋以清除快取
- 壓縮 HTML、CSS 和 JavaScript
- 處理圖片（調整大小、裁切、轉換為 WebP）

## 系列總結

我們的三篇 Hugo 深入探索系列到此結束。我們涵蓋了：

1. **專案結構** — Hugo 如何組織檔案
2. **模板系統** — partials、blocks 和 pipes
3. **進階功能** — 分類法、國際化和部署

祝你建構愉快！

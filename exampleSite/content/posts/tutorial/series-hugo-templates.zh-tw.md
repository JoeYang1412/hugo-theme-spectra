---
title: "Hugo 深入探索 — 第二篇：模板系統"
date: 2025-02-08
draft: false
tags: [Hugo, Tutorial, Go]
series: [Hugo Deep Dive]
math: false
cover: "images/demo03.jpg"
toc: true
description: "掌握 Hugo 的模板系統 — partials、blocks 和查找順序。"
---

## 模板基礎

Hugo 模板使用 Go 的 `html/template` 套件，並提供額外的函式。所有模板都可以存取一個 **上下文**（點號 `.`），它會根據正在渲染的內容而改變。

### 基礎模板

`baseof.html` 模板定義了整體頁面結構：

```go-html-template
<!DOCTYPE html>
<html>
<head>
  {{- partial "head.html" . -}}
</head>
<body>
  {{- block "main" . }}{{ end -}}
  {{- partial "scripts.html" . -}}
</body>
</html>
```

### 定義 Blocks

子模板使用 `define` 來覆寫 blocks：

```go-html-template
{{ define "main" }}
<main>
  <h1>{{ .Title }}</h1>
  {{ .Content }}
</main>
{{ end }}
```

## Partials

Partials 是可重用的模板片段，它們接受一個上下文參數：

```go-html-template
{{/* In layouts/partials/post-meta.html */}}
<div class="meta">
  <time>{{ .Date.Format "2006-01-02" }}</time>
  {{ range .Params.tags }}
    <span class="tag">{{ . }}</span>
  {{ end }}
</div>
```

從任何模板中呼叫 partial：

```go-html-template
{{ partial "post-meta.html" . }}
```

## 模板函式

Hugo 提供了數百個模板函式。以下是一些常用的：

| 函式 | 用途 | 範例 |
|------|------|------|
| `range` | 遍歷集合 | `{{ range .Pages }}` |
| `with` | 重新綁定上下文 | `{{ with .Params.cover }}` |
| `partial` | 引入 partial | `{{ partial "name" . }}` |
| `first` | 取前 N 筆 | `{{ first 5 .Pages }}` |
| `where` | 篩選集合 | `{{ where .Pages "Section" "posts" }}` |

## Hugo Pipes

Hugo Pipes 在建構時處理資源（SCSS、JS、圖片）：

```go-html-template
{{ $css := resources.Get "css/main.scss" | toCSS | minify | fingerprint }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}">
```

這讓你無需任何外部建構工具就能進行 SCSS 編譯、壓縮和快取清除。

## 下一步

在[第三篇](../series-hugo-advanced/)中，我們將介紹進階主題：分類法、相關內容和多語言設定。

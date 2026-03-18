---
title: "從零開始建構 Hugo 主題"
date: 2025-03-01
draft: false
tags: [Hugo, Tutorial, Code, Configuration]
math: false
cover: ""
toc: true
description: "完整的 Hugo 自訂主題建構指南 — 從專案設定到部署。涵蓋排版、SCSS、JavaScript 和圖片處理。"
---

## 為什麼要自建主題？

Hugo 有數百個社群主題，但自建主題讓你完全掌控設計、效能和功能。這篇指南將帶你走過整個流程 — 附帶圖解和程式碼範例。

## 規劃架構

在寫程式碼之前，先規劃主題的架構。這是建構流程：

![Hugo 建構流程](/images/sample-architecture.svg)

Hugo 將你的內容（Markdown）、模板（HTML）和資源（SCSS/JS）通過引擎處理，在 `public/` 目錄中輸出靜態 HTML 檔案。

### 目錄結構

一個組織良好的主題遵循 Hugo 慣例：

```
my-theme/
├── archetypes/
│   └── default.md
├── assets/
│   ├── css/
│   │   ├── main.scss
│   │   ├── _variables.scss
│   │   ├── _base.scss
│   │   └── _components.scss
│   └── js/
│       └── main.js
├── layouts/
│   ├── _default/
│   │   ├── baseof.html
│   │   ├── list.html
│   │   └── single.html
│   └── partials/
│       ├── head.html
│       └── scripts.html
├── static/
│   └── images/
└── theme.toml
```

## 設定開發環境

首先建立主題骨架：

```bash
hugo new theme my-theme
```

這會產生基本的目錄結構。然後建立一個範例網站來測試：

```bash
mkdir exampleSite
cd exampleSite
hugo new site . --force
```

這是典型的開發終端機畫面：

![終端機執行 Hugo 伺服器](/images/sample-terminal.svg)

## 建構模板層

### 基礎模板

每個 Hugo 主題都從 `baseof.html` 開始。這是包裹所有頁面的外殼：

```go-html-template {linenos=true}
<!DOCTYPE html>
<html lang="{{ .Site.Language.Lang }}">
<head>
  {{- partial "head.html" . -}}
</head>
<body>
  {{- partial "sidebar.html" . -}}
  <div class="site-wrapper">
    {{- block "main" . }}{{ end -}}
  </div>
  {{- partial "scripts.html" . -}}
</body>
</html>
```

### 列表模板

列表模板渲染歸檔頁面和章節索引：

```go-html-template {linenos=true,hl_lines=["6-12"]}
{{ define "main" }}
<main class="content-main">
  <h1 class="page-title">{{ .Title }}</h1>
  <div class="post-list">
    {{ range .Paginator.Pages }}
    <article class="post-card">
      <a href="{{ .RelPermalink }}">
        <h2>{{ .Title }}</h2>
        <time>{{ .Date.Format "2006-01-02" }}</time>
        <p>{{ .Description }}</p>
      </a>
    </article>
    {{ end }}
  </div>
  {{ template "_internal/pagination.html" . }}
</main>
{{ end }}
```

### 單篇文章模板

單頁模板處理個別文章：

```go-html-template {linenos=true}
{{ define "main" }}
<article class="article-content">
  <header>
    <h1>{{ .Title }}</h1>
    {{ partial "post-meta.html" . }}
  </header>
  {{ .Content }}
  <footer>
    {{ partial "share-buttons.html" . }}
    {{ partial "related-posts.html" . }}
  </footer>
</article>
{{ end }}
```

## 使用 SCSS 設計樣式

Hugo Pipes 無需外部工具即可處理 SCSS 編譯。以下是樣式的組織方式：

### CSS 自訂屬性

將設計 token 定義為 CSS 自訂屬性，方便主題化：

<!-- file: assets/css/_variables.scss -->
```scss {linenos=true}
:root {
  --bg-primary: #f0f2f8;
  --bg-surface: #ffffff;
  --text-primary: #1c1e26;
  --text-secondary: #3a4050;
  --accent: #4a7de0;
  --accent-warm: #e8609e;
  --border: rgba(74, 125, 224, 0.18);
  --radius: 14px;
  --transition: 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
}

[data-theme="dark"] {
  --bg-primary: #0b0f19;
  --bg-surface: #1a2338;
  --text-primary: #e4e8f1;
  --text-secondary: #b0b8c8;
  --accent: #5b8dee;
  --accent-warm: #f472b6;
  --border: rgba(91, 141, 238, 0.2);
}
```

### 元件樣式

建立可重用的元件樣式：

<!-- file: assets/css/_components.scss -->
```scss
.post-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  transition: all var(--transition);

  &:hover {
    border-color: var(--accent);
    box-shadow: 0 0 24px var(--accent-glow);
    transform: translateY(-2px);
  }
}
```

## 加入 JavaScript 功能

保持 JavaScript 最小化和原生。使用 IIFE 避免污染全域範圍：

### 範例：程式碼複製按鈕

![帶有複製按鈕的程式碼區塊](/images/sample-code.svg)

程式碼複製按鈕的實作：

<!-- file: assets/js/code-copy.js -->
```javascript {linenos=true,hl_lines=["8-11"]}
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var highlights = document.querySelectorAll('.highlight');

    highlights.forEach(function (block) {
      var copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy';
      copyBtn.addEventListener('click', function () {
        var code = block.querySelector('code');
        navigator.clipboard.writeText(code.textContent);
      });
      block.appendChild(copyBtn);
    });
  });
})();
```

### 範例：主題切換

```javascript
(function () {
  var toggle = document.getElementById('themeToggle');
  var root = document.documentElement;

  // 檢查儲存的偏好或系統設定
  var saved = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = saved || (prefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', theme);

  toggle.addEventListener('click', function () {
    var current = root.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();
```

## 效能優化

Hugo 主題應預設快速。關鍵策略：

### 資源管線

```go-html-template
{{/* 編譯 SCSS、壓縮、加指紋 */}}
{{ $css := resources.Get "css/main.scss"
  | toCSS (dict "targetPath" "css/style.css")
  | minify
  | fingerprint }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}"
      integrity="{{ $css.Data.Integrity }}">
```

### 圖片處理

Hugo 可以在建構時調整大小和轉換圖片：

```go-html-template
{{ with .Resources.GetMatch "cover.*" }}
  {{ $img := .Fill "800x400 webp q80" }}
  <img src="{{ $img.RelPermalink }}"
       width="{{ $img.Width }}"
       height="{{ $img.Height }}"
       loading="lazy"
       decoding="async"
       alt="{{ $.Title }}">
{{ end }}
```

### Lighthouse 目標

一個良好的 Hugo 主題應達到：

| 指標 | 目標 | 原因 |
|------|------|------|
| 效能 | > 90 | 靜態網站應該要快 |
| 無障礙 | > 90 | 語意化 HTML + ARIA |
| 最佳實踐 | > 90 | HTTPS、無主控台錯誤 |
| SEO | > 90 | Meta 標籤、網站地圖、結構化資料 |

## 測試主題

### 本地開發

```bash
cd exampleSite
hugo server -D --bind 0.0.0.0 --themesDir ../..
```

### 正式建構

```bash
hugo --minify --gc
```

`--gc` 旗標會清理未使用的快取項目。

### 檢查清單

發布主題之前，確認：

- 深色/淺色模式正確運作
- 所有斷點的行動裝置響應式設計
- 程式碼區塊正確渲染語法高亮
- 圖片延遲載入並在燈箱中顯示
- 搜尋功能涵蓋所有內容
- RSS feed 驗證通過
- 所有頁面渲染無 Hugo 警告
- `hugo --minify` 建構無錯誤

## 結語

建構 Hugo 主題是網頁基礎知識的絕佳練習。你完全掌控 HTML、CSS 和 JavaScript，不需要建構工具或框架的額外負擔。結果是一個快速、易維護且完全可自訂的部落格。

> 最好的主題是你完全理解的主題。

祝你主題化愉快！

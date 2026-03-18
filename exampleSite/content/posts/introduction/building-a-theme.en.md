---
title: "Building a Hugo Theme from Scratch"
date: 2025-03-01
draft: false
tags: [Hugo, Tutorial, Code, Configuration]
math: false
cover: ""
toc: true
description: "A comprehensive guide to building a custom Hugo theme — from project setup to deployment. Covers layouts, SCSS, JavaScript, and image handling."
---

## Why Build a Custom Theme?

Hugo has hundreds of community themes, but building your own gives you full control over design, performance, and features. This guide walks through the entire process — with diagrams and code examples.

## Planning the Architecture

Before writing code, plan your theme's architecture. Here's the build pipeline:

![Hugo Build Pipeline](/images/sample-architecture.svg)

Hugo takes your content (Markdown), templates (HTML), and assets (SCSS/JS), processes them through its engine, and outputs static HTML files in the `public/` directory.

### Directory Structure

A well-organized theme follows Hugo conventions:

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

## Setting Up the Development Environment

Start by creating the theme scaffold:

```bash
hugo new theme my-theme
```

This generates the basic directory structure. Then create an example site to test:

```bash
mkdir exampleSite
cd exampleSite
hugo new site . --force
```

Here's what a typical development terminal looks like:

![Terminal running Hugo server](/images/sample-terminal.svg)

## Building the Template Layer

### The Base Template

Every Hugo theme starts with `baseof.html`. This is the shell that wraps all pages:

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

### List Template

The list template renders archive pages and section indexes:

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

### Single Post Template

The single page template handles individual posts:

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

## Styling with SCSS

Hugo Pipes handles SCSS compilation without external tools. Here's how to structure your styles:

### CSS Custom Properties

Define your design tokens as CSS custom properties for easy theming:

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

### Component Styles

Build reusable component styles:

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

## Adding JavaScript Features

Keep JavaScript minimal and vanilla. Use IIFEs to avoid polluting the global scope:

### Example: Code Copy Button

![Code block with copy button](/images/sample-code.svg)

The code copy button implementation:

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

### Example: Theme Toggle

```javascript
(function () {
  var toggle = document.getElementById('themeToggle');
  var root = document.documentElement;

  // Check saved preference or system setting
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

## Performance Optimization

Hugo themes should be fast by default. Key strategies:

### Asset Pipeline

```go-html-template
{{/* Compile SCSS, minify, and fingerprint */}}
{{ $css := resources.Get "css/main.scss"
  | toCSS (dict "targetPath" "css/style.css")
  | minify
  | fingerprint }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}"
      integrity="{{ $css.Data.Integrity }}">
```

### Image Processing

Hugo can resize and convert images at build time:

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

### Lighthouse Targets

A well-built Hugo theme should achieve:

| Metric | Target | Why |
|--------|--------|-----|
| Performance | > 90 | Static sites should be fast |
| Accessibility | > 90 | Semantic HTML + ARIA |
| Best Practices | > 90 | HTTPS, no console errors |
| SEO | > 90 | Meta tags, sitemap, structured data |

## Testing Your Theme

### Local Development

```bash
cd exampleSite
hugo server -D --bind 0.0.0.0 --themesDir ../..
```

### Production Build

```bash
hugo --minify --gc
```

The `--gc` flag cleans up unused cache entries.

### Checklist

Before publishing your theme, verify:

- Dark/Light mode works correctly
- Mobile responsive at all breakpoints
- Code blocks render with proper syntax highlighting
- Images load lazily and display in lightbox
- Search works across all content
- RSS feed validates
- All pages render without Hugo warnings
- `hugo --minify` builds without errors

## Conclusion

Building a Hugo theme is a rewarding exercise in web fundamentals. You get full control over HTML, CSS, and JavaScript without the overhead of build tools or frameworks. The result is a fast, maintainable, and fully customizable blog.

> The best theme is the one you understand completely.

Happy theming!

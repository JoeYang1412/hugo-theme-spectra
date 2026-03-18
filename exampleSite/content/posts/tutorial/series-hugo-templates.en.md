---
title: "Hugo Deep Dive — Part 2: Template System"
date: 2025-02-08
draft: false
tags: [Hugo, Tutorial, Go]
series: [Hugo Deep Dive]
math: false
cover: "images/demo03.jpg"
toc: true
description: "Mastering Hugo's template system — partials, blocks, and the lookup order."
---

## Template Basics

Hugo templates use Go's `html/template` package with additional functions. All templates have access to a **context** (the dot `.`), which changes based on what is being rendered.

### The Base Template

The `baseof.html` template defines the overall page structure:

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

### Defining Blocks

Child templates override blocks using `define`:

```go-html-template
{{ define "main" }}
<main>
  <h1>{{ .Title }}</h1>
  {{ .Content }}
</main>
{{ end }}
```

## Partials

Partials are reusable template fragments. They accept a context parameter:

```go-html-template
{{/* In layouts/partials/post-meta.html */}}
<div class="meta">
  <time>{{ .Date.Format "2006-01-02" }}</time>
  {{ range .Params.tags }}
    <span class="tag">{{ . }}</span>
  {{ end }}
</div>
```

Call a partial from any template:

```go-html-template
{{ partial "post-meta.html" . }}
```

## Template Functions

Hugo provides hundreds of template functions. Here are some essential ones:

| Function | Purpose | Example |
|----------|---------|---------|
| `range` | Iterate collections | `{{ range .Pages }}` |
| `with` | Rebind context | `{{ with .Params.cover }}` |
| `partial` | Include partial | `{{ partial "name" . }}` |
| `first` | Take first N items | `{{ first 5 .Pages }}` |
| `where` | Filter collections | `{{ where .Pages "Section" "posts" }}` |

## Hugo Pipes

Hugo Pipes process assets (SCSS, JS, images) at build time:

```go-html-template
{{ $css := resources.Get "css/main.scss" | toCSS | minify | fingerprint }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}">
```

This gives you SCSS compilation, minification, and cache-busting without any external build tools.

## What's Next

In [Part 3](../series-hugo-advanced/), we'll cover advanced topics: taxonomies, related content, and multilingual configuration.

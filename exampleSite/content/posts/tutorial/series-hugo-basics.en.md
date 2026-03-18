---
title: "Hugo Deep Dive — Part 1: Project Structure"
date: 2025-02-01
draft: false
tags: [Hugo, Tutorial, Go]
series: [Hugo Deep Dive]
math: false
cover: "images/demo04.jpg"
toc: true
description: "Understanding how Hugo organizes content, themes, and configuration files."
---

## Hugo Project Structure

A typical Hugo project has the following structure:

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

Each directory has a specific purpose in the Hugo build pipeline.

## The Content Directory

The `content/` folder holds all your Markdown files. Hugo uses the directory structure to determine the URL path:

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

Every content file starts with front matter — metadata in YAML, TOML, or JSON:

```yaml
---
title: "My Post"
date: 2025-01-01
draft: false
tags: [Hugo, Tutorial]
---
```

Hugo uses this metadata for sorting, filtering, taxonomy pages, and more.

## The Layouts Directory

Layouts define how content is rendered into HTML. Hugo uses a **lookup order** to match content with templates:

1. `layouts/posts/single.html` — for a single post
2. `layouts/_default/single.html` — fallback for any single page
3. `layouts/_default/baseof.html` — the base template

```go-html-template
{{ define "main" }}
<article>
  <h1>{{ .Title }}</h1>
  <div class="content">{{ .Content }}</div>
</article>
{{ end }}
```

## The Static Directory

Files in `static/` are copied directly to the output without processing. Use it for:

- Favicon files
- Fonts
- Pre-optimized images
- Downloads (PDFs, etc.)

## What's Next

In [Part 2](../series-hugo-templates/), we'll explore Hugo's template system in depth — including partials, blocks, and shortcodes.

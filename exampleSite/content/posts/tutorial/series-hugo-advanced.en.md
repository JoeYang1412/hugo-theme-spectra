---
title: "Hugo Deep Dive — Part 3: Advanced Features"
date: 2025-02-15
draft: false
tags: [Hugo, Tutorial, Go, Configuration]
series: [Hugo Deep Dive]
math: false
cover: "images/demo05.jpg"
toc: true
description: "Exploring Hugo's taxonomies, related content, multilingual support, and deployment strategies."
---

## Taxonomies

Taxonomies let you classify content. Hugo supports custom taxonomies beyond tags and categories:

```toml
[taxonomies]
  tag = 'tags'
  category = 'categories'
  series = 'series'
```

Then in your front matter:

```yaml
---
tags: [Hugo, Go]
series: [Hugo Deep Dive]
---
```

Hugo automatically generates listing pages for each taxonomy term at `/tags/`, `/categories/`, `/series/`, etc.

### Taxonomy Templates

You can customize how taxonomy pages look:

```go-html-template
{{/* layouts/_default/terms.html */}}
{{ define "main" }}
<h1>{{ .Title }}</h1>
<ul>
  {{ range .Pages }}
  <li>
    <a href="{{ .RelPermalink }}">{{ .Title }}</a>
    <span>({{ len .Pages }} posts)</span>
  </li>
  {{ end }}
</ul>
{{ end }}
```

## Related Content

Hugo can find related content based on shared taxonomies, dates, and custom parameters:

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

In your template:

```go-html-template
{{ $related := first 3 (.Site.RegularPages.Related .) }}
{{ range $related }}
  <a href="{{ .RelPermalink }}">{{ .Title }}</a>
{{ end }}
```

## Multilingual Support

Hugo has first-class multilingual support. Configure languages in `hugo.toml`:

```toml
[languages]
  [languages.en]
    languageName = 'English'
    weight = 1
  [languages.zh-tw]
    languageName = '繁體中文'
    weight = 2
```

Content files use a language suffix:

```
content/posts/
├── my-post.en.md
└── my-post.zh-tw.md
```

### Translation Strings

Use `i18n` files for UI translations:

```toml
# i18n/en.toml
[read_more]
other = "Read more"

# i18n/zh-tw.toml
[read_more]
other = "閱讀更多"
```

## Deployment

### GitHub Pages

The most common deployment method uses GitHub Actions:

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

### Build Optimization

Use `hugo --minify` for production builds. Hugo can also:

- Fingerprint assets for cache busting
- Minify HTML, CSS, and JavaScript
- Process images (resize, crop, convert to WebP)

## Series Conclusion

This concludes our three-part Hugo Deep Dive series. We've covered:

1. **Project Structure** — how Hugo organizes files
2. **Template System** — partials, blocks, and pipes
3. **Advanced Features** — taxonomies, i18n, and deployment

Happy building!

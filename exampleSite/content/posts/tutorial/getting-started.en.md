---
title: "Getting Started with Spectra"
date: 2025-01-05
draft: false
tags: [Hugo, Configuration, Tutorial]
math: false
cover: "images/demo02.jpg"
toc: true
description: "From installation to deployment — a complete guide to configuring the Spectra theme, including menus, social links, and multilingual setup."
---

## Installation

Add the theme to your Hugo project using git submodule:

```bash
cd your-site
git submodule add https://github.com/your-account/hugo-theme-spectra themes/hugo-theme-spectra
```

Then set the theme in `hugo.toml`:

```toml
theme = 'hugo-theme-spectra'
```

## Navigation Menu

Menus are configured via `[[menus.main]]` arrays in `hugo.toml`. The `pre` field is used for icon characters:

```toml
[[languages.en.menus.main]]
  name   = "Home"
  url    = "/"
  weight = 1
  pre    = "⌂"

[[languages.en.menus.main]]
  name   = "Blog"
  url    = "/posts/"
  weight = 2
  pre    = "✎"
```

## Social Links

Social links use a `[[params.social]]` array. The theme has built-in icons for 12 platforms:

```toml
[[languages.en.params.social]]
  name = "GitHub"
  url  = "https://github.com/your-account"

[[languages.en.params.social]]
  name = "Twitter"
  url  = "https://x.com/your-account"
```

Supported platforms: `GitHub`, `Twitter`/`X`, `HackMD`, `LinkedIn`, `Email`, `RSS`, `Mastodon`, `YouTube`, `Instagram`, `Facebook`, `Discord`, `Threads`.

## Front Matter Template

Each post supports the following front matter fields:

```yaml
---
title: "Post Title"
date: 2025-01-01
draft: false
tags: [tag1, tag2]
math: false        # set true to load KaTeX
cover: ""          # cover image URL (optional)
toc: true          # show table of contents
description: ""    # excerpt shown on post cards
---
```

## Deploy to GitHub Pages

Create `.github/workflows/hugo.yml` in your project root. GitHub Actions will automatically build and deploy on every push.

See the [Hugo official docs](https://gohugo.io/hosting-and-deployment/hosting-on-github/) for details.

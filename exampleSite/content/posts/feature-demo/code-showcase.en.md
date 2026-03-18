---
title: "Code Block Showcase"
date: 2025-01-10
draft: false
tags: [Code, Syntax Highlighting, Demo]
math: false
cover: "images/demo01.jpg"
toc: true
description: "Showcasing Spectra's syntax highlighting, one-click copy button, and multi-language code examples."
---

## Syntax Highlighting

Spectra uses Hugo's built-in Chroma engine for syntax highlighting with custom color tokens. Every code block has a one-click copy button in the top-right corner.

## TypeScript

```typescript
interface Post {
  title: string
  date: Date
  tags: string[]
  draft: boolean
}

async function fetchPosts(limit = 10): Promise<Post[]> {
  const res = await fetch(`/api/posts?limit=${limit}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

const posts = await fetchPosts(5)
posts.forEach(post => console.log(post.title))
```

## Python

```python
from dataclasses import dataclass
from datetime import datetime

@dataclass
class Post:
    title: str
    date: datetime
    tags: list[str]
    draft: bool = False

def word_count(content: str) -> int:
    return len(content.split())

def reading_time(content: str, wpm: int = 200) -> int:
    return max(1, round(word_count(content) / wpm))
```

## Go

```go
package main

import (
    "fmt"
    "strings"
)

type Post struct {
    Title string
    Tags  []string
    Draft bool
}

func (p Post) HasTag(tag string) bool {
    for _, t := range p.Tags {
        if strings.EqualFold(t, tag) {
            return true
        }
    }
    return false
}

func main() {
    post := Post{Title: "Hello", Tags: []string{"Hugo", "Go"}}
    fmt.Println(post.HasTag("hugo")) // true
}
```

## Shell

```bash
# Create a new post
hugo new content content/posts/my-post.md

# Start dev server (including drafts)
hugo server -D --bind 0.0.0.0

# Production build
hugo --minify
```

## CSS (SCSS)

```scss
.post-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2.2rem 2.4rem;
  transition: all var(--transition);

  &:hover {
    border-color: var(--accent);
    box-shadow: 0 0 24px var(--accent-glow);
  }
}
```

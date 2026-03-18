---
title: "What Code Blocks Can Do"
date: 2025-02-01
draft: false
tags: [Spectra, Code, Demo]
math: false
cover: ""
toc: true
description: "Syntax highlighting, line numbers, highlighted lines, filename display, copy button — a tour of Spectra's code block features."
series: [Spectra Feature Tour]
---

## The Basics: Syntax Highlighting

Just write the language name after the triple backticks, and Spectra will color things up for you. You'll also get a language label and a copy button in the top-right corner.

Syntax:

````markdown
```python
def hello():
    print("Hello, World!")
```
````

Result:

```python
from pathlib import Path

def find_large_files(directory, threshold_mb=100):
    """Find files exceeding the threshold in the given directory."""
    large = []
    for f in Path(directory).rglob("*"):
        if f.is_file() and f.stat().st_size > threshold_mb * 1024 * 1024:
            large.append((f.name, f.stat().st_size / (1024 * 1024)))
    return sorted(large, key=lambda x: x[1], reverse=True)
```

Try hitting the copy button in the top-right corner — the pasted result won't include line numbers.

## Adding Line Numbers

Append `{linenos=true}` after the language name to get line numbers. The `#` button in the top-left toggles them on and off.

Syntax:

````markdown
```go {linenos=true}
package main

func main() {
    fmt.Println("hello")
}
```
````

Result:

```go {linenos=true}
package main

import (
    "fmt"
    "net/http"
    "time"
)

func main() {
    client := &http.Client{Timeout: 10 * time.Second}
    resp, err := client.Get("https://example.com")
    if err != nil {
        fmt.Println("request failed:", err)
        return
    }
    defer resp.Body.Close()
    fmt.Println("status:", resp.StatusCode)
}
```

## Highlighting Specific Lines

Use `hl_lines` to specify which lines to highlight. You can write single lines or ranges, and the highlighted lines will get a visible border marker.

Syntax:

````markdown
```typescript {linenos=true,hl_lines=[4,"8-12"]}
// Lines 4 and 8 through 12 will be highlighted
```
````

Result (watch for lines 4 and 8-12):

```typescript {linenos=true,hl_lines=[4,"8-12"]}
interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class SimpleCache<T> {
  private store = new Map<string, CacheEntry<T>>()

  set(key: string, data: T, ttlMs: number): void {
    this.store.set(key, { data, timestamp: Date.now(), ttl: ttlMs })
  }

  get(key: string): T | null {
    const entry = this.store.get(key)
    if (!entry) return null
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.store.delete(key)
      return null
    }
    return entry.data
  }
}
```

## Showing Filenames

Add an HTML comment `<!-- file: filename -->` on the line right before the code block, and the filename will replace the language label in the top-right corner.

Syntax:

````markdown
<!-- file: src/utils/debounce.ts -->
```typescript
export function debounce(fn, delay) {
  // ...
}
```
````

Result:

<!-- file: src/utils/debounce.ts -->
```typescript
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
```

One more example:

<!-- file: docker-compose.yml -->
```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./data:/app/data
```

## Putting It All Together

Filename + line numbers + highlighted lines — all three work at the same time.

Syntax:

````markdown
<!-- file: middleware/ratelimit.go -->
```go {linenos=true,hl_lines=["5-6","14-16"]}
package middleware
// ...
```
````

Result:

<!-- file: middleware/ratelimit.go -->
```go {linenos=true,hl_lines=["5-6","14-16"]}
package middleware

import (
    "net/http"
    "sync"
    "time"
)

type visitor struct {
    lastSeen time.Time
    count    int
}

var (
    visitors = make(map[string]*visitor)
    mu       sync.Mutex
)

func RateLimit(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ip := r.RemoteAddr
        mu.Lock()
        v, exists := visitors[ip]
        if !exists {
            visitors[ip] = &visitor{lastSeen: time.Now(), count: 1}
            mu.Unlock()
            next.ServeHTTP(w, r)
            return
        }
        v.count++
        mu.Unlock()
        if v.count > 100 {
            http.Error(w, "rate limit exceeded", http.StatusTooManyRequests)
            return
        }
        next.ServeHTTP(w, r)
    })
}
```

## Supported Languages

Here are a few common ones, but pretty much every mainstream language is supported:

```bash
# Check which ports are in use
lsof -i -P -n | grep LISTEN

# Find the 10 largest files
du -ah . | sort -rh | head -10
```

```scss
.post-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);

  &:hover {
    border-color: var(--accent);
    box-shadow: 0 0 24px var(--accent-glow);
  }
}
```

```json
{
  "name": "spectra",
  "version": "1.0.0",
  "description": "A sci-fi Hugo theme",
  "keywords": ["hugo", "theme", "sci-fi"]
}
```

> Good code blocks aren't just pretty — they make readers actually stop and read.

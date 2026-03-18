---
title: "程式碼區塊可以做到這些事"
date: 2025-02-01
draft: false
tags: [Spectra, 程式碼, 展示]
math: false
cover: ""
toc: true
description: "語法高亮、行號、高亮行、檔名顯示、一鍵複製 — Spectra 的程式碼區塊功能展示。"
series: [Spectra 功能導覽]
---

## 基本款：語法高亮

在三個反引號後面寫語言名稱，Spectra 就會自動幫你上色。右上角會出現語言標籤和複製按鈕。

寫法：

````markdown
```python
def hello():
    print("Hello, World!")
```
````

效果：

```python
from pathlib import Path

def find_large_files(directory, threshold_mb=100):
    """找出指定目錄下超過門檻的檔案。"""
    large = []
    for f in Path(directory).rglob("*"):
        if f.is_file() and f.stat().st_size > threshold_mb * 1024 * 1024:
            large.append((f.name, f.stat().st_size / (1024 * 1024)))
    return sorted(large, key=lambda x: x[1], reverse=True)
```

試試看按右上角的複製按鈕，貼出來不會帶到行號。

## 加上行號

在語言名稱後面加 `{linenos=true}`，就會出現行號。左上角的 `#` 按鈕可以切換行號顯示。

寫法：

````markdown
```go {linenos=true}
package main

func main() {
    fmt.Println("hello")
}
```
````

效果：

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

## 高亮特定行

用 `hl_lines` 指定要高亮的行號。可以寫單行或範圍，被高亮的行會有明顯的邊框標記。

寫法：

````markdown
```typescript {linenos=true,hl_lines=[4,"8-12"]}
// 第 4 行和第 8 到 12 行會被高亮
```
````

效果（注意第 4 行和第 8-12 行）：

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

## 顯示檔名

在程式碼區塊的前一行加上 `<!-- file: 檔名 -->` 這個 HTML 註解，檔名就會取代右上角的語言標籤。

寫法：

````markdown
<!-- file: src/utils/debounce.ts -->
```typescript
export function debounce(fn, delay) {
  // ...
}
```
````

效果：

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

再一個例子：

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

## 全部組合起來

檔名 + 行號 + 高亮行，三個可以同時用。

寫法：

````markdown
<!-- file: middleware/ratelimit.go -->
```go {linenos=true,hl_lines=["5-6","14-16"]}
package middleware
// ...
```
````

效果：

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

## 支援的語言

隨便列幾個常用的，基本上主流語言都支援：

```bash
# 看看哪些 port 被佔用了
lsof -i -P -n | grep LISTEN

# 找出最大的 10 個檔案
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

> 好的程式碼區塊不只是好看，它讓讀者願意停下來讀。

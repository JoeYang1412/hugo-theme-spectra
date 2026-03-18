---
title: "程式碼區塊增強功能展示"
date: 2025-02-20
draft: false
tags: [Code, Syntax Highlighting, Demo]
math: false
cover: ""
toc: true
description: "展示進階程式碼區塊功能：行號、檔名顯示和高亮行。"
---

## 行號

程式碼區塊可以使用 Hugo 的 `linenos=true` 選項來顯示行號。切換按鈕（`#` 圖示）可讓讀者顯示或隱藏行號。

```python {linenos=true}
def fibonacci(n):
    """產生前 n 個費氏數列。"""
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print(fibonacci(10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## 高亮行

使用 `hl_lines` 可以引導讀者注意特定的行。高亮的行會有明顯的強調邊框：

```go {linenos=true,hl_lines=[3,8,"11-13"]}
package main

import "fmt"

type Config struct {
    Host string
    Port int
    Debug bool
}

func NewConfig() *Config {
    return &Config{
        Host:  "localhost",
        Port:  8080,
        Debug: false,
    }
}

func main() {
    cfg := NewConfig()
    fmt.Printf("Server at %s:%d\n", cfg.Host, cfg.Port)
}
```

## 檔名顯示

當程式碼區塊前有 HTML 註解 `<!-- file: 檔名 -->` 時，檔名會取代標頭列中的語言標籤。

<!-- file: src/utils/debounce.ts -->
```typescript
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

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

## 組合使用：檔名 + 行號 + 高亮

三個功能可以同時使用：

<!-- file: middleware/auth.go -->
```go {linenos=true,hl_lines=[5,"10-14"]}
package middleware

import (
    "net/http"
    "strings"
)

func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token == "" || !strings.HasPrefix(token, "Bearer ") {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}
```

## 表格模式行號

Hugo 預設以表格格式渲染行號（`lineNumbersInTable = true`），這表示複製程式碼時不會包含行號 — 複製按鈕會智慧地只擷取程式碼欄位。

```javascript {linenos=true}
class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    return this;
  }

  emit(event, ...args) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(cb => cb(...args));
    return this;
  }
}
```

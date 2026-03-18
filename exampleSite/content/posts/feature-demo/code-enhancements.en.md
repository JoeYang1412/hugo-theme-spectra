---
title: "Code Block Enhancements Demo"
date: 2025-02-20
draft: false
tags: [Code, Syntax Highlighting, Demo]
math: false
cover: ""
toc: true
description: "Demonstrating advanced code block features: line numbers, filename display, and highlighted lines."
---

## Line Numbers

Code blocks can display line numbers using Hugo's `linenos=true` option. A toggle button (the `#` icon) lets readers show or hide them.

```python {linenos=true}
def fibonacci(n):
    """Generate the first n Fibonacci numbers."""
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print(fibonacci(10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## Highlighted Lines

Use `hl_lines` to draw attention to specific lines. The highlighted lines get a distinct accent border:

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

## Filename Display

When a code block is preceded by an HTML comment `<!-- file: filename -->`, the filename replaces the language label in the header bar.

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

## Combined: Filename + Line Numbers + Highlights

All three features can be used together:

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

## Line Numbers in Table Mode

Hugo renders line numbers in a table format by default (`lineNumbersInTable = true`), which means copying code won't include line numbers — the copy button is smart enough to extract only the code column.

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

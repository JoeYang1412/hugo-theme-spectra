---
title: "數學公式與排版展示"
date: 2025-01-15
draft: false
tags: [KaTeX, 數學, 排版]
math: true
cover: ""
toc: true
description: "展示 KaTeX 數學公式渲染、各種 Markdown 排版元素，以及 Spectra 的字體排版系統。"
---

## KaTeX 數學公式

在文章開頭設定 `math: true` 即可啟用 KaTeX。

### 行內公式

歐拉公式 $e^{i\pi} + 1 = 0$ 被稱為數學中最美麗的等式。

質能等效公式為 $E = mc^2$，其中 $c$ 為光速。

### 區塊公式

高斯積分：

$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

貝葉斯定理：

$$P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}$$

矩陣運算：

$$\begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}$$

## 排版元素

### 標題層級

本文使用 `h2`、`h3`、`h4` 三層標題，對應 TOC 的 `startLevel: 2` 至 `endLevel: 4` 設定。

#### 這是 H4 標題

### 清單

**無序清單：**
- 第一項
- 第二項
  - 巢狀項目 A
  - 巢狀項目 B
- 第三項

**有序清單：**
1. 安裝 Hugo
2. 選擇主題
3. 建立內容
4. 部署

### 表格

| 語法元素 | Markdown | 渲染結果 |
|---------|----------|---------|
| 粗體 | `**文字**` | **文字** |
| 斜體 | `*文字*` | *文字* |
| 行內程式碼 | `` `code` `` | `code` |
| 刪除線 | `~~文字~~` | ~~文字~~ |

### 引用

> 簡潔是可靠的前提條件。
> — Edsger W. Dijkstra

### 水平線

---

### 圖片

圖片支援 `alt` 文字與圓角樣式，插入方式：

```markdown
![替代文字](/images/example.webp)
```

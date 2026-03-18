---
title: "Math Formulas & Typography Showcase"
date: 2025-01-15
draft: false
tags: [KaTeX, Math, Typography]
math: true
cover: ""
toc: true
description: "Showcasing KaTeX math rendering, Markdown typography elements, and Spectra's type system."
---

## KaTeX Math Formulas

Set `math: true` in front matter to enable KaTeX on a per-post basis.

### Inline Formulas

Euler's identity $e^{i\pi} + 1 = 0$ is considered the most beautiful equation in mathematics.

Mass-energy equivalence is expressed as $E = mc^2$, where $c$ is the speed of light.

### Block Formulas

The Gaussian integral:

$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

Bayes' theorem:

$$P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}$$

Matrix multiplication:

$$\begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}$$

## Typography Elements

### Heading Levels

This post uses `h2`, `h3`, and `h4` headings, corresponding to the TOC settings `startLevel: 2` through `endLevel: 4`.

#### This is an H4 Heading

### Lists

**Unordered list:**
- First item
- Second item
  - Nested item A
  - Nested item B
- Third item

**Ordered list:**
1. Install Hugo
2. Choose a theme
3. Create content
4. Deploy

### Table

| Element | Markdown | Rendered |
|---------|----------|---------|
| Bold | `**text**` | **text** |
| Italic | `*text*` | *text* |
| Inline code | `` `code` `` | `code` |
| Strikethrough | `~~text~~` | ~~text~~ |

### Blockquote

> Simplicity is prerequisite for reliability.
> — Edsger W. Dijkstra

### Horizontal Rule

---

### Images

Images support `alt` text and rounded corners. Usage:

```markdown
![Alt text](/images/example.webp)
```

---
title: "Math Formulas in Your Posts"
date: 2025-02-15
draft: false
tags: [Spectra, KaTeX, Math]
math: true
cover: ""
toc: true
description: "Write inline and block math formulas with KaTeX — from simple to complex."
series: [Spectra Feature Tour]
---

## How to Enable It

Add `math: true` to your front matter. That's it. Spectra will load KaTeX automatically — no extra setup needed.

## Inline Formulas

Wrap a formula in two `$` signs and it shows up right in the middle of your text.

For example, Euler's identity $e^{i\pi} + 1 = 0$ is often called the most beautiful equation in math. And $E = mc^2$ is probably the most famous physics formula out there.

Inline formulas don't line-break, so if yours is getting long, use block format instead.

## Block Formulas

Wrap a formula in `$$` and it gets its own line, centered.

The Gaussian integral:

$$\int_{-\infty}^{\infty} e^{-x^2}\, dx = \sqrt{\pi}$$

This result is pretty wild — an integral involving $e$ and the answer has $\pi$ in it.

## Common Formula Examples

### Bayes' Theorem

You can't escape this one in statistics or machine learning:

$$P(A \mid B) = \frac{P(B \mid A)\, P(A)}{P(B)}$$

In plain terms: how you should update your belief about something after seeing new evidence.

### Quadratic Formula

You learned this one in school, but it looks extra official in LaTeX:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

### Matrices

Matrix multiplication:

$$\begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}$$

### Sums and Products

Sum of squares of natural numbers:

$$\sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}$$

Factorial as a product:

$$n! = \prod_{k=1}^{n} k$$

### Limits

Where calculus begins:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

## Mixing It Up

Formulas blend naturally with regular text.

Say you have a dataset $x_1, x_2, \ldots, x_n$. Its mean is:

$$\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i$$

And the standard deviation:

$$\sigma = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (x_i - \bar{x})^2}$$

These two numbers basically tell you "where the data clusters" and "how spread out it is."

## Aligning Multi-line Formulas

Use the `aligned` environment to line up the equals signs:

$$\begin{aligned}
(a + b)^2 &= (a + b)(a + b) \\
&= a^2 + ab + ba + b^2 \\
&= a^2 + 2ab + b^2
\end{aligned}$$


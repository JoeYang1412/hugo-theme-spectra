---
title: "在文章裡放數學公式"
date: 2025-02-15
draft: false
tags: [Spectra, KaTeX, 數學]
math: true
cover: ""
toc: true
description: "用 KaTeX 在文章裡寫行內公式和區塊公式，從簡單到複雜都可以。"
series: [Spectra 功能導覽]
---

## 啟用方式

在文章最上面的 front matter 加上 `math: true`，就這樣。Spectra 會自動載入 KaTeX，不用裝額外的東西。

## 行內公式

把公式包在兩個 `$` 之間，它就會出現在文字中間。

比如說，歐拉公式 $e^{i\pi} + 1 = 0$ 被很多人說是數學裡最美的等式。質能等價 $E = mc^2$ 大概是知名度最高的物理公式了。

行內公式不會斷行，所以太長的公式建議用區塊格式。

## 區塊公式

用兩個 `$$` 把公式包起來，它會獨立成一行，置中顯示。

高斯積分：

$$\int_{-\infty}^{\infty} e^{-x^2}\, dx = \sqrt{\pi}$$

這個結果挺神奇的 — 一個跟 $e$ 有關的積分，答案裡面居然跑出 $\pi$。

## 常見公式示範

### 貝氏定理

統計和機器學習繞不開的東西：

$$P(A \mid B) = \frac{P(B \mid A)\, P(A)}{P(B)}$$

白話講：看到新證據之後，你對某件事的信心應該怎麼更新。

### 二次公式

國中就學過的，但寫成 LaTeX 的時候看起來特別正式：

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

### 矩陣

矩陣乘法：

$$\begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}$$

### 求和與連乘

自然數平方和：

$$\sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}$$

階乘的連乘表示：

$$n! = \prod_{k=1}^{n} k$$

### 極限

微積分的起點：

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

## 混合使用

公式可以跟一般文字自然地混在一起。

假設你有一組資料 $x_1, x_2, \ldots, x_n$，它的平均值是：

$$\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i$$

標準差則是：

$$\sigma = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (x_i - \bar{x})^2}$$

這兩個數字基本上就能告訴你一組資料「集中在哪」和「散得多開」。

## 對齊多行公式

用 `aligned` 環境可以讓等號對齊：

$$\begin{aligned}
(a + b)^2 &= (a + b)(a + b) \\
&= a^2 + ab + ba + b^2 \\
&= a^2 + 2ab + b^2
\end{aligned}$$


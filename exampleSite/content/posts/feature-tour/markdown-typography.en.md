---
title: "The Full Markdown Showcase"
date: 2025-03-15
draft: false
tags: [Spectra, Markdown, Typography]
math: false
cover: ""
toc: true
description: "Headings, lists, tables, blockquotes, horizontal rules — see how every Markdown element looks in Spectra."
series: [Spectra Feature Tour]
---

## Heading Levels

This post uses `h2`, `h3`, and `h4` headings. The table of contents on the right (desktop) or the collapsible one at the top (mobile) picks these up automatically.

### This Is H3

#### This Is H4

Three levels is usually enough. Too many levels and the structure gets more confusing than helpful.

## Text Formatting

The basic text styles:

- **Bold** — use `**text**`
- *Italic* — use `*text*`
- ~~Strikethrough~~ — use `~~text~~`
- `Inline code` — wrap it in backticks
- [Hyperlink](https://example.com) — use `[text](url)`

You can mix these together, like **bold with `code` inside** or *italic with a [link](https://example.com)*.

## Lists

### Unordered List

- First item
- Second item
  - Nested item A
  - Nested item B
    - You can go even deeper
- Third item

### Ordered List

1. Open your editor
2. Create a new Markdown file
3. Start writing
4. Save
5. Deploy

### Task List

- [x] Pick a theme
- [x] Set up the basic structure
- [ ] Write the first post
- [ ] Deploy to production

## Blockquotes

> Simplicity is a prerequisite for reliability.
> — Edsger W. Dijkstra

Blockquotes in Spectra get a decorative left border and a subtle background color. Multi-line works just fine:

> Any sufficiently advanced technology
> is indistinguishable from magic.
>
> — Arthur C. Clarke

## Tables

Tables come up a lot in technical writing. Spectra's tables automatically get borders and zebra-striped rows.

| Shortcut | Action | Platform |
|----------|--------|----------|
| `Ctrl+S` | Save | Windows / Linux |
| `Cmd+S` | Save | macOS |
| `Ctrl+Shift+P` | Command palette | VS Code |
| `Ctrl+/` | Toggle comment | Most editors |

Left, right, and center alignment:

| Left-aligned | Centered | Right-aligned |
|:-------------|:--------:|--------------:|
| Apple | 100g | $1.50 |
| Banana | 120g | $0.75 |
| Orange | 150g | $2.00 |

## Horizontal Rule

Three dashes make a horizontal rule:

---

Handy for separating sections on different topics.

## Nested Blockquotes and Lists

You can put lists inside blockquotes too:

> Good technical writing usually has these traits:
>
> - Gets to the point right away
> - Includes real examples
> - Keeps paragraphs short
> - Wraps up with a summary

## Footnotes

Markdown supports footnotes[^1]. Hover over or click to see the note.

[^1]: This is the footnote content. Footnotes appear at the very bottom of the post.

## Definition List

HTML
: HyperText Markup Language — the skeleton of web pages.

CSS
: Cascading Style Sheets — handles how web pages look.

JavaScript
: The programming language that makes web pages interactive.

---

That's a wrap on the main Markdown elements Spectra supports. You don't need to memorize the syntax — just write a few posts and it'll become second nature.


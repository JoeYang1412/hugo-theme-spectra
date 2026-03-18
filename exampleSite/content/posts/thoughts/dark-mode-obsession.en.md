---
title: "My Obsession with Dark Mode"
date: 2025-05-15
draft: false
tags: [Design, Misc, UI]
math: false
cover: ""
toc: true
description: "Why I set almost everything to dark mode, and whether it even makes sense."
---

## Everything Must Be Dark

Phone, laptop, IDE, browser, note-taking app, messaging app. If there's a dark mode toggle, I'm flipping it.

It's not for any scientific reason. I just think it looks good.

Light text on a dark background has this feeling of "I'm doing something serious." White background with black text feels like staring at a Word document. Totally subjective, but a lot of people seem to feel the same way.

## Is Dark Mode Actually Easier on Your Eyes

Honestly, the science isn't very convincing.

Here's roughly where the research stands:

- **In dim environments**, dark mode does reduce eye strain — because the overall screen brightness is lower
- **In bright environments** (like a daytime office), light mode is actually more readable — because of how contrast works
- Dark mode doesn't "cure" or "prevent" myopia. That's a separate issue entirely
- The biggest factors for eye fatigue are **screen brightness, font size, viewing distance, and how often you take breaks** — not background color

So the "dark mode is easier on your eyes" claim only really holds up in specific situations.

## It Does Save Battery Though

On OLED screens, dark mode genuinely saves power. OLED pixels that are black are completely off — no light means no power draw.

Google ran their own tests and found that YouTube in dark mode can save up to 60% of screen power consumption.

But this only applies to OLED. LCD screens have a backlight that's always on, so dark vs. light makes almost no difference.

## Dark Mode Design Is Harder Than You Think

Anyone who's actually built a dark mode knows it's not just "make the background black and the text white."

A few common pitfalls:

### Pure Black Is Too Harsh

Pure black `#000000` with pure white `#FFFFFF` text has way too much contrast. Stare at it long enough and it's actually more tiring than light mode.

A better approach is to use a dark gray for the background — something like `#1a1a2e` or `#0b0f19` — and a slightly muted white for text, like `#e4e8f1`.

### Colors Don't Port Directly

A blue that looks great on a light background might be way too bright and glaring on a dark one. You usually need to lower the saturation or nudge the hue a bit.

### You Can't Rely on Shadows for Depth

In light mode, shadows are great for creating visual layers. In dark mode, shadows are basically invisible. You need to switch to borders or subtle background color differences to separate layers.

### Images Need Special Treatment

Images that look fine on a white background can feel like they're "floating" on a dark one. Adding rounded corners with a subtle border helps, or just use images that already have a dark background baked in.

## My Preferences

```
OS:              Dark
IDE / Editor:    Dark (One Dark Pro or GitHub Dark)
Browser:         Dark
Terminal:        Always dark. Obviously.
Social media:    Dark
Messaging:       Dark
Document editing: Depends — sometimes light mode is easier to read
```

The one exception is design work where I need accurate color perception — colors look different in dark mode, so I'll switch back to light for that.

## Spectra's Dark Mode

Spectra's dark mode uses a blue-tinted dark base (`#0b0f19`) paired with cool-toned accents. The light mode is a slightly blue-gray white.

The switch isn't a hard cut — there's a brief transition animation. Spectra also remembers your choice, so you don't have to toggle it again next time.

If you haven't manually picked one, it follows your system preference.

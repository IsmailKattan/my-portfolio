# SEO & Website Identity Audit

> Generated: 2026-04-16

---

## 1. Current `front/index.html` State

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive Portfolio Website</title>
  </head>
  ...
</html>
```

### What exists
- `charset="UTF-8"` — correct
- `viewport` — correct
- `lang="en"` — present but hardcoded; doesn't update with i18n language

### What's missing
| Tag | Purpose | Status |
|-----|---------|--------|
| `<title>` | Branded page title | Generic ("Responsive Portfolio Website") |
| `<meta name="description">` | Search snippet text | Missing |
| `<meta name="author">` | Authorship | Missing |
| `<meta name="robots">` | Crawl/index control | Missing |
| `<link rel="canonical">` | Canonical URL | Missing |
| `<link rel="icon">` | Browser tab icon | Missing |
| `<link rel="apple-touch-icon">` | iOS home screen icon | Missing |
| `<link rel="manifest">` | Web app manifest | Missing |
| `<meta name="theme-color">` | Browser/mobile UI color | Missing |

---

## 2. Open Graph & Social Sharing

All missing — pages currently share as blank cards on all platforms.

| Tag | Value Needed |
|-----|-------------|
| `og:type` | `website` |
| `og:url` | Canonical site URL |
| `og:title` | Page title |
| `og:description` | Page description |
| `og:image` | Preview image (1200×630px) |
| `og:locale` | `en_US` / `ar_SA` / `tr_TR` |
| `og:site_name` | Site/brand name |
| `twitter:card` | `summary_large_image` |
| `twitter:title` | Page title |
| `twitter:description` | Page description |
| `twitter:image` | Preview image |

---

## 3. Favicon / Icon Files

| File | Location | Status |
|------|----------|--------|
| `favicon.ico` | `front/public/favicon.ico` | Missing |
| `favicon-32x32.png` | `front/public/` | Missing |
| `favicon-16x16.png` | `front/public/` | Missing |
| `apple-touch-icon.png` (180×180) | `front/public/` | Missing |
| `android-chrome-192x192.png` | `front/public/` | Missing |
| `android-chrome-512x512.png` | `front/public/` | Missing |
| `site.webmanifest` | `front/public/` | Missing |

**Logo files available** in `front/public/images/`:
- `logo-dark.png`, `logo-dark-500.png`, `logo-dark-1000.png`, `logo-dark-1500.png`
- `logo-light.png`, `logo-light-500.png`, `logo-light-1000.png`, `logo-light-1500.png`

These can be used to generate favicon variants.

---

## 4. Static SEO Files

| File | Purpose | Status |
|------|---------|--------|
| `front/public/robots.txt` | Crawler directives | Missing |
| `front/public/sitemap.xml` | Page discovery | Missing |

---

## 5. Dynamic / Per-Page SEO

- No `react-helmet` or `react-helmet-async` installed
- No per-page meta tag updates on any route
- `lang` attribute on `<html>` doesn't change when user switches language (i18n switches content but not the HTML `lang` or `dir` — **note:** MEMORY says `dir` is set by Navigation component, but `lang` attribute is static)

**Pages that need per-page meta tags:**
- `/` — Landing page
- `/blog/:id` — Blog post detail (has title, description, author in data)
- `/projects/:id` — Project detail (has title, description in data)
- `/certificates` — Certificates listing
- `/contact` — Contact page

---

## 6. Multilingual SEO (hreflang)

The site supports EN / AR / TR but has no `hreflang` alternate links.

```html
<!-- Example needed for each language variant -->
<link rel="alternate" hreflang="en" href="https://example.com/en/" />
<link rel="alternate" hreflang="ar" href="https://example.com/ar/" />
<link rel="alternate" hreflang="tr" href="https://example.com/tr/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

---

## 7. Structured Data (JSON-LD)

No schema markup exists. Recommended schemas:

| Schema | Where |
|--------|-------|
| `Person` or `Organization` | Global / Landing |
| `WebSite` with `SearchAction` | Global |
| `Article` or `BlogPosting` | `/blog/:id` |
| `CreativeWork` or `SoftwareApplication` | `/projects/:id` |

---

## 8. Current Title

- **Source & dist:** `"Responsive Portfolio Website"` — generic, not branded
- **Should be:** something like `"Ismail Kattan – Cybersecurity & Development Portfolio"` or your preferred brand name

---

## Action Plan (priority order)

1. **Favicon** — Generate all icon sizes from existing logo PNGs; add `site.webmanifest`
2. **`index.html` base tags** — title, description, author, theme-color, icon links, manifest link
3. **Open Graph + Twitter cards** — static base values in `index.html`; dynamic values via react-helmet-async
4. **Install `react-helmet-async`** — enable per-page dynamic meta tags
5. **Per-page SEO components** — title + description for each route (blog detail, project detail, etc.)
6. **`robots.txt`** — allow all crawlers (or configure as needed)
7. **`sitemap.xml`** — list all static routes (dynamic ones optional)
8. **`lang` attribute update** — sync `document.documentElement.lang` with i18n language on change
9. **hreflang links** — for multilingual alternate pages
10. **Structured data (JSON-LD)** — Person schema on landing; Article on blog posts

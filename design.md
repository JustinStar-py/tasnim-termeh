# Design Brief & Build Prompt — تسنیم ترمه (Tasnim Termeh)

> **How to use this file:** Everything below is a single prompt intended to be pasted
> into Gemini (a code‑generation session). It asks Gemini to design and build the
> storefront for a premium Persian *termeh* brand. Feed it as‑is, or trim the parts you
> don't need.

---

## ⚠️ How to treat this brief (please read first)

**This document is advisory, not a specification.** Treat every layout, section,
color, motif, and piece of copy below as a *strong suggestion and a starting point* —
not a rule you must obey.

- If you see a **better structure, a cleaner interaction, a nicer motif treatment, or a
  smarter color/typography decision — take it.** You have full creative latitude.
- **You do not need to ask permission to deviate.** If your idea is better, implement it.
  I'll happily ship your version. No problem at all.
- The only things I'd ask you to keep firm are: the **Persian / RTL** nature of the site,
  the **authentic Iranian‑Islamic** visual language, and the **premium, trustworthy**
  feel of a heritage craft brand. Everything else is yours to improve.

---

## 1. The goal, in one paragraph

Build the homepage (and the shared shell: header + footer + floating actions) for
**تسنیم ترمه** — a Yazd‑based brand that makes and sells **termeh**: a traditional
handwoven Persian brocade textile, historically silk‑and‑wool, defined by the *boteh*
(paisley) motif and rich, saturated color. The product line is premium home & gift
textiles — table runners/sets (رومیزی و رانر), traditional floor‑seating sets
(سرویس شاه‌نشین), prayer mats (سجاده و جانماز), bundles (بقچه), and corporate/wedding
gift sets. The site should feel like walking into a beautifully lit bazaar shop in
historic Yazd: warm, handcrafted, unmistakably Iranian, and quietly luxurious — while
still being a fast, modern, conversion‑focused e‑commerce storefront.

> Note on the word "cashmere": the source brand this is loosely modeled on is a *سوغات /
> handicrafts* marketplace, but **our product is termeh (Persian brocade), not cashmere.**
> Please keep the identity focused on termeh and Persian textile craft.

## 2. Reference to borrow from (structure only)

Reference site: **https://malmostore.com/** (screenshots were provided separately).

Borrow malmostore's **layout rhythm and section ordering** — it's a well‑paced Persian
e‑commerce home: a hero slider, arch‑shaped category cards, brand/collection showcase
blocks, a "best‑sellers" band, curated picks, a suggestions carousel, value‑proposition
cards, a magazine/blog strip, a rich footer, and floating support + discount affordances.

**But change the identity completely.** Malmo reads as a broad, green, friendly grocery‑ish
marketplace. Ours is a **single premium heritage textile brand** in **burgundy + gold +
turquoise**. Please don't copy their green palette, their exact copy, or their generic feel.
Take the *bones*, give it our *soul*.

## 3. Tech stack & baseline (already set up in this repo — please align)

Produce **TypeScript React code for Next.js (App Router) styled with Tailwind CSS v4.**
The project already exists with these choices — match them so your output drops in cleanly:

- **Next.js 16** (App Router), **React 19**, **TypeScript**.
- **Tailwind CSS v4** (configured via `@theme` in `globals.css`, using CSS‑variable tokens —
  not a `tailwind.config.js`).
- **Font:** Vazirmatn (variable, self‑hosted) already wired as `--font-vazirmatn`.
- **Direction:** `<html lang="fa" dir="rtl">` is already set. Everything must be RTL‑correct.
- **Carousel:** `embla-carousel-react` is already installed — please use it for sliders.
- Client interactivity (sliders, menus, modals, cart drawer) → `'use client'` components.

**Existing design tokens** (defined in `globals.css` `@theme` — reuse these; extend if you
must). In Tailwind v4 these map to utilities like `bg-brand`, `text-gold`, `border-line`:

| Token | Value | Role |
|---|---|---|
| `--color-brand` | `#7a1c30` | Burgundy / زرشکی — primary brand, headings, primary buttons |
| `--color-brand-hover` | `#631425` | primary hover |
| `--color-brand-soft` | `#fbf0f2` | soft burgundy wash / chips |
| `--color-gold` | `#c59b27` | Gold / طلایی — accents, dividers, motif linework, prices |
| `--color-gold-soft` | `#fcf6e8` | soft gold panels |
| `--color-turquoise` | `#147a75` | Firouzeh / فیروزه‌ای — Yazd‑tile secondary accent, success |
| `--color-turquoise-soft` | `#edf8f7` | soft turquoise panels |
| `--color-ink` / `--color-ink-muted` | `#1a1513` / `#5c534e` | body text |
| `--color-sand` / `--color-sand-dark` | `#fdfbf7` / `#f4ede2` | page & section backgrounds |
| `--color-paper` / `--color-line` | `#ffffff` / `#ebe3d5` | cards & hairline borders |

There are also two helper classes already present you may reuse or replace:
`.bg-termeh-pattern` (subtle dotted texture) and `.gold-shimmer` (gradient gold text).

## 4. Visual language — Iranian‑Islamic, done tastefully

This is the heart of the request. Please weave **authentic Iranian‑Islamic geometric and
vegetal ornament** through the UI — but as **refined accents and structure, not loud
noise.** Think of a museum‑quality catalog or a boutique in a restored Yazd caravanserai:
lots of calm negative space, then one exquisite ornamental detail that rewards attention.

Suggested motif vocabulary (use the ones that serve the design; skip the rest):

| Motif (فارسی) | What it is | Suggested use |
|---|---|---|
| **Boteh jegheh** (بته‌جقه) | The paisley — termeh's signature | Logo mark, section flourishes, faint product‑card watermark, hero accent |
| **Mihrab / Taq arch** (طاق/محراب) | Pointed Persian arch | **Category cards** framed as arches, image frames, feature callouts (this is the single most on‑brand shape — Malmo uses it and it's perfect for us) |
| **Girih star** (گره) | Interlacing 8/10/12‑fold star‑and‑polygon geometry | Section dividers, khatam‑style borders, ultra‑low‑opacity background tessellation |
| **Shamseh / Toranj** (شمسه/ترنج) | Radiating sun‑rosette / central medallion | Ornament above section titles, hero medallion, empty/loading states |
| **Eslimi / Khataei** (اسلیمی/ختایی) | Curling arabesque vegetal scroll | Corner spandrels (lachak), footer top edge, divider flourishes |
| **Khatam** (خاتم) | Star‑tessellated marquetry inlay | Thin decorative borders, badges, CTA underlines |
| **Kashi / Moarragh** (کاشی معرق) | Yazd/Isfahan tile mosaic (turquoise + cobalt + gold) | Subtle background panels, hover states, the turquoise accents |
| **Muqarnas** (مقرنس) | Honeycomb vaulting | Optional decorative crown on the hero or header |

**Implementation guidance for the motifs (so they stay crisp and lightweight):**

- Prefer **inline SVG React components** (`<BotehMark/>`, `<GirihDivider/>`, `<ArchFrame/>`,
  `<ShamsehOrnament/>`) using `currentColor` and `fill`/`stroke` so they inherit theme colors
  and scale without blur. Build a small reusable set and reuse them.
- Use **CSS** (`repeating-linear-gradient`, `radial-gradient`, SVG data‑URI backgrounds, or
  `mask-image`) for tiled textures at **low opacity (≈4–8%)** so they read as woven texture,
  not wallpaper.
- Use SVG `clip-path` / `mask` or border‑radius tricks to render the **arch (mihrab) shape**
  on category cards and image frames.
- Gold **hairline dividers with a centered shamseh** make elegant section separators.
- Keep motifs mostly monochromatic (gold on burgundy, or ink on sand). Let the *product
  photography* carry the color.

**Restraint rule of thumb:** if a section already has an ornamental frame, its background
should be calm. Never stack three ornaments in one viewport. Whitespace is luxury.

## 5. Typography & tone

- Vazirmatn throughout. Establish a clear scale: large, confident Persian headings
  (consider `font-black`), comfortable body at generous line‑height (~1.8, already set for
  Persian legibility).
- **Persian digits** for prices, phone numbers, stats (۱۲,۸۰۰,۰۰۰ تومان). Wrap Latin/LTR
  fragments (phone numbers, codes) with `dir="ltr"`.
- Copy voice: warm, proud, heritage‑confident — but not overwrought. A tasteful gold
  eyebrow/kicker above section titles works well (e.g. «گنجینهٔ نفیس تسنیم»).

## 6. Suggested page structure (adapt freely — reorder, merge, or add)

All copy below is a **suggestion**; improve the wording, and feel free to change what each
section contains. On‑screen text must be **Persian**; internal labels/comments can be English.

1. **Top utility bar** — thin burgundy strip: free‑shipping / festival discount notice, and
   maybe quick links (پیگیری سفارش، تماس). Dismissible is a nice touch.

2. **Header (sticky)** — RTL: brand logo + boteh mark on the **right**; a product **search
   field** («جستجو در محصولات…»); category **mega‑menu** dropdowns
   («رومیزی و رانر»، «سرویس شاه‌نشین»، «سجاده و جانماز»، «هدایای سازمانی»، «خرید بر اساس طرح»);
   and account + **cart** (with count) + order‑tracking on the **left**. Collapse to a clean
   drawer on mobile.

3. **Hero slider** (Embla, 2–4 slides, RTL, autoplay + dots/arrows). Slide ideas:
   the brand story / signature collection; a **corporate‑gift** slide («خرید هدیهٔ سازمانی
   از تسنیم ترمه») with a luxury gift‑box; a featured طرح (e.g. شاه‌عباسی / بته‌جقه). Use
   Iranian geometric/arabesque backgrounds behind the copy; a bold headline + one CTA per
   slide.

4. **Category arch cards** — a row of **mihrab‑arch‑shaped** cards, each with an image/icon,
   a category name, and a «مشاهده محصولات» pill. This is the signature Islamic‑shape moment —
   make it beautiful.

5. **Collection / طرح spotlight blocks** — two‑ or three‑up showcase panels for signature
   patterns or collections (شاه‌عباسی، بته‌جقه، ترنج و لچک، درباری) with a small product
   thumbnail cluster and a «مشاهده همه» link — echoing Malmo's brand‑showcase blocks.

6. **Best‑sellers band** («پرفروش‌ترین محصولات») — a colored band (burgundy or turquoise,
   with subtle tile/girih texture) holding a horizontal scroll/carousel of product cards
   (image, title, price in تومان, quick‑add).

7. **Curated picks** («منتخب صنایع دستی و ترمه‌های خاص») — a mixed editorial grid: a large
   lifestyle image tile beside smaller product tiles.

8. **Suggested products carousel** («پیشنهاد تسنیم برای شما») — Embla carousel, calm background.

9. **Why us / value props** — 3–4 cards (اصالت و شناسنامهٔ کالا، ابریشم و زری اعلا، ضمانت
   ثبات رنگ، بسته‌بندی فاخر چوبی). Consider soft‑tinted cards (burgundy‑soft / gold‑soft /
   turquoise‑soft) each with a small motif icon.

10. **Shah‑neshin spotlight** — a feature block for the flagship سرویس شاه‌نشین sets
    (large image + benefits list + CTA), styled richly.

11. **SEO/brand paragraph** — a short, well‑written Persian block about Yazd, termeh heritage,
    and the brand's promise (good for SEO and for humans).

12. **Magazine strip** («مجلهٔ ترمه») — 3–4 blog cards (راهنمای نگهداری ترمه، تاریخچهٔ بته‌جقه،
    تفاوت ترمه دست‌باف و ماشینی) with a «مشاهدهٔ همه» link.

13. **Footer** — multi‑column: brand blurb, quick links, Yazd/Tehran addresses, contact hours,
    trust badges (اینماد/نماد اعتماد placeholder), social (Instagram / Bale / WhatsApp). Give
    it an eslimi/arabesque top border.

14. **Floating actions** — a support widget («پشتیبانی») bottom‑corner, a «کد تخفیف داری؟»
    discount pill, and a back‑to‑top. Keep them from overlapping on mobile.

15. **Nice extras (optional):** a slide‑over **cart drawer**, a **product quick‑view modal**,
    a consultation/order modal (the repo already has a working order modal you can build on),
    and a newsletter capture.

## 7. Motion & interaction (subtle, premium)

- Gentle entrance reveals on scroll, soft hover lifts on cards, smooth Embla transitions,
  a slow shimmer on gold accents. Nothing bouncy or gimmicky.
- Respect `prefers-reduced-motion`: disable non‑essential animation.
- Clear focus‑visible states, hover/active feedback on every interactive element.

## 8. Quality bar (please honor these)

- **RTL correctness** everywhere (logical spacing, mirrored icons where meaningful,
  correct arrow directions in the slider).
- **Responsive** from small mobile → wide desktop; no horizontal scroll on `body`.
- **Accessible:** semantic HTML, `alt` text, `aria-label`s on icon buttons, keyboard‑navigable
  menus/sliders/modals, sufficient contrast.
- **Performance:** `next/image` with sizes; lazy‑load below the fold; SVG over raster for
  ornament; avoid huge background images.
- **Clean code:** small reusable components (motifs, ProductCard, SectionHeader, ArchCard),
  typed props, sensible file organization; realistic **Persian placeholder data** (products,
  prices, titles) so the page looks alive. Use placeholder image paths (e.g. `/images/...`)
  or motif/gradient backgrounds where a real photo isn't available.

## 9. What to deliver

- A complete, runnable **`src/app/page.tsx`** (plus extracted components under
  `src/components/` where it improves clarity), and any additions to
  **`src/app/globals.css`** (`@theme` tokens, motif utility classes).
- Reusable **motif SVG components** as described.
- Brief inline comments only where the intent isn't obvious.

---

## ✅ Final note — your judgment wins

Again: **this brief guides, it does not bind.** If your instincts point to a better hero,
a smarter section order, a more elegant way to use Persian‑Islamic geometry, a different
component split, or even a different color emphasis — **go for it and build your best
version.** I'm glad to implement whatever you think is strongest. Surprise me. 🌿

Constraints I'd love you to keep: **Persian + RTL**, **authentic Iranian‑Islamic ornament**,
**premium heritage‑craft feel**, and **clean Next.js + Tailwind v4 code** that fits the stack
in section 3.

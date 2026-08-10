# OYO Movers — Brand Foundation

> Single source of truth for frontend UI & responsive work. Extracted from the existing
> codebase (`src/styles/variables.scss`, `layout.tsx`, page SCSS). Frontend/design only —
> no backend or API behavior is defined here.

## 1. Brand Essence

OYO Movers is an Australian moving & logistics marketplace. The identity is **bold, energetic,
and trustworthy** — heavy black display type paired with a high-visibility "safety yellow"
accent that echoes moving trucks, hi-vis vests, and warning tape.

- **Tone:** confident, direct, helpful, no jargon.
- **Feel:** clean white space, strong contrast, chunky headings, generous spacing.

## 2. Color Palette

| Token | Hex | Role |
|-------|-----|------|
| `--primaryColor` | `#18181b` | Primary — near-black. Headings, nav, buttons, dark UI. |
| `--secondaryColor` | `#ffe147` | **Brand accent (signature yellow).** CTAs, underlines, highlights, loader. |
| `--secondaryColorDisabled` | `#655714` | Muted/disabled state of the yellow accent. |
| `--fontColor` | `#121241` | Default body text (dark navy). |
| `--tertiaryColor` | `#2ba9fc` | Light blue — secondary accents / links. |
| `--blueColor` | `#0075ff` | Strong blue — interactive/links. |
| `--highlightColor` | `#4472c4` | `h1` color / emphasis. |
| `--checkboxColor` | `#2fb600` | Success / checked. |
| `--placeHolder` | `#666666` | Placeholder / muted text. |
| `--bgColor` | `#fafbfb` | Page background (off-white). |
| `--bgColorButton` | `#f7f7f7` | Neutral button background. |
| `--bgColorSidebar` | `#bbd5e4` | Sidebar background. |
| Error | `rgb(229,22,42)` | Form error text. |

**Usage rules**
- Yellow `#ffe147` is the accent only — never body text (fails contrast on white). Pair it with `#18181b` text on top for CTAs.
- One accent per section. Don't combine yellow + blue accents in the same component.

## 3. Typography

- **Primary typeface:** **Montserrat** (Google Fonts, weights 100–900). Already loaded via `next/font` in `layout.tsx`.
- **Headings:** Montserrat 700–800, tight, high contrast. `h1` currently `2rem` desktop / `1.5rem` ≤991px, color `--highlightColor`.
- **Body:** Montserrat 400–500, `--fontColor`.

**⚠️ Known inconsistency (fix first):** `layout.tsx` imports Montserrat but does not apply it to
`<body>`. ~15 page SCSS files re-import Montserrat from the Google CDN and apply it per-page,
so pages missing that import fall back to Bootstrap's system font. → Apply Montserrat globally
on `<body>` and remove the redundant per-page `@import url(...Montserrat...)` calls.

## 4. Shape & Spacing

- **Corner radius:** `--borderRadius: 4px` (base). Keep consistent across buttons, cards, inputs.
- **Rhythm:** section padding `py-5` (Bootstrap) is the site default; keep vertical spacing consistent between landing sections.

## 5. Responsive Breakpoints (Bootstrap 5 + existing custom queries)

| Name | Width | Notes |
|------|-------|-------|
| Mobile | ≤ 575px | Single column; stack everything. |
| Small | 576–767px | Custom queries use `max-width: 767px`. |
| Tablet | 768–991px | Custom queries use `max-width: 991px` (heading downsizes here). |
| Desktop | 992–1199px | |
| Large | ≥ 1200px | Container max ~1140px. |

Meta viewport is set with `maximum-scale=1, minimum-scale=0.75` — be careful, this limits user zoom (accessibility note).

## 6. Assets

- Logos/icons/images are served from S3: `https://oyo-cdn.s3.ap-southeast-2.amazonaws.com` via `NEXT_PUBLIC_S3_BUCKET_BASE_URL` (see `src/config/index.ts`).
- Local static assets live in `public/` and `public/images/`.
- Favicon set + `site.webmanifest` already configured.

## 7. Voice (for any UI copy changes)

- Short, action-first CTAs: "Get a Quote", "Book Now", "Become a Mover".
- Address the customer as "you". Australian English spelling.
- Avoid exclamation overload; let the yellow accent carry the energy.

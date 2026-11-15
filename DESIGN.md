# Paper Trail — hero / OG card design system

**Status:** v1, locked 2026-11-13. First use: `og-card-cajefez-editorial.jpg`
(Ah San stealer-panel post).

Paper Trail is the visual language for this blog's hero and link-preview
images: warm editorial paper, serif metrics, mono evidence. Every card tells
the story in three beats — **hook → proof → sting** — and every figure on
the card must match the post body exactly (see §7).

## 1. Layout map (1200 × 630)

```
┌──────────────────────────────────────────────────────────────┐
│ eyebrow · mono-ish sans caps          (THREAT INTEL · …)      │
│                                                              │
│ Newsreader headline, ink          (35 GB of Indian …)         │
│   with lime marker behind the lead metric                     │
│ Instrument Serif italic, crimson  (filed under a slur.)      │
│ Inter subtitle                    (Inside the … panel)       │
│ ── 1px divider, full-bleed with air both sides ──            │
│ stat block      stat block      │  ┌─ verdict card ─┐        │
│ 758,161         165             │  │ 0/70 → unseen  │ pin    │
│ ──lime sweep    ──lime sweep    │  │ …               │        │
│                                                              │
│ amirulcyber.com                                              │
└──────────────────────────────────────────────────────────────┘
```

Zones: headline spans full width; bottom splits into stat blocks (left)
and one verdict card (right, 420px); domain anchors bottom-left.

## 2. Canvas & frame

- Size 1200 × 630 (OG standard). Background paper `#F8F7F3`, flat.
- 2px `#141414` frame so the card holds its edge on white surfaces.

## 3. Typography (3-family system)

| Role | Font | Size | Usage |
|---|---|---|---|
| Metric / headline | Newsreader Medium | ~74, fit-to-width | `35 GB …`, `758,161`, `165` |
| Accent line | Instrument Serif Italic | matched to headline | `filed under a slur.` |
| Eyebrow / labels | Inter SemiBold | 21 / 24 | caps eyebrow, stat labels |
| Subtitle / caption | Inter Medium | 34 / 24 | subtitle, card caption |
| Evidence / footer | JetBrains Mono Medium/Regular | 23 / 20 | sub-labels, domain, recall line |

Rules: headline and accent line always share one size (accent never
outgrows the headline). Nothing load-bearing below 22px — small previews
and recompression eat it. Serif is for numbers and hooks only; everything
evidentiary is sans or mono.

## 4. Color tokens

| Token | Hex | Use |
|---|---|---|
| Paper | `#F8F7F3` | canvas |
| Ink | `#141414` | headlines, borders, numbers, domain |
| Body | `#52504C` | subtitle |
| Muted | `#6E6B65` | eyebrow, micro labels |
| Lime | `#D4F527` | metric markers, stat sweeps |
| Crimson | `#C92A2A` | accent line, verdict number, pin |
| Verdict wash | `#FDF2F2` | verdict card fill |
| Track | `#EAE8E1` | (reserved) bar tracks |
| Hairline | `#E5E4DF` | divider rule |

## 5. Components

- **Eyebrow:** Inter SemiBold 21, caps, muted. Format: `BEAT · STORY`.
- **Headline lockup:** Newsreader Medium, ink, fit to 1072px starting at
  84. Lime marker bar behind the lead metric only (height ≈ lower half of
  cap-height, +4px right bleed).
- **Accent line:** Instrument Serif Italic, crimson, same size as
  headline. The emotional hook; keep to one short clause.
- **Subtitle:** Inter Medium 34, body gray. The factual deck (usually the
  post subtitle).
- **Divider:** 1px hairline, full content width, with ≥18px air above and
  ≥20px below. Never let it touch glyphs.
- **Stat block:** Inter Bold 24 label + Newsreader 76 number + 6px lime
  sweep under the number (sweep = number width). Two blocks max; same
  style, side by side.
- **Verdict card:** 420px wide, verdict-wash fill, 2px crimson border,
  6px radius. Contents: caps micro-label, giant serif verdict
  (`unseen`, 64), Inter caption, mono recall line. **Bookmark pin**:
  crimson map-pin straddling the top-right border — marks the number to
  remember.
- **Domain footer:** JetBrains Mono Medium 23, ink, bottom-left, clear of
  any sweep by ≥30px.

## 6. Spacing flow (top → bottom)

eyebrow 64 → headline 118 → accent +14 after headline block → subtitle
+14 → divider = subtitle-bottom + 18 → stat labels = divider + 20 →
numbers = labels + 44 → domain = sweep-bottom + 38. Card top aligns with
stat labels; card bottom lands near the domain baseline. When in doubt,
add air — crowding killed v1.

## 7. Content & accuracy rules

- Figures on the card are claims: `758,161 urls · 165 hosts · 35.1 GB`
  must equal the post. Recheck on every reuse.
- **VT wording rule:** never write `0/N detections` for something that
  was never submitted. The Ah San DLLs are *unseen* (item-not-found), not
  *clean*. Say `unseen / never submitted`, never a fake score.
- Beats per card: one hook (headline), one proof (stats), one sting
  (verdict). A fourth idea belongs in a figure, not the card.

## 8. Files & workflow

- Card: `assets/img/og-card-<slug>.jpg` (quality 90). First use:
  `og-card-cajefez-editorial.jpg` (Ah San stealer-panel post).
- New card = fill the five text slots (eyebrow / headline / accent /
  stats / verdict), fit the headline to the content width, and preview at
  500px wide before shipping — nothing load-bearing below 22px.
- Card text follows the same bar as posts: figures must match the post
  body (§7).

## 9. Codification path

v1 is a hand-tuned script. Next step: `tools/og/` — a spec-driven
generator (`card.yaml` in, JPG out, §8's five slots as schema) so new
cards need no layout code. When SHORTS video production starts, port the
tokens to Remotion: one token file drives both the video scenes and the
still exporter, so thumbnails and OG cards can never drift apart.

---
title: "Your Website Is a Casino on Google — and You Can't See It"
description: "Gambling pages are being served from the websites of a Malaysian political party, government agencies and a Singapore government sandbox — while the owners see nothing."
image: /assets/img/figure1-umno-cloak-vs-decloak.jpg?v=20260910
thumbnail: /assets/img/figure1-umno-cloak-vs-decloak.jpg?v=20260910
date: 2026-09-09 00:00:00 +0800
permalink: /2026/09/09/your-website-is-a-casino-on-google/
categories: [Cybersecurity, Threat Intelligence]
tags: [seo-cloaking, gambling, malaysia, singapore, website-hijack, brand-protection, threat-intelligence, umno, mof, jdn, isis-malaysia, iras, pharmacy-spam]
---


Imagine Googling your own company — and finding a casino.

<figure>
  <img src="/assets/img/figure1-umno-cloak-vs-decloak.jpg?v=20260910" alt="Figure 1. Same address, two websites" style="max-width:100%; height:auto;" />
  <figcaption>Figure 1. Same address, two websites. Left: what the owner sees when they visit umno.org.my. Right: what Google sees — a KEMBANGTOTO gambling storefront. Note the identical address bar. Both captured live on 10 September 2026.</figcaption>
</figure>

That is not hypothetical. In early September 2026, a sweep of search results showed Google
being served a full-blown gambling storefront called **KEMBANGTOTO** from `umno.org.my` — the
website of a Malaysian political party. Slot reels, jackpot banners, and the kind of glamour
imagery online gambling operators use to reel players in.

But open that exact same address in your own browser, and you'll see… the normal UMNO website.
No casino. No slots. Nothing suspicious.

**Same URL. Two completely different websites.** That is the trick — and it is exactly why the
owners never notice they have been hacked.

*Every figure in this post was captured live on 10 September 2026.*

## This isn't one unlucky site

This is not a rare, one-off attack — it is a recurring, region-wide campaign. In a single
sweep we surfaced dozens of legitimate websites hijacked this way across Malaysia, Indonesia,
Singapore, Thailand, Vietnam and the Philippines (some may have been cleaned since we mapped
them). The victims are not small blogs. Sites we observed — live or in Google's index — include:

- **UMNO** — a Malaysian political party
- The **Ministry of Finance's** budget portal — the live site is clean today, but Google's index
  still lists a casino page under it
- **KEJORA**, a government development authority
- **Jabatan Digital Negara (JDN)** — the government's own digital transformation agency, formerly MAMPU
- **ISIS Malaysia** — the Institute of Strategic and International Studies, a Malaysian think tank
- The **Perdana Leadership Foundation**, an NGO
- A **publicly accessible sandbox under Singapore's tax authority (IRAS)** and the **FinTech
  Academy** — the sandbox is carrying uploaded gambling content, though on the evidence so far
  this looks like an open, unmoderated upload area rather than a compromised server
- The **Election Commission's** Kedah state office — carrying pharmacy spam instead of gambling

One more thing worth knowing: a listing can outlive the page it points to. Open the **Ministry of
Finance's** budget portal today and you get the ordinary budget page, with no gambling content
at all. Google's index, however, still returns an **INATOGEL** casino page
under that domain. The injection has been cleaned up. Google's copy of it has not.

<figure>
  <img src="/assets/img/figure2-mof-clean-site-vs-google-index.jpg?v=20260910" alt="Figure 2. Google's index still lists a casino page under the Ministry of Finance budget portal, which is itself clean" style="max-width:100%; height:auto;" />
  <figcaption>Figure 2. Left: Google's index still returning an INATOGEL casino page under belanjawan.mof.gov.my. Right: the same address as it loads today — the ordinary budget page, with nothing gambling-related on it (captured 10 September 2026).</figcaption>
</figure>

## The casino the government itself couldn't see

This next one matters more. One of the cloaked domains belongs to **Jabatan Digital
Negara (JDN)** — the Malaysian agency formerly known as MAMPU, whose job is digitising the
government itself. While a human visitor saw a quiet, ordinary government portal, Google was
being served Vietnamese betting funnels — 79KING, V9BET, PG88, AE888 and MU88, plus live-match
streaming pages — all under a .gov.my address. The operator rotates the landing page, so the
site shown changes from one crawl to the next.

<figure>
  <img src="/assets/img/figure3-jdn-google-index-vs-injected-page.jpg?v=20260910" alt="Figure 3. JDN SQA subdomain: Google's index vs the injected page" style="max-width:100%; height:auto;" />
  <figcaption>Figure 3. Left: Google's index for sqa.jdn.gov.my — Vietnamese betting pages, including PG88 and 8xbet, listed under a .gov.my domain. Right: the casino page found at that same address. Visitors to the site were shown the ordinary "Portal SQA" page (captured 10 September 2026).</figcaption>
</figure>

That is worth pausing on: **the agency whose job is digitising the government was serving a
casino to Google.** If their cloak goes unnoticed, what chance does the average
company have?

It does not spare state agencies either. **KEJORA** is carrying at least five of them at once —
CEPOST4D, PROBET88, PETIR188, PASAR123 and LOYAL4D — each parked on its own path under the
authority's `eperjawatan` subdomain.

<figure>
  <img src="/assets/img/figure4-kejora-google-index-vs-injected-page.jpg?v=20260910" alt="Figure 4. KEJORA eperjawatan subdomain: Google's index vs the injected page" style="max-width:100%; height:auto;" />
  <figcaption>Figure 4. Left: Google's index for eperjawatan.kejora.gov.my — five separate gambling landing pages on a government development authority's subdomain. Right: the casino page found at that address (captured 10 September 2026).</figcaption>
</figure>

The campaign does not stop at government either. **ISIS Malaysia**, the Institute of Strategic
and International Studies, was found serving casino tutorials from one of its own platforms —
"How to Identify High Quality Slot Software UK" sitting right next to its policy analysis. This
one needed no cloak at all: every visitor, human or search engine, got the casino.

<figure>
  <img src="/assets/img/figure5-isis-google-index-vs-casino-article.jpg?v=20260910" alt="Figure 5. ISIS Malaysia platform: Google's index vs the live casino article" style="max-width:100%; height:auto;" />
  <figcaption>Figure 5. Left: casino articles indexed under a think tank's own platform. Right: the same article, live to any visitor. No cloak, no hiding (captured 10 September 2026).</figcaption>
</figure>

It reached an NGO too. The **Perdana Leadership Foundation**, which documents Malaysian
leadership for the public, had casino pages indexed all over its site — SURGA22 on the library
page, INDOBIT88 under publications, POS4D on the hall-rental page. Today every one of those
addresses serves the Foundation's own content, with nothing gambling-related left in the page.
Google, again, has not caught up: the casino titles are still what appears in search.

<figure>
  <img src="/assets/img/figure6-perdana-google-index-vs-live-page.jpg?v=20260910" alt="Figure 6. Perdana Leadership Foundation: Google's index vs the live page" style="max-width:100%; height:auto;" />
  <figcaption>Figure 6. Left: Google's index for perdana.org.my — gambling brands parked on the Foundation's library, publications and hall-rental pages. Right: the library page as it loads today — the Foundation's own content (captured 10 September 2026).</figcaption>
</figure>

Across the Causeway, Singapore offers two very different pictures. The first is a **publicly
reachable sandbox under the IRAS developer portal**, carrying a Malay-language "Toto Macau"
page that anyone can open. It is worth being precise about this one: the tax authority's main
website is untouched, and what we found sits on a sandbox subdomain built for testing. On the
evidence so far this looks less like a break-in than an open area where content can be published
without moderation — and nobody came back to clean it up. The second, the **FinTech Academy**,
is a plainer case: casino posts on its course platform and its backup platform, in half a dozen
languages, live to anyone who opens them.

<figure>
  <img src="/assets/img/figure7-iras-google-index-vs-gambling-page.jpg?v=20260910" alt="Figure 7. IRAS developer sandbox: Google's index vs the live page" style="max-width:100%; height:auto;" />
  <figcaption>Figure 7. Left: Google's index for the IRAS developer sandbox subdomain. Right: the same address, open to any visitor — a "Toto Macau" page. A sandbox left unmoderated is still a page on your domain (captured 10 September 2026).</figcaption>
</figure>

<figure>
  <img src="/assets/img/figure8-fintech-google-index-vs-casino-post.jpg?v=20260910" alt="Figure 8. FinTech Academy: Google's index vs the live casino post" style="max-width:100%; height:auto;" />
  <figcaption>Figure 8. Left: the course platform's Google listing. Right: one of those posts, live — an English casino promotion published alongside the course catalogue (captured 10 September 2026).</figcaption>
</figure>

The method is not exclusive to gambling either. The **Election Commission's Kedah state office**
is cloaked in exactly the same way: visitors get the office's own election pages, while Google is
handed German-language pharmacy spam. A different spam economy, running on an identical
mechanism — which is the point. Once a site can be made to wear two faces, what gets sold behind
the second one is just a matter of who pays.

<figure>
  <img src="/assets/img/figure9-election-commission-google-index-vs-pharma-spam.jpg?v=20260910" alt="Figure 9. Election Commission Kedah state office: Google's index vs the cloaked pharmacy spam" style="max-width:100%; height:auto;" />
  <figcaption>Figure 9. Left: Google's index for ppn.spr.gov.my — a German-language "Kamagra Oral Jelly" page listed under a Malaysian Election Commission subdomain. Right: that same address as Google receives it. A normal visitor gets the Kedah election office's own pages (captured 10 September 2026).</figcaption>
</figure>

## The two-faced shop

Here is how it works, in plain English.

Someone gains access to a legitimate website and plants code that makes the site behave
differently depending on who is asking. You get your real website. Search engines get a casino.

It is the digital equivalent of a shop that shows the owner their normal store, but hangs a
neon "CASINO" sign out front for everyone else walking past on the street.

The result: the owner sees nothing wrong. Google, meanwhile, dutifully indexes the casino under
**your** domain name — and then feeds it back to anyone who searches for you.

The entry point is almost always something mundane that nobody got around to patching — which
is why the site still "looks fine when I visit", and why simply deleting the offending page does
not fix it. Working out what was planted, and proving it, is the part that takes experience.

## What your customers actually see

A glossy gambling landing page sitting under your brand — slot machines, "TOTO 4D" jackpot
counters, and the glamour imagery these operators use as bait. Your company's domain name in the
address bar, above a page selling illegal gambling.

<figure>
  <img src="/assets/img/figure10-umno-google-serp.jpg?v=20260910b" alt="Figure 10. Live Google search showing a gambling result under umno.org.my, and the casino page served at that address" style="max-width:100%; height:auto;" />
  <figcaption>Figure 10. Left: a live Google search for the party's own website — the top result is a casino indexed under that domain. Right: what that result actually opens into (captured 10 September 2026).</figcaption>
</figure>

In Malaysia, where most forms of gambling are illegal, that is more than embarrassing. It is a
reputational and legal landmine sitting on your brand.

## Why this should worry every CTO and business owner

1. **You cannot see it.** Most monitoring checks your site the way a normal visitor does — and
   your site looks fine. The casino only appears to Google, so your own team's "is our site
   okay?" checks come back clean.
2. **Google does the damage for them.** The attacker does not need to spam anyone. They let
   Google index the casino under your domain, turning your own search results — your brand, your
   SEO built over years — into their advertisement.
3. **It erodes trust silently.** A customer Googles your name, sees "SLOT GACOR" or "KEMBANGTOTO"
   in the snippet, and quietly goes elsewhere. You never even get the complaint.

And this is not one attacker taking potshots. It is a coordinated campaign: the same brand names
appear across different victims in different countries, and the operators rotate disposable
domains to stay ahead of takedowns.

## How to check your own site

The one check worth running is Google's own: **Google Search Console → URL Inspection → Test
live URL**. It fetches your page the way Google does, and it is the fastest way to see the other
face of your site. If Search Console is not set up for your domain yet, that alone is worth
fixing today.

If what comes back looks wrong, that is the point at which to bring in help. Detection is the
easy half. Working out what was planted, where it lives, and what else was touched is the half
that decides whether it comes back next month.

## What to do if you find something

Take it seriously, and do not try to tidy it away. These attacks are built to survive a
superficial clean-up: remove the offending page and the casino tends to come back, because the
code serving it sits somewhere else entirely. Proper containment means finding what was changed,
proving what the site is serving now, and closing the way back in — in that order. Reporting
matters as well: we have notified MyCERT at CyberSecurity Malaysia of this campaign, and it is the
national point of contact for incidents like these.

Most importantly: **do not assume your site is fine just because it loads fine.**

---

Amirul Cyber offers **consultation services on security assessment and penetration testing** —
including checking whether your website is quietly serving a different face to search engines
than it serves to you. Scoped, evidence-led, and report-driven.

If that check comes back wrong — or you would like a proactive audit of your public-facing sites
and your Google presence — that is exactly the kind of work we do.

Interested in validating your security posture? **[Contact us](https://amirulcyber.com)** — or
reach us via [amirulcyber.carrd.co](https://amirulcyber.carrd.co).

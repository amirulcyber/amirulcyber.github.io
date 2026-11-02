---
title: A Fake LHDN Tax-Audit Notice on 21 Live Endpoints
description: 26 October 2026 wave impersonating Lembaga Hasil Dalam Negeri Malaysia. No credential form, one download button, and ZIPs that sideload genuine signed Windows binaries. 29 of 32 indicators absent from four vendor reports; probable Silver Fox. IOCs and screenshots inside.
image: /assets/img/figure1-lhdn-fake-audit-notice.jpg
thumbnail: /assets/img/figure1-lhdn-fake-audit-notice.jpg
date: 2026-11-02 00:00:00 +0800
permalink: /2026/11/02/malaysia-lhdn-tax-audit-impersonate/
categories: [Cybersecurity, Threat Intelligence]
tags: [malaysia, lhdn, tax-phish, silver-fox, void-arachne, dll-sideloading, ioc]
---

On 26 October 2026, Malaysian finance staff started receiving a tax-audit memorandum that looked exactly like correspondence from Lembaga Hasil Dalam Negeri Malaysia: the crest, a file reference, a forged director-general signature, and a seven-working-day deadline under section 99 of the Income Tax Act 1967. It was served from at least 21 live endpoints across four hosting arrangements. The page asked for no credentials. It had one interactive element, a download button, and the downloads were the attack: ZIP archives pairing genuine signed Windows programs with malicious DLLs. Of 32 verified indicators, 29 appear in none of the four vendor reports covering this campaign family. The grading is probable Silver Fox (Void Arachne), and this post keeps it at probable throughout.

{% include figure.html src="/assets/img/figure1-lhdn-fake-audit-notice.jpg" alt="Forged LHDN tax-audit notice as served from hasilgov-my.shop: crest, reference number, audit findings, and the MUAT TURUN DOKUMEN LENGKAP download button" caption="Figure 1. The forged notice on hasilgov-my[.]shop, captured 30 Oct 2026. Everything a recipient checks is present; the only action on offer is the download." eager=true width="1200" height="1335" %}

## Risk to a Malaysian finance team

The business risk is a trusted foothold, not a stolen form. The lure impersonates a tax audit with a seven-working-day deadline, which pressures finance staff to act before verifying. One click downloads a ZIP pairing a genuine signed Windows program with a malicious DLL, so signature and reputation controls see nothing wrong.

Exposed are staff handling LHDN correspondence, tax filing, and e-invoice processing. The exact lure message for this wave was never recovered; the wider family has historically arrived over WhatsApp and email, so assume any channel.

Have your team block the eight domains below at DNS and TLS inspection, alert on `topoedit.exe` outside System32/WinSxS and on any non-Microsoft `badata_x64.dll` beside TrueBurner, and verify every audit notice through the LHDN portal or known LHDN contacts, never through page links.

Expect signature AV to fail (both hosts are genuinely signed), static import rules to fail (neither DLL imports networking functions), and domain blocklists to decay (the operator rotates domains and rebuilds DLLs).

To check exposure, search EDR and proxy/DNS logs for the filenames, hashes, and domains below, and check `%TEMP%`, Downloads, and `C:\ProgramData\` for the archives and `.admin_elevation` / `.admin_persist` artefacts.

## The page is the delivery mechanism

Walk it top to bottom: LHDN crest (`logopx.ico`), `No. Rujukan: LHDN/CP.08/WP.05/ST.03/2026`, the heading NOTIS HASIL AUDIT DAN PENETAPAN CUKAI, a findings box (RM 50,000.00 under-reported income, down to a `RM 50,00.00` typo that survives in every variant, which is how you know one builder made them all), a seven-day document demand, and the anchor `MUAT TURUN DOKUMEN LENGKAP` pointing at `CP14_Notice_D2921116870_2025_2026-10-27.zip`. The branded pages contain no forms, inputs, or buttons. There is no credential form because none is needed. The click is the compromise.

I first hashed the browser-saved copy (`cfcc4e39…`), a re-serialisation. The wire bytes (`644e5b4f…`, 13,633 B) are the citable value, identical across all three branded domains.

## Two signed binaries, one family

The CP14 archive pairs Glorylogic True Burner 10.7.0.0 (Delphi, validly signed, compiled 2026-02-04) with `badata_x64.dll`: 232 named exports cloning the BurnAware engine interface, resolved at runtime, while the host's own import table lists only system DLLs. The e-Invoice archives pair Microsoft's own Topology Editor (`topoedit.exe`, signed under Microsoft Windows Code Signing PCA 2024, PE timestamp 2094, an invalid value) with `tedutil.dll` (18 exports cloning the real interface, of which the host imports 11, so the load succeeds).

Neither DLL imports a single networking function. No `ws2_32`, no `socket`, no `connect`; everything goes through the imported `LoadLibraryA`/`GetProcAddress`. A static rule keyed on Winsock imports will never fire on this family. The tells are placement and the sideload pair: 653 shared printable strings (91.6% of `.text`), and section names `.admin_elevation` and `.admin_persist` that state the loader's intent in plaintext.

The operator rotates builds, not just domains. `mhftee.my[.]id`, missed by the first capture and surfaced days later, serves the byte-identical host EXE with a recompiled DLL: 132,096 B against 135,680 B.

{% include figure.html src="/assets/img/figure2-lhdn-mexican-arm-satgob.jpg" alt="Mexican SAT-branded tax notice on satgob-mx.shop, served from the same host as the LHDN pages, with a DESCARGAR RESOLUCIÓN Y ANEXOS download button" caption="Figure 2. The Mexican arm on satgob-mx[.]shop: SAT branding, same host (103.97.131[.]121), but its download list holds only Malaysian payloads." width="1200" height="1213" %}

## The Mexican arm serves Malaysian payloads

`satgob-mx[.]shop` sits on the same `103.97.131[.]121` as the LHDN pages but wears Mexico's SAT branding with different assets (no `logopx.ico`). Its `FILE_LIST` holds only two files: the Malaysian MyInvois and Tenaga e-Invoice ZIPs. One host, two national lures, one payload pool, which is most of the single-operator argument.

That host also exposes unauthenticated `/stats.json` and `/count.php`. Three reads across 30 October showed visits climbing 357 to 366 while downloads stayed at 16. That counter is the operator's conversion metric, not a victim count: no dedupe, operator-resettable.

## Block on the payload, not the lure

Alert on `topoedit.exe` executing from anywhere outside System32/WinSxS, and on any non-Microsoft `badata_x64.dll` in a directory containing TrueBurner. Never on the signature and never on network imports. For detection, prefer the page markers over the domain: the wire hash and the favicon survive the domain churn that a blocklist does not.

Observed 26 October to 2 November 2026; every endpoint below returned `200` when rechecked 2 Nov, payloads included. Two formerly-listed hosts no longer serve campaign content and are excluded: `149[.]104[.]24[.]197` is silent, `45[.]192[.]110[.]206` answers `400` on bare and vhost. Domains defanged.

**Serving domains (LHDN arm):**

- `hasilgov-my[.]shop`, `hasil-gov-my[.]shop`, `hasilgov-my[.]my[.]id` (wire-identical pages)
- `mida[.]cam` (Cloudflare-fronted; no stable hash, per-response email-protection token)
- `midaoity[.]my` (`Loading…` meta-refresh to `download.php`)
- `mhftee[.]my[.]id`, `wwcvda[.]my[.]id` (second-build lure, identical file on both)
- `satgob-mx[.]shop` (Mexican SAT arm, same host)

**Hosts (serving today):**

- `103[.]97[.]131[.]121` (Cloudie, AS55933; serves six of the eight domains)
- `104[.]21[.]62[.]37` / `172[.]67[.]219[.]109` (Cloudflare; `mida[.]cam`)

**Archives (all unencrypted, deflated ZIPs):**

| Archive | Bytes | SHA-256 |
|---|---|---|
| `CP14_Notice_D2921116870_2025_2026-10-27.zip` | 2,018,504 | `50e2d8a24a26e22cc179767299fd65dde83bd166ab8ed9c3ae25278a1b953cfc` |
| `Notis_CP14_TT2025_C8658265270.zip` | 2,017,936 | `37203ae9e53b8dea346882ca9fc782abcde8006764d8c70f23cdf2e26a1566ee` |
| `MyInvois_e-Invoice_INV77194_LHDN_Validated.zip` | 122,962 | `d10163e71436cf8a827af30737a5b0c96dddbcc0cfdf861142493a871cd1f0be` |
| `e-Invoice_INV16697_Tenaga_Systems_Sdn_Bhd_Validated_2026-10-26.zip` | 123,280 | `a07ef268104ccd8691a0f80ab698820f4c202a4955d0fd40564e7f48f84ed9d2` |

**Binaries (members of the above):**

- `CP14_Notice_…exe` (True Burner host), 5,798,000 B: `e0ee8df47283ea4b1db8662dc7409b9069753de14754258b761c40b4e0cb19c2`
- `badata_x64.dll` (build 1), 135,680 B: `78714f6f57c5177201837ce7a6185a2b2bb00a074883fc6cf03b8ade192a20ba`
- `badata_x64.dll` (build 2), 132,096 B: `79667b9fab75fb02b3a2ff59bb1fad5bc1b4feb3cd7942c143ce4a15d6d04856`
- `…INV77194….exe` / `…INV16697….exe` (`topoedit.exe` host, identical), 227,688 B: `1688fe4698c45680851f5d90aff71fffdccb19c1b283a8c10cbc729c8efca7d8`
- `tedutil.dll` (MyInvois), 109,056 B: `9500e41175cbe66a3e95bd863e0e855cf15f51ab9a44024fa082697ec992db0f`
- `tedutil.dll` (Tenaga), 109,568 B: `4841193715abddabd3b85e8d9bab651ffd7169286365f59b6dc0f1fde1be8d97`


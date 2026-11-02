---
title: Malaysia LHDN Tax Audit Phishing Campaign – Silver Fox (Oct 2026)
description: Fake LHDN tax-audit wave, 26 October 2026. No credential form, one download button, ZIPs sideloading signed Windows binaries. 29 of 32 indicators unpublished; probable Silver Fox. IOCs and screenshots inside.
image: /assets/img/og-card-lhdn-tax-audit.jpg
thumbnail: /assets/img/figure1-lhdn-fake-audit-notice.jpg
date: 2026-11-02 00:00:00 +0800
permalink: /2026/11/02/malaysia-lhdn-tax-audit-impersonate/
categories: [Cybersecurity, Threat Intelligence]
tags: [malaysia, lhdn, tax-phish, silver-fox, void-arachne, dll-sideloading, ioc]
---

## Overview

A campaign impersonating Malaysia's Inland Revenue Board (Lembaga Hasil Dalam Negeri Malaysia, or LHDN) is using fraudulent tax-audit notices to distribute malware disguised as legitimate Windows software.

First observed on 26 October 2026, the campaign uses LHDN-branded pages featuring the agency's crest, fabricated reference numbers, a forged director-general signature and an urgent seven-working-day deadline. The notices claim to concern tax under-reporting and request supporting documentation.

Unlike conventional phishing campaigns, the pages do not attempt to collect usernames or passwords. Instead, they direct visitors to download purported tax-audit documents packaged as ZIP archives.

The archives contain legitimate, digitally signed Windows executables paired with malicious DLLs. When executed, the applications load the malicious libraries through DLL sideloading.

The investigation identified 21 live serving endpoints across four hosting arrangements and two distinct software delivery chains involving Glorylogic True Burner 10.7.0.0 and Microsoft's Topology Editor.

Infrastructure analysis also revealed an interesting overlap with a Mexican SAT-themed impersonation domain hosted on the same server as the Malaysian LHDN campaign. The shared infrastructure exposes the Malaysian payload collection through both national tax-themed lures.

The campaign is assessed as probably associated with Silver Fox (Void Arachne), although the available evidence does not establish definitive attribution.

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

## Second stage and C2, via sandbox

Static analysis sees the loader. A third-party sandbox run watched it execute: on detonation the DLL pulls an encrypted second stage, `devin-us.dat`, from a GitHub release asset (`github[.]com/mariauyrnq/devin-update`, v1.0.01), then unpacks a Go client built from `overlord-client` packages, the Overlord RAT. It opens persistent WebSocket channels to `devin-us[.]com`, which hosts the TankRat web panel (Simplified Chinese admin login, TOTP plus OIDC). Observed capabilities: live display streaming, hidden virtual desktops, keystroke injection, clipboard theft, and a fake Windows Update screen shown while the operator works.

Runtime behaviors worth detecting: the DLL is invoked via `rundll32.exe`, checks for `vboxguest.sys` and VMware drivers, and looks up the victim IP via `api[.]ipify[.]org`. That last is a public IP API used by legitimate software too, a behavior marker rather than a block target. A related lure filename, `ITR_Scrutiny_240_Notice_PAN_PAN_ABCDE1234F_AY2025-26_05082026.exe`, mimics Indian income-tax scrutiny notices, the same kit in a different national costume.

Attribution: probable Silver Fox. The overlaps point one way: shared hosting and a shared payload pool across the Malaysian and Mexican arms, and payload telemetry correlating with Overlord and TankRat infrastructure targeting Southeast Asian corporate finance.

The same C2 surfaced a month earlier in Japanese tax-phishing emails (subject 'Tax Payment Notice Regarding Final Income Tax Return') linking `mjdou[.]vip`, hosted on `149[.]104[.]24[.]197` — the address that served this cluster's Malaysian domains before going silent. The downloaded ZIP drops an EXE plus `event.dll`, a DonutLoader yielding to Overlord, beaconing to the same `devin-us[.]com`. Analyses: [VirusTotal](https://virustotal.com/gui/file/ba0a76532db536e62034c212536f3e60594cd2248fdedc9ba73b8a2380367f99), [Triage](https://tria.ge/260915-hmt48ashld/behavioral1), [ANY.RUN](https://app.any.run/tasks/59aad69e-d2b1-44fd-934e-9db8e617bdd5), [urlscan](https://urlscan.io/result/01a0a3d4-808e-734f-b032-31c5d6fe886e/).

{% include figure.html src="/assets/img/figure2-lhdn-mexican-arm-satgob.jpg" alt="Mexican SAT-branded tax notice on satgob-mx.shop, served from the same host as the LHDN pages, with a DESCARGAR RESOLUCIÓN Y ANEXOS download button" caption="Figure 2. The Mexican arm on satgob-mx[.]shop: SAT branding, same host (103.97.131[.]121), but its download list holds only Malaysian payloads." width="1200" height="1213" %}

## The Mexican arm serves Malaysian payloads

`satgob-mx[.]shop` sits on the same `103.97.131[.]121` as the LHDN pages but wears Mexico's SAT branding with different assets (no `logopx.ico`). Its `FILE_LIST` holds only two files: the Malaysian MyInvois and Tenaga e-Invoice ZIPs. One host, two national lures, one payload pool, which is most of the single-operator argument.

That host also exposes unauthenticated `/stats.json` and `/count.php`. Three reads across 30 October showed visits climbing 357 to 366 while downloads stayed at 16. That counter is the operator's conversion metric, not a victim count: no dedupe, operator-resettable.

## Block on the payload, not the lure

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

**Sandbox-derived (third-party dynamic analysis):**

- C2 and TankRat panel: `devin-us[.]com`
- Second-stage staging: `github[.]com/mariauyrnq/devin-update/releases/download/v1.0.01/devin-us.dat`
- Related lure filename (India arm): `ITR_Scrutiny_240_Notice_PAN_PAN_ABCDE1234F_AY2025-26_05082026.exe`
- Runtime behaviors (detect; do not block the legitimate service): `rundll32.exe` invoking `badata_x64.dll`; VM-driver checks; victim IP lookup via `api[.]ipify[.]org`
- Japan arm (September): lure `mjdou[.]vip` on `149[.]104[.]24[.]197`; C2 IP `103[.]59[.]101[.]28`; associated file `ba0a76532db536e62034c212536f3e60594cd2248fdedc9ba73b8a2380367f99`

**Further reading**

- [NetbyteSEC, Malaysian WhatsApp Phishing Wave Delivers Overlord Malware](https://notes.netbytesec.com/2026/10/malaysian-whatsapp-phishing-wave.html) — the Overlord chain sharing our `topoedit.exe` host hash.
- [Pelagos Intel, SilverFox in the Desktop](https://research.pelagos-intel.com/silverfox-in-the-desktop) — the earliest public description of this delivery shape.
- [MyCERT MA-1491.102026](https://www.mycert.org.my/portal/advisory?id=MA-1491.102026) — a separate Malaysian ManageEngine-based chain from the same period; different payloads from this cluster.
- [MyCERT warning on WhatsApp malware, via Lowyat](https://www.lowyat.net/2026/396842/mycert-high-risk-malware-whatsapp-web-desktop-malaysia/) — high-risk malware targeting WhatsApp Web and Desktop users in Malaysia.
- [Thread on X](https://x.com/bomccss/status/2099758827386319001) — Japanese-arm observations: `mjdou[.]vip` lure on `149[.]104[.]24[.]197`, same `devin-us[.]com` C2, DonutLoader-to-Overlord chain with sandbox links.


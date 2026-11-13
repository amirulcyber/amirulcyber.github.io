---
title: 35 GB of Indian Browser Data, Filed Under a Slur — Inside the Ah San Stealer Panel
description: Hundreds of Indian victims' browser hauls filed under a slur on the operator's box. Tax lures drop signed-host sideload pairs (Adobe, Evernote) carrying unknown stealer DLLs to a CHWM-branded panel. Possible Silver Fox second chain.
image: /assets/img/og-card-cajefez-stealer-panel.jpg
thumbnail: /assets/img/figure1-cajefez-lure-in.jpg
date: 2026-11-12 00:00:00 +0800
permalink: /2026/11/12/ah-san-stealer-panel/
categories: [Cybersecurity, Threat Intelligence]
tags: [stealer, tax-phish, sideloading, silver-fox, whatsapp, ioc]
---

## Verdict

> Nobody's antivirus saw it coming, because there was almost nothing to see: a signed Adobe program, a tax notice in your own language, and a DLL no vendor on earth had ever encountered.
>
> **Assessment:** a South/Southeast-Asia tax-lure operation ends in a browser/WhatsApp **stealer panel** — 758,161 URLs and 35 GB of loot across 165 graded hosts, overwhelmingly Indian — delivered through two distinct signed-host sideload pairs and exfiltrated over WhatsApp. Assessed with moderate confidence as Silver-Fox-adjacent tradecraft.
> **Scale:** 758,161 URLs · 165 hosts · 35.1 GB exfiltrated · IN 115 / PK 17 / UK 14 / ID 8.
> **What's new:** (1) Adobe Creative Cloud + unsigned `CRClient.dll` sideload pair, VT-unknown; (2) VHD/IMG disk-image delivery with per-build renames; (3) WhatsApp used as the operator's exfil courier, with live media until late November.
> **Attribution:** tracked here as **Ah San** (name drawn from an operator-side artefact — a tracking label, not a real-world identity and not a vendor designation). Possible Silver Fox second tool-chain; possible separate operator reusing the published playbook.
> **Ask:** block the lure apexes and stealer hashes below; hunt the sideload pair, not the filenames.

## Attribution

**Ah San** is the tracking name used in this post, taken from an operator-side artefact. It is a label for the activity cluster — not a real name, not a vendor designation, and not attribution to any known actor. Probable context worth stating plainly: the name coincides with a derogatory Chinese slang term for Indians (see Baidu Baike, "I SAY (A derogatory term for Indians)": https://baike.baidu.com/en/item/I%20SAY/1421118). Against overwhelmingly Indian victim targeting, that reads as native-speaker vocabulary with contempt for the victim set — consistent with a Chinese-speaking operator, and worth keeping in mind when reading the lure themes below. The panel brand behind the operation is CHWM.vip. Two readings fit: (a) a Silver Fox second tool-chain beside ValleyRAT (~possible: same tax-lure playbook, sideloading, Alibaba infra, WhatsApp contact, geofencing); (b) a separate Chinese-speaking stealer-panel operator reusing the published playbook (~possible: zero shared IOCs with any published Silver Fox chain, stealer economics vs RAT ops). What would settle it: a shared C2/registrant/PDB string with a published chain, or the per-build key blobs resolving to known infrastructure. Naming a vendor actor now would overclaim.

## Terms

| Term | Means in this post |
|---|---|
| loader | the unsigned DLL a signed program sideloads (`CRCLIENT.dll`, `ENCRASHREP.dll`) |
| host | the genuine signed program abused as loader (`Creative Cloud`, `EvernoteTray`) |
| panel | the operator-side collection infrastructure (brand `CHWM.vip`) |
| courier | WhatsApp messages moving collector bundles to the operator |

## Scope

Observed 26 October – 12 November 2026. Corpus: two WhatsApp-carried disk images fully analysed, one live lure payload fetched, 758,161 browser-history URLs across 165 compromised hosts graded for victimology.

## Risk to a finance and admin team

The lure is a tax notice in your language — Malay LHDN, Hindi income-tax, Indonesian DJP — with a per-recipient download code, which pressures staff to click before verifying. One click mounts a disk image whose single EXE is genuinely signed, so signature and reputation controls see nothing wrong; the unsigned DLL beside it does the stealing: keystrokes, screenshots, browser credentials, WhatsApp data.

Exposed are staff handling tax correspondence and anyone who opens "documents" from messaging apps. Have your team block the lure domains below at DNS, alert on `CRClient.dll` or `encrashrep.dll` loading outside their vendors' install paths, and verify every tax notice through the agency portal or known contacts — never through page links.

Expect signature AV to miss the DLLs (both unknown to VirusTotal at time of writing), static import rules to underperform (networking hides behind runtime-resolved calls), and filenames to rotate every build — hunt the pair, not the name.

## The lures speak three tax offices

Walk one: agency crest, a fabricated reference number, an under-reporting claim, a seven-day-style deadline, and a single download button carrying a per-recipient token (`index.php?tk=<32 hex>`). The Malaysian lane impersonates LHDN ("Muat Turun Dokumen", live with a second MY apex staged), the Indian lane the Income Tax Department in Hindi ("Enforcement Division, Aayakar Bhawan"), the Indonesian lane DJP ("Pemberitahuan Pelanggaran"). Themes rotate per apex: this same host served the MY LHDN notice in late October (public urlscan capture, 26 Oct) and the ID DJP page by November. Same builder tells across lanes: `class="download-link"` triplets, `<timestamp>.<UPPERHEX>.zip` payload names with victim-local timestamps, one-time token links (now 404 once burned).

<!-- Figures: fig1 IN Hindi live render, fig2 MY Oct urlscan capture, fig3 ID DJP live render, fig4 mermaid chain diagram, fig5 VT unseen. OG card set. -->
{% include figure.html src="/assets/img/figure1-cajefez-lure-in.jpg" alt="Hindi income-tax penalty notice as served live from cheulmri.link: bilingual download button carrying a per-recipient token link" caption="Figure 1. The Indian lane, live: Hindi notice, one download button, one token. The page that starts the chain." width="1200" height="1200" %}
{% include figure.html src="/assets/img/figure2-cajefez-lure-my-oct.jpg" alt="Malay LHDN additional-assessment notice as served from biaoisdiu.work in late October 2026: Muat Turun Dokumen download button; the same apex served the Indonesian DJP page by November" caption="Figure 2. The same apex, a different month: MY LHDN notice on biaoisdiu.work (Oct, via public urlscan capture) — themes rotate per host." width="1200" height="900" %}
{% include figure.html src="/assets/img/figure3-cajefez-lure-id.jpg" alt="Indonesian DJP notice as served live from biaoisdiu.work: audit findings, seven-working-day deadline, download the documents" caption="Figure 3. The Indonesian lane, live: same builder, third language. All three lanes lead to the same disk-image payload." width="1200" height="1200" %}
{% include figure.html src="/assets/img/figure4-cajefez-chain.jpg" alt="Attack chain diagram: tax lure to ZIP to disk image to signed EXE plus unsigned sidecar DLL to panel and WhatsApp courier" caption="Figure 4. The chain in one picture. Green is what allowlists see; red is what steals." width="1200" height="94" %}

## Two sideload pairs, one playbook

Each payload is a disk image (VHD via WhatsApp, ISO via the farm) holding exactly two files in its root. **Know which is which: the EXE is a legitimate signed program being abused; the DLL beside it is the malware.** The EXE imports its helper DLL by name, and Windows loads whatever file carries that name — so the unsigned impostor runs inside the trusted process.

| Channel | Host — LEGITIMATE, signed ✅ | Loader — MALWARE, unsigned 🛑 |
|---|---|---|
| WhatsApp VHDs (26 + 29 Oct builds) | Adobe Creative Cloud Desktop 6.4.0.358 (genuine, VT known-good) | `CRCLIENT.dll`, 8.8 MB, Quark-lineage classes, `SecurityGuardSDK` builder path, unknown to VT |
| Farm lure (11 Nov build) | Evernote `EvernoteTray.exe` (genuine, signed, VT known-good) | `ENCRASHREP.dll`, 5.7 MB, `NvOAWrapperCache` builder path, unknown to VT |

The genuine `CRClient.dll` tops out near 1.7 MB with an Adobe signature; the impostor is 8.79 MB with neither. The genuine EvernoteTray is signed; the sidecar is not. In both pairs the host is what allowlists see and the DLL is what steals — keylogging, screenshots, browser-credential theft, injection primitives, file-transfer/HTTP exfil, anti-analysis checks, all confirmed statically. No plaintext C2 ships in either DLL; staging is encrypted or fetched.

| | Genuine article | What victims got |
|---|---|---|
| Adobe side | `CRClient.dll` ≤ 1.7 MB, signed by Adobe | 8.79 MB, unsigned, Quark classes, `SecurityGuardSDK` PDB |
| Evernote side | `EvernoteTray.exe`, signed, Evernote China | identical host + unsigned 5.7 MB `ENCRASHREP.dll`, `NvOAWrapperCache` PDB |
| Detection | allowlist sees the host, waves it through | hunt the sidecar, not the filename |

{% include figure.html src="/assets/img/figure5-cajefez-vt-unseen.jpg" alt="VirusTotal Item-not-found page for the sidecar DLL hash: never submitted, unknown to every vendor" caption="Figure 5. What every payload DLL looks like on VirusTotal: never submitted, unknown to every vendor. All three — both CRClient builds and ENCRASHREP — return this page; only the signed carrier EXEs have records (clean). Screenshots via public VirusTotal lookups, 12 Nov." width="800" height="373" %}

## The panel and the courier

The collection panel brands itself `Powered By www.CHWM.vip` (marker file at its root; brand domain now parked). Its web root answers 200 with a 0-byte body — uploads only, no public surface. *(Panel address withheld; panel screenshot with identifiers masked to be added as figure.)*

Exfil runs on two rails: panel archives (hundreds of host directories, batch-cleared on a cadence) and WhatsApp messages carrying collector bundles between the field and the operator (filenames encode collection timestamps; media stayed retrievable into late November).

## Victimology in one paragraph

758,161 URLs across 165 graded hosts: India dominant (115 hosts), then Pakistan (17), UK (14), Indonesia (8), Canada (4). Enterprise mid-cap skew (telco, conglomerates, universities, a Big-4 tenant); one strong education-sector signal. No military, no employee-mail compromise observed in the graded set.

## IOCs

**Block now (high confidence, safe to block):** the five lure/panel domains below, plus the seven file hashes in the copy-paste block.

**Hunt (behavioural/conditional):**

- signed EXE (`Creative Cloud`, `EvernoteTray`) loading an unsigned same-directory `CRClient.dll` / `encrashrep.dll`, especially from a mounted image or Downloads — the pair, never the filename alone;
- PDB strings `SecurityGuardSDK64`, `NvOAWrapperCache` (`C:\Users\Administrator\…` builder paths);
- Quark class names (`QuarkService`, `QuarkShellExt`, `QuarkDriveOfficeAddin`) inside an unsigned DLL;
- 8–9 MB unsigned DLL beside a ~1 MB / ~600 KB signed host (size anomaly: genuine `CRClient.dll` ≤ 1.7 MB).

**Context (report-only, do not block):**

- NS `ns1/ns2.22.cn`, registrar IANA 1555, bulk 2026-08-09 registrations, shared JARM (full value in the block below)
- `22.cn`-style naming, `<LET>.<8HEX>.EXE` renames, `ZM_<digits>` / `XJUI_` / `ZLTZ_` image prefixes

```text
# Ah San — blocklist v2026-11-12 (domains + sha256, VT status at publish)
wheiulmra.work
biaoisdiu.work
cheulmri.work
cheulmri.link
cajefez.club
15c741198f29395028668f08ae284e42d7dd1e40fb07ecf430ea2d04c22c53b4  # lure ZIP (unknown to VT)
e0d09cd918cafb574e77d2674940c5a83ae1d2fcf44a6585ceec38c6d5115e55  # lure ISO (unknown to VT)
144ddea89638a13736fef3641126332d6e75faa59637ae5ae5b2b52318894bbc  # A EXE, EvernoteTray carrier (known-good)
2a293f9677b9727f292eebc11a09e31c38ef8b9944f6e81cfe1e0fc1a8662b1c  # ENCRASHREP.dll (unknown to VT)
81cf4d59df869abfe5034d160090d88bc9c573e8c5daf284fd29417d48411d5b  # B/EC EXE, Adobe carrier, identical (known-good)
8580ec5a0a982483c8cb7a4749ad5c58dc15f765371502f438e56e9ab1aeeb0f  # CRCLIENT.dll 10-26 (unknown to VT)
5c297a2545402911de3c0cfe491c870c100c11ef3fb2c04d32be2181e354250f  # CRCLIENT.dll 10-29 (unknown to VT)
3fd3fd0003fd3fd00042d43d0000002059a3b916699461c5923779b77cf06b  # shared JARM, farm host
```
- Short.io-branded short domain pattern for lure delivery

## Detection

Hunt the relationship, not the artifact: alert when a signed Adobe/Evernote process maps an unsigned image from its own directory (Sysmon ImageLoad / EDR module-load telemetry), and when `rundll32`-free sideload hosts spawn no child yet open network connections. Pair with the size gate (sidecar > 5 MB next to a signed host) and the PDB strings above. Expect filenames and hashes to rotate per build — the YARA below keys on builder strings and export surface instead:

```yara
rule cajefez_crclient_loader {
  meta: description = "Unsigned Quark-lineage DLL as Adobe CRClient.dll";
  strings: $pdb = "SecurityGuardSDK64.pdb" $q1 = "QuarkService" $q2 = "QuarkShellExt"
           $e1 = "ShowCRDialogOnlyOnFirstCrash" $e2 = "ShowCRNativeDialogOnCrash";
  condition: uint16(0) == 0x5A4D and filesize > 8MB and filesize < 10MB
    and $pdb and 1 of ($q*) and 1 of ($e*);
}
rule cajefez_encrashrep_loader {
  meta: description = "Unsigned ENCRASHREP.dll with NvOAWrapperCache PDB";
  strings: $pdb = "NvOAWrapperCache.pdb" $h = "encrashrep" nocase;
  condition: uint16(0) == 0x5A4D and filesize > 5MB and filesize < 7MB
    and $pdb and $h;
}
```

## What to do this week

- **Defenders (today):** block the five domains and seven hashes above at DNS and EDR; hunt the sideload pair, not the filenames.
- **Intel teams (this week):** watch for the next per-build DLL (new hash, same PDB strings, same ~8 MB / ~5.7 MB sizes) and for fresh `.work`/`.link` registrations under IANA 1555 with `22.cn` nameservers.
- **CERT:** relevant national CERT body has been notified.

## Further reading

- [Kaspersky, Silver Fox tax-notification campaign](https://securelist.com/silver-fox-tax-notification-campaign/120038/) — the tax-lure playbook this operation reuses.
- [VMRay, Beyond ValleyRAT: Inside a China-Nexus Silver Fox Operation](https://www.vmray.com/beyond-valleyrat-inside-a-china-nexus-silver-fox-operation/) — same tradecraft family (image sideload pairs, per-build keys), divergent payload and infra; no identifier overlap with this case.
- [Kaspersky, ValleyRAT spreading disguised as adware (QN Wallpaper)](https://securelist.com/valleyrat-backdoor-adware/121175/) — signed-host sideload precedent with Quark-adjacent tooling.

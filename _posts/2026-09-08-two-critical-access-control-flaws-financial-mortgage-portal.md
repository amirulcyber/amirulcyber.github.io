---
title: "Two Critical Access-Control Flaws in a Financial Institution's Mortgage Portal"
description: "Amirul Cyber's vulnerability research on a Malaysian financial institution's mortgage portal surfaced two Critical access-control flaws exposing full identity, bank, and property data."
image: /assets/img/og-card-mortgage-portal-v2.jpg
thumbnail: /assets/img/og-card-mortgage-portal-v2.jpg
date: 2026-09-08 00:00:00 +0800
permalink: /2026/09/08/two-critical-access-control-flaws-financial-mortgage-portal/
categories: [Cybersecurity, Vulnerability Research]
tags: [broken-access-control, idor, spring-security, financial-services, malaysia, pdpa, responsible-disclosure]
---


At Amirul Cyber, we conduct hands-on vulnerability research across the applications that handle
our region's most sensitive data. We recently engaged in vulnerability research on a Malaysian
financial institution's digital mortgage-application portal — and surfaced **two Critical
access-control flaws** that, together, exposed **more than 100 account records** and **more than 20
complete mortgage applications** to unauthenticated or low-privilege callers. The data at risk
included full identity, bank account, and property details.

![Redacted excerpt of the customer data exposed through the broken access control](/assets/img/figure1-redacted-customer-data.jpg)

*Figure 1 — Redacted sample of the customer data exposed by the broken access control.*

## Finding 1 — Unauthenticated read of the account-management API (Critical)

A backend serving the portal's account-management module returned a `200 OK` for an
unauthenticated `GET` on its accounts endpoint:

```
GET /user-management/accounts → HTTP/1.1 200
```

The response was a JSON array of account records, each carrying the full name, email address,
phone number, and role (administrator, staff, customer) — including internal staff and third-party
vendor accounts. Read paths were left open while the mutating methods on the same module were
correctly authenticated (they returned `401`), which points to a missing `permitAll()` matcher on
the read endpoints rather than a wholesale authentication failure.

**Root cause class**: incomplete Spring Security authorisation rules — authentication was enforced
on writes, not reads.

## Finding 2 — Broken access control across every application (Critical)

A second backend, hardened correctly on its own (default-deny, gated writes), nevertheless
*trusted* the access token issued by the first. Any low-privilege customer account — obtainable
without credentials — could read every submitted application:

```
GET /application/get/all/customers → HTTP/1.1 200
```

Each record exposed the full contents of a mortgage application: **NRIC, date of birth,
residential and employer addresses, bank account number, property information, and spouse/nominee
details**. This is a classic broken-object-level-authorisation / IDOR pattern compounded by
cross-service token trust: the second service never verified audience or issuer, so a token from
the compromised service was replayed against it directly.

## The full chain

The two criticals were not independent — they collapsed into a single reproducible path:

```
register (no identity check) → verify (no token) → self-approve eligibility → log in → read every application
```

Any anonymous visitor could become an "eligible customer" in under a minute and then enumerate all
applicants' full personal and financial records.

## Impact

The exposed data — full identity, bank account, and property details of mortgage applicants —
engaged Malaysia's statutory data-protection and cyber-incident obligations, including the
**PDPA 2010 / 2024 amendment** (Security Principle and breach-notification duties) and **Act 854**
for financial-sector entities.

## Disclosure

Because the exposed data was potentially sensitive customer data, we notified the affected
organisation and the relevant regulator. The organisation responded promptly — the affected
backends were taken off the public internet within days — and re-testing across a 14-day window
confirmed the exposure remained closed.

## Key takeaways

1. **Authorisation, not authentication, was the failure.** Where authentication existed, it was
   sound (signatures verified, `alg:none` rejected). The gap was a subset of endpoints enforcing
   who could *read* what.
2. **Microservice boundaries are not trust boundaries.** A well-hardened service was compromised
   transitively because it trusted a token minted by a weaker one.
3. **Externally-facing financial portals warrant continuous, not point-in-time, attention** — the
   finding only has value because it was re-verified until the surface was actually closed.

## Validate your own security posture

Findings like these rarely surface through automated scanning alone — they require a trained eye
on how your applications enforce access control in practice. Amirul Cyber offers **consultation
services on security assessment and penetration testing**: scoped, evidence-led, and report-driven,
with findings mapped to the regulatory obligations that matter to your business.

Interested in validating your security posture? **[Contact us](https://amirulcyber.com)** —
or reach us via [amirulcyber.carrd.co](https://amirulcyber.carrd.co).

---

#CyberSecurity #BrokenAccessControl #IDOR #SpringSecurity #FinancialServices #PDPA #ResponsibleDisclosure #Malaysia

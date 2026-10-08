---
title: Sustained Web Attacks Against Malaysia's Financial Sector
description: Login, OTP, and API endpoints across Malaysia's banking, savings, investment/funds and government-linked services face sustained automated abuse. The question is whether controls hold while under attack.
date: 2026-10-08 00:00:00 +0800
permalink: /2026/10/08/sustained-web-attacks-malaysia-financial-sector/
categories: [Cybersecurity, Threat Intelligence]
tags: [malaysia, financial-services, web-attacks, ddos, authentication, otp, waf, rate-limiting, bot-management]
---

During October 2026, login, OTP, and public API endpoints across Malaysia's banking, savings, investment/funds and government-linked services have faced sustained high-volume web attacks, Layer 7 denial-of-service, and automated authentication abuse.

Separately, on 8 October, Tabung Haji announced it had temporarily suspended services after detecting suspicious cyber activity on Oct 7, describing the suspension as precautionary while it monitors its systems alongside NACSA and CyberSecurity Malaysia. It stated that depositors' savings and personal data remain safe. (The Star, 8 Oct 2026: https://www.thestar.com.my/tech/tech-news/2026/10/08/tabung-haji-suspends-services-after-detecting-suspicious-cyber-activity)

## Observed infrastructure

Seven prefixes and three ASNs illustrate the pattern.

### 1. The attack infrastructure is highly distributed

Observed source infrastructure spans residential ISP networks, cloud hosting, datacentres and proxy/VPN services across multiple jurisdictions.

Examples include infrastructure from networks represented by:

- 112.xxx.xxx.xxx
- 49.xxx.xxx.xxx
- 64.xxx.xxx.xxx
- 200.xxx.xxx.xxx
- 185.xxx.xxx.xxx
- 35.xxx.xxx.xxx
- 82.xxx.xxx.xxx

The presence of residential ISP space is particularly notable.

Some observed addresses appear to originate from consumer broadband networks rather than conventional datacentres. This can be consistent with compromised devices, residential proxy services or distributed bot infrastructure, although an IP address alone cannot establish which explanation applies.

### 2. Proxy and VPN infrastructure is visible

Several observed addresses have public intelligence characteristics associated with proxy or VPN infrastructure.

This matters because the source IP observed by a financial institution may represent an egress point rather than the original source of the traffic.

Consequently, simple IP blocking can become an ineffective long-term strategy.

### 3. Hosting infrastructure is fragmented

The observed sources are spread across multiple hosting providers and networks.

There is no obvious single hosting provider that explains the entire dataset.

This is consistent with an attacker using distributed infrastructure or multiple intermediaries, but it does not by itself establish that the activity is controlled by a single threat actor.

### 4. Some ASNs have meaningful relationships

Several observed network identifiers have documented upstream or provider relationships.

For example, infrastructure associated with:

- AS219xxx
- AS625xx
- AS200xxx

shows network-level relationships within the broader hosting ecosystem.

This is an important intelligence lead.

However, a routing relationship is not equivalent to common ownership, common control or threat-actor attribution.

The stronger investigative signal comes when multiple sources from related infrastructure demonstrate the same:

- Attack timing
- Request patterns
- Target selection
- TLS characteristics
- HTTP behaviour
- User-Agent patterns
- Request rates

### 5. Some infrastructure has historical abuse signals

Public reputation sources contain historical reports involving individual addresses within some of the observed networks, including:

- Web application attacks
- Brute-force activity
- Automated probing
- Suspicious HTTP requests

These reports provide useful context but should not be interpreted as proof that the same addresses were responsible for the current Malaysian activity.

An IP can be reassigned, compromised, shared by multiple customers or used as a proxy.

### 6. Infrastructure can change

Some observed addresses have historical associations with different networks or providers.

This reinforces an important intelligence principle:

An IP address is an observation, not an identity.

Static WHOIS information, geolocation and ASN ownership should therefore be combined with time-specific network telemetry.

## The attack does not have to be sophisticated to be disruptive

The current activity demonstrates that significant operational disruption can be achieved without exploiting a sophisticated zero-day.

A combination of:

distributed infrastructure + automation + application-layer requests

can be enough to degrade a poorly protected service.

A Layer 7 attack may consume application, API, database or backend resources without requiring enormous network bandwidth.

Potential consequences include:

- Increased application latency
- API exhaustion
- Database contention
- Authentication failures
- Customer account lockouts
- Increased infrastructure costs
- Service degradation
- Complete application unavailability

This makes application-layer resilience just as important as traditional volumetric DDoS protection.

## Authentication is also an availability problem

Automated login and OTP activity can create customer impact even when no account is successfully compromised.

Repeated authentication attempts can trigger:

- Account lockouts
- OTP delivery spikes
- Authentication-service load
- Customer confusion
- Increased support demand
- Phishing opportunities

This leads to an important distinction:

An authentication system can successfully prevent account takeover while still failing as a resilient customer service.

CISOs should therefore assess authentication controls for both security and abuse resilience.

## Controls that need validation

The recurring lesson is not necessarily that organisations lack security technology.

It is that controls may not be sufficiently configured, tuned, monitored or validated under realistic attack conditions.

### Rate limiting

Review controls across:

- Login
- OTP generation
- OTP validation
- Password reset
- Account recovery
- Public APIs
- High-cost application functions

Rate limiting based solely on IP address is insufficient against distributed infrastructure.

Controls should consider multiple signals where appropriate, including account, device, session and behavioural characteristics.

### WAF

A WAF should be continuously validated rather than treated as a deployment checkbox.

Review:

- Rate-based controls
- Bot-management rules
- Exceptions
- Allow lists
- Origin exposure
- Logging
- Alert thresholds
- Emergency rule changes

One critical question is whether an attacker can bypass the WAF/CDN and reach the application origin directly.

### DDoS resilience

Organisations should test both network and application-layer resilience.

Consider scenarios where attackers:

- Distribute traffic across thousands of sources
- Generate apparently legitimate requests
- Target expensive application functions
- Attack APIs rather than websites
- Rotate infrastructure
- Shift between IPv4 and IPv6

The objective should be maintaining critical customer functions, not merely absorbing traffic.

### Anti-bot controls

CAPTCHA is only one layer.

Distributed automation can originate from residential networks, cloud infrastructure, VPNs and proxies.

Effective protection should combine:

Rate limiting + behavioural detection + bot management + authentication controls + monitoring.

### Monitoring must measure customer impact

SOC teams should have visibility into:

- Authentication spikes
- OTP anomalies
- Account-lockout rates
- Request rates by endpoint
- WAF challenges and blocks
- 4xx/5xx increases
- Application latency
- Backend resource consumption
- Source ASN distribution
- Geographic changes
- IPv4/IPv6 distribution
- Direct-origin traffic
- Newly observed infrastructure

The key operational metric should not simply be:

"How many attacks did we block?"

It should be:

"How much malicious activity reached the application, and what customer impact did it cause?"

## Do not over-trust IOC reputation

The observed infrastructure also illustrates the limitations of traditional IOC-based defence.

An IP may represent:

- A legitimate cloud workload
- A compromised server
- A residential subscriber
- A VPN endpoint
- A proxy exit
- Shared hosting
- Dynamically reassigned infrastructure

Likewise, an ASN with historical abuse reports is not inherently malicious.

Blocking an entire provider may create unnecessary customer impact while providing only temporary protection.

The stronger approach is to combine:

IP intelligence + behaviour + timing + application telemetry + infrastructure relationships.

## What CISOs should validate now

### Immediate

- Validate WAF rate controls against current traffic patterns.
- Confirm DDoS protection at both network and application layers.
- Review login and OTP rate limiting.
- Identify abnormal request volumes by endpoint.
- Confirm direct-origin access is appropriately restricted.
- Review IPv6 security controls.
- Monitor account-lockout and authentication anomalies.

### Near term

- Conduct controlled resilience testing against critical internet-facing services.
- Review WAF/CDN exceptions.
- Map public APIs and high-cost application functions.
- Review third-party dependencies.
- Validate SOC detection for Layer 7 attacks.
- Exercise incident escalation procedures.
- Establish common dashboards covering availability, authentication and application health.

## Potentially related national advisories

The following public advisories from Malaysian security agencies cover similar classes of activity and may be relevant background. They are listed as potentially related only:

- NACSA/NC4 — Alert on Potential Cyber Attack on Malaysian Domains (DDoS, brute force, SQL injection): https://www.nacsa.gov.my/advisory9.php
- NACSA — Potential Cyber Attack on ICT Infrastructures Targeting Malaysia Organisations (intrusion, DDoS, web defacement, malware): https://www.nacsa.gov.my/announce5.php
- MyCERT MA-1254.022025 — Recent Cyber Attacks Targeting Malaysia (data breaches, credential compromise, web defacements): https://www.mycert.org.my/portal/advisory?id=MA-1254.022025
- NACSA/MyCERT June–July 2026 — Joomla JCE (CVE-2026-48907) and SP Page Builder (CVE-2026-48908) pre-authentication RCE under active exploitation: https://www.nacsa.gov.my/alert.php
- MyCERT MA-1406.112025 — FortiWeb path-traversal vulnerability (CVE-2025-64446)

Readers should validate current guidance with their local security agency (such as MyCERT or NACSA) before acting on it. This list is not exhaustive, and none of these advisories is presented here as confirmation of the activity described above.

## Closing check

The available evidence does not establish that all observed activity originates from one threat actor or campaign. It does show internet-facing financial services being tested by distributed, automated infrastructure.

Rate limiting, WAF, DDoS protection, anti-bot controls, authentication, monitoring, logging, and incident response have to work together, under load.

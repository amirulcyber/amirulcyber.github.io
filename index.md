---
layout: article
title: "Mapping ASEAN's crypto scene"
eyebrow: "Prying"
date: 2026-08-25
updated: 2026-09-07
description: "A reusable long-form editorial layout for maps, policy explainers and data-heavy reporting."
---

ASEAN has ten different regulatory regimes, so a regional story works best when the reader can move between countries without losing the narrative.

{% include stat-strip.html stats="69%|Asia-Pacific crypto growth to June 2025;103%|Indonesia growth over the same period;10|Countries mapped" %}

## Southeast Asia's crypto scene

{% include country-tabs.html %}

{% for country in site.data.countries %}
<section class="country-panel" id="{{ country.id }}">
  <div class="country-heading">
    <div>
      <span class="kicker">{{ country.stage }}</span>
      <h3>{{ country.name }}</h3>
    </div>
    <span class="rank">#{{ country.rank }} Crypto Adoption</span>
  </div>

  <div class="status-grid">
    {% for group in country.groups %}
    <div class="status-card status-{{ group.key }}">
      <h4>{{ group.label }}</h4>
      <ul>
        {% for item in group.items %}
        <li>{{ item }}</li>
        {% endfor %}
      </ul>
    </div>
    {% endfor %}
  </div>

  <div class="timeline">
    <h4>History</h4>
    {% for event in country.history %}
    <article class="timeline-item">
      <div class="timeline-date">{{ event.date }}</div>
      <div>
        <strong>{{ event.title }}</strong>
        <span class="badge badge-{{ event.tag }}">{{ event.tag }}</span>
        <p>{{ event.text }}</p>
      </div>
    </article>
    {% endfor %}
  </div>
</section>
{% endfor %}

## What can you actually do?

<div class="table-scroll">
<table class="comparison">
<thead>
<tr><th>Country</th><th>Hold it?</th><th>What it costs</th><th>Where to buy</th><th>Spend it?</th></tr>
</thead>
<tbody>
{% for country in site.data.countries %}
<tr>
<td><strong>{{ country.name }}</strong></td>
<td>{{ country.table.hold }}</td>
<td>{{ country.table.cost }}</td>
<td>{{ country.table.buy }}</td>
<td>{{ country.table.spend }}</td>
</tr>
{% endfor %}
</tbody>
</table>
</div>

## What this means for you

This theme is designed for a strong editorial conclusion: summarize the pattern, explain the practical implication, then point readers toward sources and methodology.

> The visual language stays deliberately light: paper-white surfaces, thin rules, restrained color, generous whitespace and compact data labels.

## Methodology

Use this section for source notes, update dates, definitions and caveats. Jekyll will render normal Markdown, footnotes and tables without additional JavaScript.

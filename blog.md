---
layout: page
title: Blog
permalink: /blog/
description: All writing — vulnerability research, threat intelligence, and incident deep dives.
---

<div class="essay-list">
  {%- for post in site.posts -%}
  <a class="essay-card" href="{{ post.url | relative_url }}">
    <span class="essay-card__inner">
      <span class="essay-card__title">{{ post.title | smartify }}</span>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%d %B %Y' }}</time>
    </span>
  </a>
  {%- endfor -%}
</div>

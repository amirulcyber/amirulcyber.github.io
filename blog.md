---
layout: article
title: Blog
permalink: /blog/
description: All posts — cybersecurity research, threat intelligence, and technology insights.
---

Latest cybersecurity research, threat intelligence, and technology insights.

{% for post in site.posts %}
<article style="margin: 0 0 48px">
  <h2 style="font-family: Newsreader, Georgia, serif; font-size: 34px; line-height: 1.15; margin: 0 0 8px">
    <a href="{{ post.url | relative_url }}" style="text-decoration: none">{{ post.title }}</a>
  </h2>
  <p style="font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: .08em; font-size: 11px; color: var(--muted); margin: 0 0 10px">
    {{ post.date | date: "%-d %B %Y" }}{% if post.categories %} · {{ post.categories | join: ' / ' }}{% endif %}
  </p>
  {% if post.description %}<p style="margin: 0">{{ post.description }}</p>{% endif %}
</article>
{% endfor %}

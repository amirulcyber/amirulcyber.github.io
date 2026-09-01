---
layout: page
title: Tags
permalink: /tags/
---

# Tags

Browse all posts by tag.

{% assign tags = site.tags | sort %}
{% if tags.size == 0 %}
<p><em>No tagged posts yet.</em></p>
{% endif %}
{% for tag in tags %}
<h2 id="{{ tag[0] | slugify }}">{{ tag[0] }}</h2>
<ul>
  {% for post in tag[1] %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> <small>({{ post.date | date: "%d %b %Y" }})</small></li>
  {% endfor %}
</ul>
{% endfor %}

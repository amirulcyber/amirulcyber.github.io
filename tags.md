---
layout: page
title: Tags
permalink: /tags/
description: Browse all posts by tag.
---

{%- assign tags = site.tags | sort -%}
{%- if tags.size == 0 -%}
<p><em>No tagged posts yet.</em></p>
{%- endif -%}

{%- for tag in tags -%}
<h2 id="{{ tag[0] | slugify }}">{{ tag[0] }}</h2>
<ul>
  {%- for post in tag[1] -%}
  <li><a href="{{ post.url | relative_url }}">{{ post.title | smartify }}</a>
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%-d %b %Y' }}</time>
  </li>
  {%- endfor -%}
</ul>
{%- endfor -%}

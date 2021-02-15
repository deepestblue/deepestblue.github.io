---
layout: page
title: Categories
permalink: /tags/
lang: en
---

{% assign sorted_tags = site.tags | sort %}
{% for tag in sorted_tags %}
  {% capture tag_name %}{{ tag | first }}{% endcapture %}

### {{ tag_name }}

  {% for post in site.tags[tag_name] %}

{%- if post.lang == nil %}
#### [{{ post.title | escape }}]({{ post.url | relative_url }})
{% else %}
#### [{{ post.title | escape }}]({{ post.url | relative_url }}){:lang="{{ post.lang }}"}
{% endif %}

  {% endfor %}
{% endfor %}

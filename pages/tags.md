---
layout: page
title: Categories
permalink: /tags/
---

{% assign sorted_tags = site.tags | sort %}
{% for tag in sorted_tags %}
  {% capture tag_name %}{{ tag | first }}{% endcapture %}

### {{ tag_name }}

  {% for post in site.tags[tag_name] %}

#### [{{post.title}}]({{ site.baseurl }}{{ post.url }})

  {% endfor %}
{% endfor %}

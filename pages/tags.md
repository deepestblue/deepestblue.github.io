---
layout: page
title: Tags
permalink: /tags/
---

{% for tag in site.tags %}
  {% capture tag_name %}{{ tag | first }}{% endcapture %}

### {{ tag_name }}

  {% for post in site.tags[tag_name] %}

#### [{{post.title}}]({{ site.baseurl }}{{ post.url }})

  {% endfor %}
{% endfor %}

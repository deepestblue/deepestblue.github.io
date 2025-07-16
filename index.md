---
layout: default
list_title: Posts
lang: eng-Latn
---
Welcome to my blog! Feel free to browse through posts below, go through [articles by category](/tags) or read [a short bio of me](/about).

{% if site.posts.size > 0 %}

## {{ page.list_title }}

  {% for post in site.posts %}
    {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}

* {{ post.date | date: date_format }}
{%- if post.lang == nil %}
### [{{ post.title | escape }}]({{ post.url | relative_url }})
{% else %}
### [{{ post.title | escape }}]({{ post.url | relative_url }}){:lang="{{ post.lang }}"}
{% endif %}

  {% endfor %}

Subscribe [via RSS]({{ "/feed.xml" | relative_url }})
{: .rss-subscribe}
{%- endif -%}

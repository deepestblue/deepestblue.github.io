---
layout: post_with_mathml
title: What are the dimensions of a mod b?
date: '2018-05-20T16:37:00.002-07:00'
author: ambarish
tags:
- maths
modified_time: '2018-05-20T16:37:37.180-07:00'
blogger_id: tag:blogger.com,1999:blog-826032011974850866.post-7115311366352243547
blogger_orig_url: https://blog.ambari.sh/2018/05/what-are-dimensions-of-mod-b.html
---

I was doing [dimensional analysis](https://en.wikipedia.org/wiki/Dimensional_analysis) for a problem, and I noticed something curious about the remainder operator (sometimes referred to as the $mod$ operator).

Let's recap how arithmetic operators interact with dimensional analysis. Say the dimensions of $a$ are $A$, and the dimensions of $b$ are $B$. For instance, $a$ could be an areal measure, and $A$ would be $L^2$, while $b$ might be a momentum, and $B$ would then be $MLT^(-1)$.

Given such quantities $a$ and $b$, it's well known that the dimensions of $a\*b$ is $A\*B$, and that of $a/b$ is $A/B$. Now how about the dimensions of $a+b$ and of $a-b$? That was a trick question: it doesn't make to sense or add or subtract $a$ and $b$ unless they have the same dimensions and are expressed in the same unit. You cannot add a length and a time, and furthermore, you cannot even add two length quantities, if one were expressed in metres and the other in kilometres. Likewise with subtraction.

So what's the story with the remainder operator? What're the dimensions of $a mod b$? Because of the association with $a div b$, my intuition told me it might be $A/B$. Let's test that out.

Imagine I'm walking towards a bus stop, where there's a bus every $10$ minutes (in the direction I want to go). When I'm far away, I see a bus go past, and it then takes me $27$ more minutes to get to the stop. How long should I expect to wait for my next bus? The answer, of course, is $10 - (27 mod 10)$ minutes or $3$ minutes. In general, if the time-period (the reciprocal of frequency) of buses were $b$ (with dimension $T$) and the time it took me to get to the stop were $a$ (with dimensions $T$), the time I should wait for would be $b - a mod b$, with dimensions $T$. The fact that this expression makes sense must mean that both $b$ and $a mod b$ have dimensions of $T$, and are in the same units.

So that answers what the dimensions of $a mod b$ must be: the same as the dimensions of $b$. But how can the dimensions be independent of the dimensions of $a$? Actually, they're not. $a mod b$ is $a - kb$, with $k$ chosen such that the result is between $0$ and $b$ (left-inclusive). So the dimensions of $a mod b$ are the same as those of $a$, which then implies the following.

Like addition and subtraction, the remainder operator is only defined on quantities with the same dimensions, and in fact, expressed in the same unit, with the result also with the same dimensions and in the same unit.

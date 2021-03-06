---
layout: post_with_mathml
title: Optimising catching the bus
date: '2018-05-20T19:47:00.000-07:00'
author: ambarish
lang: en-Latn
tags: [maths]
description: When walking to a bus stop, I want to minimise the amount of time I wait at the bus stop. How fast or slow should I walk?
---

Every so often on my way home, I find myself walking North on Stone Way, attempting to catch a Westbound bus #44 on 45<sup>th</sup> St. at Stone Wy. I can see the buses go past from afar on Stone Way, and when I see a bus go past, I wonder what the implications are for my wait time at the stop. When Iʼm far enough away, I want a bus to go past already, so that the next bus might show up just as I get to the stop. But as I get nearer the stop, I donʼt want a bus to go past, as that would mean a longer wait.

The worst scenario is a bus whizzing past just before I get to the stop, while the best is a bus showing up just as I do. So thereʼs a discontinuity there, and that made me want to model the problem, and help figure out how I should adjust my walking speed to synchronise my arrival and a bus being there.

Let

* $l$ be the distance from the stop when I sight a bus go past,
* $nu$ the frequency of Westbound buses along 45<sup>th</sup> St.,
* $v_0$ my current speed, and
* $v$ my new (for simplicity) constant speed once I see the bus.

So it takes me $l/v$ time to get to the stop, and $l/v mod (1/nu)$ time since the last bus passed by. Thus, itʼs $(-l/v) mod (1/nu)$ time for the next bus. I thus want to minimise (the non-negative quantity) $(-l/v) mod (1/nu)$.

Let: $-l/v mod (1/nu) = epsilon_0$, for some $epsilon_0 ≥ 0$
$⇒ -l/v = -k/nu + epsilon_0$, for some $k in ZZ_(≥0)$
$⇒ v = -l/(-k/nu + epsilon_0) = l/(k/nu - epsilon_0) = (l nu)/k + epsilon_1$, for some $epsilon_1 ≥ 0$

Thus, I should pick speeds just greater than $(l nu)/k$, for some (positive) integral $k$. Letʼs say I donʼt want to go any faster than $v_0$, but I want to get home as soon as possible. Iʼd then pick $k$ such that $(l nu)/k$ is just less than $v_0$, i.e. minimising the positive quantity $v_0 - (l nu)/k$.

Letʼs let: $v_0 - (l nu)/k = v_delta$, with $v_delta > 0$
$⇒ k = (l nu)/(v_0 - v_delta) = ceil((l nu)/v_0)$.

Therefore, the speed I should target, that would

* minimise my wait time at the stop
* minimise the overall time
* not exceed my current walking speed

is $(l nu)/ceil((l nu)/v_0$.

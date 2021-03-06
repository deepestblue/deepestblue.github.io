---
layout: post
title: Keying in Indian languages
date: '2014-01-04T14:24:00.003-08:00'
author: ambarish
lang: en-Latn
tags: [sanskrit, "dravidian languages"]
description: The first of a three-part article on Indian language computing. This part focusses on software to input Indian languages.
---

Right from the time I started out learning Sanskrit, Iʼve had to type in Devanagari to send email, do my assignments, write blog-posts etc. Sometime later, I realised Iʼd like to be able to write in my mother-tongue, Tamil, too: I was rapidly becoming more fluent at writing in Sanskrit than in Tamil, and that bothered me! I used to use Windows and now use OS X, and have used a variety of tools to be able to compose in Indic scripts. I thought Iʼd write about my journey, what tools I loved, used, hated and discarded and what I now use.

In 2008, to begin with, my requirements were — types Devanagari, works on Windows Vista+, works across all applications (no browser plug-in for me) and has configurable key-maps. That last was very important. There were [multiple competing ways](http://www.quotationspage.com/quote/473.html) to render Sanskrit in ASCII (and corresponding ways to type Devanagari on an US-ASCII keyboard): Harvard-Kyoto, IAST, ITRANS, etc. They had nothing in common, except for one thing: they were all quite awful. [Iʼll explain why in a follow-up post.] So I needed to use a keymap I liked, one I created myself.

I started out using my friend Ajit Krishnanʼs wonderful [Mudgala IME](http://www.aupasana.com/software#TOC-mudgala-ime). It was very straight-forward to use, and supported custom keyboards. Switching to and out of it was so easy, and it never crashed once in more than a year of using it. But 2 things made me want moar: first, Mudgala IME didnʼt support Tamil very well. Secondly, Mudgala IME worked by installing a low-level keyboard-hook. Windows has a way to support software keyboards and Input Method editors so that the keyboard/IME would show up in the Language Bar, and other Good Things™ would happen. Mudgala IME instead worked at a much lower level by intercepting every key-stroke, translating to the corresponding Devanagari code-point, and inserting it into the current window. This approach had a couple of drawbacks: as above, it didnʼt integrate well with Windows or with the keyboard shortcuts Windows provides to switch input keyboards. Worse, the keyboard shortcut Mudgala provided to switch to and out of it was a global shortcut and interfered with others softwareʼs use of that shortcut. If you didnʼt understand the above, suffice it to say that its integration with Windows is non-standard :-)

In 2009, Google came out with its Indic language input tools; this has now became [Google Input Tools for Windows](https://www.google.com/inputtools/windows/). You had to install a separate piece of software for each language you need to type in. It did support custom keyboards, but you had to switch to your custom keyboard explicitly, and worse, you had to do that every-time you switch languages. Worst of all, if you had multiple custom keyboards per language (say, a keyboard to output Devanagari and one to output ISO-15919), you had to use the GUI to switch keyboards each time. Kind of bad UX, but it worked OK otherwise. There were also occasional bugs involving typing too soon after switching to the Google IME: the thing needed a few seconds to initialise, and it would swallow key-strokes till then!

In 2013, Google released an update in 2013 that unified the various language-specific IMEs: you now had to install one software, and pick various languages at installation-time. Unhappily, [the documentation on setting up custom keyboards](http://www.google.com/inputtools/windows/canonical.html) was never updated: the page refers to a Scheme directory of `%Program Files%/Google/Google [Language] Input/`, but the actual directory is: `%ProgramData%/Google/Google Input Tools/com.google.input_tools.t13n.ime.{language-name}/schemes/`

The other bugs remain, but this is, in my experience, the most solid and clean Indic typing solution on Windows today. I use it to type Sanskrit (in Devanagari, Grantha, IPA, ISO-15919) and Tamil (in Vattu, IPA, ISO-15919) and itʼs never let me down.

Lately, though, Iʼve switched from my trusty Thinkpad to my wifeʼs old MacBook Air, and as soon as I switched, I realised there was a paucity of good IMEs on OS X. Happily, my friend Ranganath Atreya has come up with [Lipika](https://github.com/ratreya/Lipika_IME), an IME that also supports the same custom-keyboard format Google IME does (yay for compatibility!). I was one of the beta-testers, and I love it.

At work, I use Windows and donʼt want to install software; when I occasionally want to send email, I use [Google Input Tools](http://www.google.com/inputtools/try/) online. Itʼs pretty Google-y: barebones but efficient.

On my Windows Phone, Microsoft still does not allow 3rd party keyboards :-( I make do with Binuʼs [Type Tamil](http://www.windowsphone.com/en-us/store/app/type-tamil/69e961a3-b60c-4335-b9c0-a378065eaa8e) and [Type Sanskrit](http://www.windowsphone.com/en-us/store/app/type-sanskrit/732936ff-60f8-4678-acab-f5c420e0dad0), which let you input text, which you then have to copy and paste into wherever you want. This is a bad situation, so Iʼm still looking to you, Microsoft!

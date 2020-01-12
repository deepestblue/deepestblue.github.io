---
layout: post
title: A custom keymap for Indian languages
date: '2014-03-27T23:46:00.000-07:00'
author: ambarish
tags:
- sanskrit
- dravidian languages
modified_time: '2017-07-30T16:52:38.831-07:00'
blogger_id: tag:blogger.com,1999:blog-826032011974850866.post-9137063985524364798
blogger_orig_url: https://blog.ambari.sh/2014/03/a-custom-keymap-for-indian-languages.html
description: The final part of a three-part series on Indic computing. The focus of this part is a custom keymap for inputting Sanskrit and Tamil.
---

As we saw in [the last couple]({% post_url 2014-01-04-keying-in-indian-languages %}) [of posts]({% post_url 2014-03-02-representing-indian-languages-using-the-latin-script %}), keying in Indian languages using a QWERTY keyboard requires a keyboard/IME software as well as a standardised way to map the Latin alphabet to the characters in the Indian language du jour. To recap, I use Googleʼs [Input Tools](https://www.google.com/inputtools/windows/) on Windows and [Lipika](https://github.com/ratreya/Lipika_IME) on OS X. Unlike a representation format (which can use diacritic or other accent marks), a key‐map can only employ the characters inputtable through the QWERTY keyboard. So while I use ISO‐15919 as the representation format, I needed a key‐map as well. As in the previous post, here were my requirements:

* Meaningfulness
* Trans‐linguistic consistency
* Fidelity to pronunciation
* Modularity and symmetry
* Alphabet restrictions: the scheme must use only Latin characters to represent phonemes; the scheme may use punctuation marks to represent non‐phonemic punctuation‐like characters in the target language.

With these requirements, I set about to create a key‐map I could use. Iʼd start with my requirements, and in the end, if the key‐map ended up resembling an existing “standard”, Iʼd just stick with that instead.

I started out by identifying characters in Tamil and Sanskrit (the 2 Indian languages I write in) based on phonetics and history; this identification process is important for pan‐linguistic consistency.

Vowels and Dependents
{:centre}

|Sanskrit (Devanagari)|ISO‐15919|Tamil|Key‐map|
|--- |---|---|---|
|अ|a|அ||
|आ|ā|ஆ||
|इ|i|இ||
|ई|ī|ஈ||
|उ|u|உ||
|ऊ|ū|ஊ||
|ऋ|r̥|||
|ॠ|r̥̄|||
|ऌ|l̥|||
|ॡ|l̥̄|||
||e|எ||
|ए|ē|ஏ||
|ऐ|ai|ஐ||
||o|ஒ||
|ओ|ō|ஓ||
|औ|au|ஔ||
|ं|ṁ|||
|ँ|m̐|||
|ः|ḥ|||
|ᳶ|ḫ|||
|ᳵ|ẖ|||
||ḵ|ஃ||
|ऽ|'|||

Consonants
{:centre}

|Sanskrit (Devanagari)|ISO‐15919 [^1]|Tamil|Key‐map|
|--- |--- |--- |--- |
|क्|k|க்||
|ख्|kh|||
|ग्|g|||
|घ्|gh|||
|ङ्|ṅ|ங்||
|च्|c|ச்||
|छ्|ch|||
|ज्|j|||
|झ्|jh|||
|ञ्|ñ|ஞ்||
|ट्|ṭ|ட்||
|ठ्|ṭh|||
|ड्|ḍ|||
|ढ्|ḍh|||
|ण्|ṇ|ண்||
||t ̱|ற்||
||ṉ|ன்||
|त्|t|த்||
|थ्|th|||
|द्|d|||
|ध्|dh|||
|न्|n|ந்||
|प्|p|ப்||
|फ्|ph|||
|ब्|b|||
|भ्|bh|||
|म्|m|ம்||
|य्|y|ய்||
|र्|r|ர்||
||r ̣|ழ்||
|ळ्|ḷ|ள்||
||ḻ|ல்||
|ल्|l|||
|व्|v|வ்||
|श्|ś|||
|ष्|ṣ|||
|स्|s|||
|ह्|h|||

[^1]: Unfortunately, ISO‐15919 does not distinguish between alveolar and dental liquids; Tamil has only the former, while Sanskrit only the latter. As such, Iʼve had to make a few minor modifications to ISO‐15919, where `ற` and `ல` are concerned. Thanks to Greg for pointing this out through a blog comment.

The next step was filling in the key‐combinations that were “natural” and “obvious”.

1. Given the existence of short and long vowels, using lower‐ and upper‐case letters for vowels seems natural.
1. Any unmarked consonant in ISO‐15919 can be mapped to the bare letter.
1. Representing retroflexion for stop consonants by upper‐casing the corresponding dental stop is standard practice. By modularity, we can do the same for liquids and sibilants too.

|Sanskrit (Devanagari)|ISO‐15919|Tamil|Key‐map|
|--- |--- |--- |--- |
|अ|a|அ|a|
|आ|ā|ஆ|A|
|इ|i|இ|i|
|ई|ī|ஈ|I|
|उ|u|உ|u|
|ऊ|ū|ஊ|U|
|ऋ|r̥|||
|ॠ|r̥̄|||
|ऌ|l̥|||
|ॡ|l̥̄|||
||e|எ|e|
|ए|ē|ஏ|E|
|ऐ|ai|ஐ|ai|
||o|ஒ|o|
|ओ|ō|ஓ|O|
|औ|au|ஔ|au|
|ं|ṁ|||
|ँ|m̐|||
|ः|ḥ|||
|ᳶ|ḫ|||
|ᳵ|ẖ|||
||ḵ|ஃ||
|ऽ|'|||
|क्|k|க்|k|
|ख्|kh||kh|
|ग्|g||g|
|घ्|gh||gh|
|ङ्|ṅ|ங்||
|च्|c|ச்|c|
|छ्|ch||ch|
|ज्|j||j|
|झ्|jh||jh|
|ञ्|ñ|ஞ்||
|ट्|ṭ|ட்|T|
|ठ्|ṭh||Th|
|ड्|ḍ||D|
|ढ्|ḍh||Dh|
|ण्|ṇ|ண்|N|
||t ̱|ற்||
||ṉ|ன்||
|त्|t|த்|t|
|थ्|th||th|
|द्|d||d|
|ध्|dh||dh|
|न्|n|ந்|n|
|प्|p|ப்|p|
|फ्|ph||ph|
|ब्|b||b|
|भ्|bh||bh|
|म्|m|ம்|m|
|य्|y|ய்|y|
|र्|r|ர்|r|
||r ̣|ழ்||
|ळ्|ḷ|ள்|L|
||ḻ|ல்||
|ल्|l||l|
|व्|v|வ்|v|
|श्|ś|||
|ष्|ṣ||S|
|स्|s||s|
|ह्|h||h|

Six categories of phonemes remain: Dravidian alveolar consonants, the Dravidian approximant, Sanskrit nasals, Sanskrit sibilants, Sanskrit syllabic vowels, and miscellaneous rarely‐used dependents.

* Dravidian alveolar consonants: from the point of view of tongue‐position, alveolar stops are intermediate between dental stops and retroflex stops. From this, a natural choice of key‐combination for an alveolar stop is a juxtaposition of the keys for the corresponding dental and retroflex stops. Likewise for the alveolar liquid `ல்`.
* Dravidian approximant: based on usage, I picked `z` as the key for the approximant `ழ்`. The fact that non‐native speakers mispronounce the approximant as a voiced sibilant adds credibility to this choice :-)
* Sanskrit nasals and sibilants: there are 2 remaining nasals: `ङ्`, `ञ्` and one remaining sibilant: `श्`. The palatal nasal is both a palatal stop and a nasal; a natural representation combines the nasality of `n` with the palatalness of `j` or `c`; we thus get `nj` and `nc` as possible key‐combinations. By correspondence, the palatal sibilant `श्` is `sc` or `sj`, and the velar nasal `ङ्` `nk` or `ng`.

Looks like the consonants are done! Here they are:

Consonants
{:centre}

|Sanskrit (Devanagari)|ISO‐15919|Tamil|Key‐map|
|--- |--- |--- |--- |
|क्|k|க்|k|
|ख्|kh||kh|
|ग्|g||g|
|घ्|gh||gh|
|ङ्|ṅ|ங்|nk/ng|
|च्|c|ச்|c|
|छ्|ch||ch|
|ज्|j||j|
|झ्|jh||jh|
|ञ्|ñ|ஞ்|nc/nj|
|ट्|ṭ|ட்|T|
|ठ्|ṭh||Th|
|ड्|ḍ||D|
|ढ्|ḍh||Dh|
|ण्|ṇ|ண்|N|
||t ̱|ற்|tT/Tt|
||ṉ|ன்|nN/Nn|
|त्|t|த்|t|
|थ्|th||th|
|द्|d||d|
|ध्|dh||dh|
|न्|n|ந்|n|
|प्|p|ப்|p|
|फ्|ph||ph|
|ब्|b||b|
|भ्|bh||bh|
|म्|m|ம்|m|
|य्|y|ய்|y|
|र्|r|ர்|r|
||r ̣|ழ்|z|
|ळ्|ḷ|ள்|L|
||ḻ|ல்|lL/Ll|
|ल्|l||l|
|व्|v|வ்|v|
|श्|ś||sc/sj|
|ष्|ṣ||S|
|स्|s||s|
|ह्|h||h|

* Sanskrit syllabic vowels: The Sanskrit syllabic vowels (`ऋ`, `ॠ`, `ऌ`, `ॡ` – the last one not actually used) present a problem. The mid‐central vowel inherent in these is absent in European languages and thus lacks a symbol; it can however be described as mid‐way between `y` and `w`. `y` is already used up in our scheme, but `w` is free! Using `w` also ensures people donʼt mispronounce it as a front‐vowel. We thus get `rw`, `Rw`, `lw` and `Lw` respectively.
* Misc. dependent letters: There are a few different dependent letters that can only exist if attached to a vowel — the *anusvāra*, the *anunāsika*, the *visarga* and its two other forms the *jihvāmulīya* and the *upadhmānīya*, and the *āythayeṛuttu*. The anusvāra is traditionally represented by an `M`, and the anunāsika by `MM`; we can stick with those. The visarga, likewise is an `H`. The *upadhmānīya* is closest to the Latin `f`, and we can use that. The *jihvāmūlīya* and the *āythayeṛuttu* are both velar/glottal and as such `K` is the most suitable.

We finally have a complete key‐map for vowels and dependents! Here it is:

Vowels and Dependents
{:centre}

|Sanskrit (Devanagari)|ISO‐15919|Tamil|Key‐map|
|--- |--- |--- |--- |
|अ|a|அ|a|
|आ|ā|ஆ|A|
|इ|i|இ|i|
|ई|ī|ஈ|I|
|उ|u|உ|u|
|ऊ|ū|ஊ|U|
|ऋ|r̥||rw|
|ॠ|r̥̄||Rw|
|ऌ|l̥||lw|
|ॡ|l̥̄||Lw|
||e|எ|e|
|ए|ē|ஏ|E|
|ऐ|ai|ஐ|ai|
||o|ஒ|o|
|ओ|ō|ஓ|O|
|औ|au|ஔ|au|
|ं|ṁ||M|
|ँ|m̐||MM|
|ः|ḥ||H|
|ᳶ|ḫ||f|
|ᳵ|ẖ||K|
||ḵ|ஃ|K|
|ऽ|'||'|

You can download the Tamil and Sanskrit keymap for use in Googleʼs IME from [https://github.com/deepestblue/GoogleIME_keymap](https://github.com/deepestblue/GoogleIME_keymap).

#### Footnotes

{:centre: style="text-align: center"}

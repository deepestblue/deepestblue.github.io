---
layout: post
title: A custom keymap for Indian languages
date: "2014-03-27T23:46:00.000-07:00"
author: ambarish
lang: en-Latn
locale: en_IN
tags: [sanskrit, "dravidian languages"]
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
|---------------------|---------|-----|-------|
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
|ऐ|ai|||
||o|ஒ||
|ओ|ō|ஓ||
|औ|au|||
|ं|ṁ|||
|ँ|m̐|||
|ः|ḥ|||
|ᳶ|ḫ|||
|ᳵ|ẖ|||
||ḵ|ஃ||
|ऽ|&#39;|||

Consonants
{:centre}

|Sanskrit (Devanagari)|ISO‐15919 [^1]|Tamil|Key‐map|
|---|---|---|---|
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

[^1]: Unfortunately, ISO‐15919 does not distinguish between alveolar and dental liquids; Tamil has only the former, while Sanskrit only the latter. As such, Iʼve had to make a few minor modifications to ISO‐15919, where <span lang="ta-Taml" data-no-transliterate>ற</span> and <span lang="ta-Taml" data-no-transliterate>ல</span> are concerned. Thanks to Greg for pointing this out through a blog comment.

The next step was filling in the key‐combinations that were “natural” and “obvious”.

1. Given the existence of short and long vowels, using lower‐ and upper‐case letters for vowels seems natural.
1. Any unmarked consonant in ISO‐15919 can be mapped to the bare letter.
1. Representing retroflexion for stop consonants by upper‐casing the corresponding dental stop is standard practice. By modularity, we can do the same for liquids and sibilants too.

|Sanskrit (Devanagari)|ISO‐15919|Tamil|Key‐map|
|---|---|---|---|
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
|ऐ|ai||ai|
||o|ஒ|o|
|ओ|ō|ஓ|O|
|औ|au||au|
|ं|ṁ|||
|ँ|m̐|||
|ः|ḥ|||
|ᳶ|ḫ|||
|ᳵ|ẖ|||
||ḵ|ஃ||
|ऽ|&#39;|||
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

* Dravidian alveolar consonants: from the point of view of tongue‐position, alveolar stops are intermediate between dental stops and retroflex stops. From this, a natural choice of key‐combination for an alveolar stop is a juxtaposition of the keys for the corresponding dental and retroflex stops. Likewise for the alveolar liquid <span lang="ta-Taml" data-no-transliterate>ல்</span>.
* Dravidian approximant: based on usage, I picked <kbd>z</kbd> as the key for the approximant <span lang="ta-Taml" data-no-transliterate>ழ்</span>. The fact that non‐native speakers mispronounce the approximant as a voiced sibilant adds credibility to this choice :-)
* Sanskrit nasals and sibilants: there are 2 remaining nasals: <span lang="cls-Deva" data-no-transliterate>ङ्</span>, <span lang="cls-Deva" data-no-transliterate>ञ्</span> and one remaining sibilant: <span lang="cls-Deva" data-no-transliterate>श्</span>. The palatal nasal is both a palatal stop and a nasal; a natural representation combines the nasality of <kbd>n</kbd> with the palatalness of <kbd>j</kbd> or <kbd>c</kbd>; we thus get <kbd>nj</kbd> and <kbd>nc</kbd> as possible key‐combinations. By correspondence, the palatal sibilant <span lang="cls-Deva" data-no-transliterate>श्</span> is <kbd>sc</kbd> or <kbd>sj</kbd>, and the velar nasal <span lang="cls-Deva" data-no-transliterate>ङ्</span> <kbd>nk</kbd> or <kbd>ng</kbd>.

Looks like the consonants are done! Here they are:

Consonants
{:centre}

|Sanskrit (Devanagari)|ISO‐15919|Tamil|Key‐map|
|---|---|---|---|
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

* Sanskrit syllabic vowels: The Sanskrit syllabic vowels (<span lang="cls-Deva" data-no-transliterate>ऋ</span>, <span lang="cls-Deva" data-no-transliterate>ॠ</span>, <span lang="cls-Deva" data-no-transliterate>ऌ</span>, <span lang="cls-Deva" data-no-transliterate>ॡ</span> – the last one not actually used) present a problem. The mid‐central vowel inherent in these is absent in European languages and thus lacks a symbol; it can however be described as mid‐way between *y* and *w*. <kbd>y</kbd> is already used up in our scheme, but <kbd>w</kbd> is free! Using <kbd>w</kbd> also ensures people donʼt mispronounce it as a front‐vowel. We thus get <kbd>rw</kbd>, <kbd>Rw</kbd>, <kbd>lw</kbd> and <kbd>Lw</kbd> respectively.
* Misc. dependent letters: There are a few different dependent letters that can only exist if attached to a vowel — the *anusvāra*, the *anunāsika*, the *visarga* and its two other forms the *jihvāmulīya* and the *upadhmānīya*, and the *āythayeṛuttu*. The anusvāra is traditionally represented by an <kbd>M</kbd>, and the anunāsika by <kbd>MM</kbd>; we can stick with those. The visarga, likewise is an <kbd>H</kbd>. The *upadhmānīya* is closest to the Latin <kbd>f</kbd>, and we can use that. The *jihvāmūlīya* and the *āythayeṛuttu* are both velar/glottal and as such <kbd>K</kbd> is the most suitable.

We finally have a complete key‐map for vowels and dependents! Here it is:

Vowels and Dependents
{:centre}

|Sanskrit (Devanagari)|ISO‐15919|Tamil|Key‐map|
|---|---|---|---|
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
|ऐ|ai||ai|
||o|ஒ|o|
|ओ|ō|ஓ|O|
|औ|au||au|
|ं|ṁ||M|
|ँ|m̐||MM|
|ः|ḥ||H|
|ᳶ|ḫ||f|
|ᳵ|ẖ||K|
||ḵ|ஃ|K|
|ऽ|&#39;||&#39;|

You can download the Tamil and Sanskrit keymap for use in Googleʼs IME from [https://github.com/deepestblue/GoogleIME_keymap](https://github.com/deepestblue/GoogleIME_keymap).

## Footnotes

{:centre: style="text-align: center"}

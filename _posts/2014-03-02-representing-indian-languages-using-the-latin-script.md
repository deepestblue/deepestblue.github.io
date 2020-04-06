---
layout: post
title: Representing Indian languages using the Latin script
date: '2014-03-02T03:51:00.002-08:00'
author: ambarish
tags: [sanskrit, "dravidian languages"]
description: This second part of a three‐part series on Indic computing focusses on the best Latin‐script representation of Indian language characters.
---

Indian languages are written in a diverse set of scripts, most of them derived from the Brahmi script and not from the Phoenician script. These scripts neither look like Latin, nor do they have the familiar A, B, C, … ordering. Further, many Indian languages have many phonemes not present in languages Latin was traditionally used for. As a consequence, many of these scripts have many more than 26 base glyphs (not to mention ligature forms). Mapping these to Latin characters becomes important for 2 distinct uses:

* storing/presenting Indian language content, and
* inputting Indian language content.

While Unicode encodes most popular scripts used for Indian languages and even some rare ones, Latin‐letters continue to be used in representing Indian languages everywhere. Theyʼre used in email, in SMS messages, in web‐pages, in file‐names; pretty much ubiquitously. But how to map the diverse phoneme set (between 30–50 for most Indian languages) into the 26 letters in the Latin alphabet?

[Likewise, physical keyboards with a QWERTY layout dominate the world; how to allow combinations of characters on the QWERTY keyboard to represent the diverse character sets in Indian languages? Iʼll address this in another post.]

[As usual, there are many options](http://www.quotationspage.com/quote/473.html).

ISO‐15919, an international scholastic standard, and a few other schemes – IAST, Hunterian, National Library of Kolkata, ALA‐LC – use diacritic (accent) marks over/under Latin characters. Harvard‐Kyoto, Velthuis, ITRANS, SLP1, WX, VedaType and ISO‐15919ʼs limited character set option are schemes that restrict themselves to 7‐bit ASCII but use punctuation characters.

For example, hereʼre the same Sanskrit characters in a few sample schemes:

| Devanagari  | ISO‐15919 | Hunterian | ISO‐15919‐lcs | Harvard‐Kyoto | ITRANS  |
|-------------|-----------|-----------|---------------|---------------|---------|
| आ           | ā         | ā         | aa            | A             | aa/A    |
| ऋ           | r̥         | ri        | ,r            | R             | RRi/R^i |
| ए           | ē         | e         | ee            | e             | e       |
| ं (anusvāra)  | ṁ         | m         | ;m            | M             | M       |
| ख्           | kh        | kh        | kh            | kh            | kh      |
| ञ्           | ñ         | n         | ~n            | J             | ~n/JN   |
| ड्           | ḍ         | d         | .d            | D             | D       |
| श्           | ś         | sh        | ;s            | z             | sh      |

What a mess!

Iʼm going to address what I think should be the hallmarks of a good scheme for representing Indian language text using Latin characters – how one can figure out if such a scheme was thoughtfully, carefully designed and [not thrown together on an unrelated Usenet group](https://groups.google.com/forum/#!topic/rec.music.indian.misc/9nHIH9AQ8ns). (Indian languages being phonetic, Iʼm sometimes careless about the phoneme vs. written character distinction. I carelessly use the word “character” for both; the meaning should be clear from context).

Hereʼs my prioritised list of features a good Indian language representation scheme should have:

1. Unambiguity: the scheme must preserve the integrity of the script. Put another way, the mapping should be reversible from Latin back to the original script without loss. Shockingly, [the Hunterian scheme](https://en.wikipedia.org/wiki/Hunterian_transliteration) fails this basic test.
1. Meaningfulness: the scheme must use Latin letters phonetically close to the original Indian language sound. This automatically rules out absurdities like using `f` for the Sanskrit velar nasal (ङ्), as in the [wx notation](https://en.wikipedia.org/wiki/Wx-encoding).
1. Trans‐linguistic consistency, part 1: identical phonemes across Indian languages must have identical representations. Especially as Indian languages have heavily borrowed from Sanskrit, itʼs inconsistent if the “same” word has multiple Latin representations. Sadly, many schemes fail to satisfy this requirement: in [ITRANS](http://www.aczoom.com/itrans/), the Sanskrit word केवल is represented as `kevala`, but its Tamil borrowing is represented as `kēvala`.
1. Trans‐linguistic consistency, part 2: conversely, a single Latin representation must identify the same phoneme across Indian languages. Again, some schemes fail this requirement too — in some schemes, ḷ would mean a syllabic dental liquid in Sanskrit but could mean a retroflex liquid consonant in Tamil.
1. Fidelity to pronunciation: the scheme should aid pronunciation, or at least not encourage distortion. [Harvard‐Kyoto](https://en.wikipedia.org/wiki/Harvard-Kyoto)ʼs `RRi` for a syllabic alveolar trill; ITRANSʼs `x` for a conjunct consonant and `GY` or `dny` for another conjunct consonant are all misspellings (for phonetic languages, misspelling and mispronunciations go together!)
1. Modularity and symmetry: in Indian languages, the phonemes (and thus the characters) have relationships among them: clearly, the palatal nasal stop has a relationship with the other nasals, as well as a different relationship to the other palatal stops, and yet another relationship with palatal/semi‐palatal vowels. Any scheme may have various mechanisms to represent such features: perhaps an underdot may represent retroflexion, or perhaps doubling a Latin letter may indicate vowel‐length. These mechanisms should be modular and symmetric, i.e. they should work independent of one another, and they should always mean the same thing. If doubling the vowel ‘a’ indicates a long ‘a’ sound, doubling the vowel ‘i’ should indicate a long ‘i’ sound. If adding an underdot to ‘t’ makes it retroflex, adding an underdot to ‘s’ should make that retroflex too.
1. Alphabet restrictions: the scheme must not use punctuation‐marks or mixed‐casing. Using punctuation‐marks in the middle of words looks ugly. ;L'ik:e t"h..i;s. As does miXEd‐CaSiNg. Using punctuation marks also collides with well‐understood orthographic usages: it seems like a shame to not be able to use commas in transliterated Tamil text, just because the scheme gives the comma a special meaning. And starting every sentence with a lower‐case letter is too edgy for my taste.

Only one of the standard schemes fulfils 6 of the 7 requirements completely and the 7<sup>th</sup> partially (it uses punctuation, but only to represent some combinations that cannot normally occur in the language) – [ISO‐15919](http://www.iso.org/iso/iso_catalogue/catalogue_tc/catalogue_detail.htm?csnumber=28333). In addition to being well thought‐out and sane, it is an international standard and is widely used in scholastic publications. Its one drawback is that the official standard is not available free of cost; instead, ISO charges more then $100 for an electronic copy. However, itʼs fully documented at [Dr. Anthony Stoneʼs website](http://homepage.ntlworld.com/stone‐catend/translit.htm) and is usable today. I use it everyday, and so should you!

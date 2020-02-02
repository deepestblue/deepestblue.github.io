export { brahmiyaToLatn, latnToBrahmiya };

import { scriptDataMap } from "./script_data.mjs";

const implicitVowel = 'a';
const plosiveConsonants = ['k', 'g', 'c', 'j', 'ṭ', 'ḍ', 'ṯ', 'ḏ', 't', 'd', 'p', 'b',];
const suppressedVowel = '';
const aspirateConsonant = 'h';
const separator = ':';

const diphthongAntecedent = 'a';
const diphthongConsequents = ['i', 'u'];

const disjunctor = '|';

const regex = s => new RegExp(s, 'g');

function dravidianToLatinNumbers(sourceNumber, data) {
    const digits = Array.from(data.numbers.keys()).filter(
        x => isNaN(parseInt(x, 10)) && data.numbers.get(x) < 10).join(disjunctor);
    const multipliers = Array.from(data.numbers.keys()).filter(
        x => isNaN(parseInt(x, 10)) && data.numbers.get(x) >= 10).join(disjunctor);
    let constituents = sourceNumber.split(regex(`(${digits})+|((${multipliers})+)`));
    constituents = constituents.filter(function(ignored, index) {
        return (index % 4 == 1) || (index % 4 == 2)
    });
    constituents = constituents.filter(function(ignored, index) {
        return (index % 4 == 0) || (index % 4 == 3)
    });
    let xlittedNumber = 0;
    let power = 1;
    let digit = 0;
    constituents.forEach(c => {
        if (c.match(digits)) {
            digit = data.numbers.get(c);
        } else {
            for (const m of c) {
                power *= data.numbers.get(m);
            }
            xlittedNumber += digit * power;
            power = 1;
            digit = 0;
        }
    });
    xlittedNumber += digit * 1;
    return xlittedNumber;
}

function brahmiyaToLatn(otherScript, sourceText, xlitNumbers) {
    const data = scriptDataMap.get(otherScript);

    if (xlitNumbers) {
        const numbers = Array.from(data.numbers.keys()).filter(x => isNaN(parseInt(x, 10))).join(disjunctor);
        if (otherScript != "taml" && otherScript != "mlym") {
            return sourceText.replace(regex(numbers), function(match) {
                return data.numbers.get(match);
            });
        }

        return sourceText.replace(regex(`(${numbers})+`), function(match) {
            return dravidianToLatinNumbers(match, data);
        });
    }

    const vowelMarks = Array.from(data.vowelMarks.values());
    const consonants = Array.from(data.consonants.values());

    let isConsonant = false;
    let isVowelA = false;
    let isPlosive = false;
    let isHalfPlosive = false;

    let transliteratedText = "";
    [...sourceText].forEach(c => {
        let isImplicitA = isConsonant &&
            ! vowelMarks.includes(c);
        if (isImplicitA) {
            transliteratedText += implicitVowel;
        }
        if (c in data.charMap) {
            if (isHalfPlosive && data.charMap[c] == aspirateConsonant) {
                transliteratedText += separator;
            }

            if (isVowelA || isImplicitA) {
                if (diphthongConsequents.indexOf(data.charMap[c]) >= 0) {
                    transliteratedText += separator;
                }
            }
        }

        isHalfPlosive = isPlosive && data.charMap[c] == suppressedVowel;
        isPlosive = plosiveConsonants.includes(data.charMap[c]);
        isVowelA = data.charMap[c] == implicitVowel;
        isConsonant = consonants.includes(c);

        transliteratedText += (c in data.charMap) ? data.charMap[c] : c;
    });

    if (isConsonant) {
        transliteratedText += implicitVowel;
    }

    return transliteratedText;
}

function latnToDravidianNumbers(sourceNumber, data) {
    if (sourceNumber < 0) {
        throw new Error("No support for negative numbers.");
    }

    if (sourceNumber == 0) {
        return data.numbers.get(sourceNumber);
    }

    let power = 1;
    let xlittedText = "";
    while (sourceNumber > 0) {
        const rem = sourceNumber % 10;
        sourceNumber = (sourceNumber - rem) / 10;
        const tamilDigit = data.numbers.get(rem);
        if (tamilDigit) {
            if (power > 1) {
                let maxMultiplier = 1000;
                let power2 = power;
                while (power2 > maxMultiplier) {
                    power2 /= maxMultiplier;
                    xlittedText = data.numbers.get(maxMultiplier) + xlittedText;
                }
                xlittedText = data.numbers.get(power2) + xlittedText;
                if (rem > 1) {
                    xlittedText = tamilDigit + xlittedText;
                }
            } else {
                xlittedText = tamilDigit + xlittedText;
            }
        }
        power *= 10;
    }
    return xlittedText;
}

function latnToBrahmiya(otherScript, sourceText, xlitNumbers) {
    const diphthongsAndConstituents = ['a', 'i', 'u', 'ai', 'au',];
    const data = scriptDataMap.get(otherScript);

    if (xlitNumbers) {
        const numbers = Array.from(Array(10).keys()).join(disjunctor);

        if (otherScript != "taml" && otherScript != "mlym") {
            return sourceText.replace(regex(numbers), function(match) {
                return data.numbers.get(parseInt(match, 10));
            });
        }

        return sourceText.replace(regex(`(${numbers})+`), function(match) {
            return latnToDravidianNumbers(parseInt(match, 10), data);
        });
}

    const misc = Array.from(data.misc.keys()).join(disjunctor);
    const modifiers = Array.from(data.modifiers.keys()).join(disjunctor);
    const plosives = plosiveConsonants.join(disjunctor);
    const consonants = Array.from(data.consonants.keys()).sort().reverse().join(disjunctor);
    const vowels1 = Array.from(data.vowels.keys()).filter(x => ! diphthongsAndConstituents.includes(x)).sort().reverse().join(disjunctor);
    const vowels2 = diphthongsAndConstituents.sort().reverse().join(disjunctor);

    if (misc.length) {
        sourceText = sourceText.replace(regex(misc), function(match) {
            return data.misc.get(match);
        });
    }

    sourceText = sourceText.replace(regex(modifiers), function(match) {
        return data.modifiers.get(match);
    });

    sourceText = sourceText.replace(regex(`(${plosives})${separator}`), function(match, p1) {
        return data.consonants.get(p1) + data.vowelMarks.get(suppressedVowel);
    });
    sourceText = sourceText.replace(regex(`${diphthongAntecedent}${separator}(${diphthongConsequents.join(disjunctor)})`), function(match, p1) {
        return implicitVowel + data.vowels.get(p1);
    });

    sourceText = sourceText.replace(regex(`(${consonants})(${vowels1})`), function(match, p1, p2) {
        return data.consonants.get(p1) + data.vowelMarks.get(p2);
    });
    sourceText = sourceText.replace(regex(vowels1), function(match) {
        return data.vowels.get(match);
    });

    sourceText = sourceText.replace(regex(`(${consonants})(${vowels2})`), function(match, p1, p2) {
        return data.consonants.get(p1) + data.vowelMarks.get(p2);
    });
    sourceText = sourceText.replace(regex(vowels2), function(match) {
        return data.vowels.get(match);
    });

    sourceText = sourceText.replace(regex(consonants), function(match) {
        return data.consonants.get(match) + data.vowelMarks.get(suppressedVowel);
    });

    return sourceText;
}

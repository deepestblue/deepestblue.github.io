export { brahmiyaToLatn, latnToBrahmiya };

import { scriptDataMap } from "./script_data.mjs";

let implicitVowel = 'a';
let plosiveConsonants = ['k', 'g', 'c', 'j', 'ṭ', 'ḍ', 'ṯ', 'ḏ', 't', 'd', 'p', 'b',];
let suppressedVowel = '';
let aspirateConsonant = 'h';
let separator = ':';

function dravidianToLatinNumbers(sourceNumber, data) {
    let digits = Array.from(data.numbers.keys()).filter(
        x => isNaN(parseInt(x, 10)) && data.numbers.get(x) < 10).join('|');
    let multipliers = Array.from(data.numbers.keys()).filter(
        x => isNaN(parseInt(x, 10)) && data.numbers.get(x) >= 10).join('|');
    let constituents = sourceNumber.split(new RegExp(`(${digits})+|((${multipliers})+)`, 'g'));
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
            for (let m of c) {
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
    let data = scriptDataMap.get(otherScript);

    if (xlitNumbers) {
        let numbers = Array.from(data.numbers.keys()).filter(x => isNaN(parseInt(x, 10))).join('|');
        if (otherScript != "taml" && otherScript != "mlym") {
            return sourceText.replace(new RegExp(numbers, 'g'), function(match) {
                return data.numbers.get(match);
            });
        }

        let wholeNumberAtATime = new RegExp(`(${numbers})+`, 'g');
        return sourceText.replace(wholeNumberAtATime, function(match) {
            return dravidianToLatinNumbers(match, data);
        });
    }

    let vowelMarks = Array.from(data.vowelMarks.values());
    let consonants = Array.from(data.consonants.values());

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
                if (['i','u'].indexOf(data.charMap[c]) >= 0) {
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
        let rem = sourceNumber % 10;
        sourceNumber = (sourceNumber - rem) / 10;
        let tamilDigit = data.numbers.get(rem);
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
    let diphthongConstituents = 'a:(i|u)';
    let diphthongsAndConstituents = ['a', 'i', 'u', 'ai', 'au',];
    let data = scriptDataMap.get(otherScript);

    if (xlitNumbers) {
        let numbers = Array.from(Array(10).keys()).join('|');

        if (otherScript != "taml" && otherScript != "mlym") {
            return sourceText.replace(new RegExp(numbers, 'g'), function(match) {
                return data.numbers.get(parseInt(match, 10));
            });
        }

        let wholeNumberAtATime = new RegExp(`(${numbers})+`, 'g');
        return sourceText.replace(wholeNumberAtATime, function(match) {
            return latnToDravidianNumbers(parseInt(match, 10), data);
        });
}

    let misc = Array.from(data.misc.keys()).join('|');
    let modifiers = Array.from(data.modifiers.keys()).join('|');
    let plosives = plosiveConsonants.join('|');
    let consonants = Array.from(data.consonants.keys()).sort().reverse().join('|');
    let vowels1 = Array.from(data.vowels.keys()).filter(x => ! diphthongsAndConstituents.includes(x)).sort().reverse().join('|');
    let vowels2 = diphthongsAndConstituents.sort().reverse().join('|');

    if (misc.length) {
        sourceText = sourceText.replace(new RegExp(misc, 'g'), function(match) {
            return data.misc.get(match);
        });
    }

    sourceText = sourceText.replace(new RegExp(modifiers, 'g'), function(match) {
        return data.modifiers.get(match);
    });

    sourceText = sourceText.replace(new RegExp(`(${plosives})${separator}`, 'g'), function(match, p1) {
        return data.consonants.get(p1) + data.vowelMarks.get(suppressedVowel);
    });
    sourceText = sourceText.replace(new RegExp(diphthongConstituents, 'g'), function(match, p1) {
        return implicitVowel + data.vowels.get(p1);
    });

    sourceText = sourceText.replace(new RegExp(`(${consonants})(${vowels1})`, 'g'), function(match, p1, p2) {
        return data.consonants.get(p1) + data.vowelMarks.get(p2);
    });
    sourceText = sourceText.replace(new RegExp(vowels1, 'g'), function(match) {
        return data.vowels.get(match);
    });

    sourceText = sourceText.replace(new RegExp(`(${consonants})(${vowels2})`, 'g'), function(match, p1, p2) {
        return data.consonants.get(p1) + data.vowelMarks.get(p2);
    });
    sourceText = sourceText.replace(new RegExp(vowels2, 'g'), function(match) {
        return data.vowels.get(match);
    });

    sourceText = sourceText.replace(new RegExp(consonants, 'g'), function(match) {
        return data.consonants.get(match) + data.vowelMarks.get(suppressedVowel);
    });

    return sourceText;
}
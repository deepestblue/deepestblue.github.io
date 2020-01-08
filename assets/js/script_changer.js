let tamlData = {
    charMap: {
        'க':'k','ச':'c','ட':'ṭ','ற':'ṯ','த':'t','ப':'p',
        'ங':'ṅ','ஞ':'ñ','ண':'ṇ','ன':'ṉ','ந':'n','ம':'m',
        'ய':'y','ர':'r','ல':'ḻ','வ':'v','ழ':'ṛ','ள':'ḷ',
        'அ':'a','ஆ':'ā','இ':'i','ஈ':'ī','உ':'u','ஊ':'ū',
        'எ':'e','ஏ':'ē','ஐ':'ai','ஒ':'o','ஓ':'ō','ஔ':'au',
        'ா':'ā','ி':'i','ீ':'ī','ு':'u','ூ':'ū',
        'ெ':'e','ே':'ē','ை':'ai','ொ':'o','ோ':'ō','ௌ':'au',
        '்':'',
        'ஃ':'ḵ',
        'ௐ':'Ω', '௸':'〃','௹':'₨','𑿩':'#',
    },
    vowels: new Map([
        ['a','அ'], ['ā','ஆ'], ['i','இ'], ['ī','ஈ'], ['u','உ'], ['ū','ஊ'],
        ['e','எ'], ['ē','ஏ'], ['ai','ஐ'], ['o','ஒ'], ['ō','ஓ'], ['au','ஔ'],
    ]),
    vowelMarks: new Map([
        ['a',''], ['ā','ா'],
        ['i','ி'], ['ī','ீ'],
        ['u','ு'], ['ū','ூ'],
        ['e','ெ'], ['ē','ே'], ['ai','ை'],
        ['o','ொ'], ['ō','ோ'], ['au','ௌ'],
        ['','்'],
    ]),
    misc: new Map([
        ['Ω','ௐ',], ['₨','௹'], ['〃','௸',], ['#','𑿩',],
    ]),
    modifiers: new Map([['ḵ','ஃ'],]),
    consonants: new Map([
        ['k','க'],['ṅ','ங'],
        ['c','ச'],['ñ','ஞ'],
        ['ṭ','ட'],['ṇ','ண'],
        ['ṯ','ற'],['ṉ','ன'],
        ['t','த'],['n','ந'],
        ['p','ப'],['m','ம'],
        ['y','ய'],['r','ர'],
        ['ḻ','ல'],['v','வ'],
        ['ṛ','ழ'],['ḷ','ள'],
    ]),
};

let kndaData = {
    charMap: {
        'ಕ':'k','ಚ':'c','ಟ':'ṭ','ಱ':'ṯ','ತ':'t','ಪ':'p',
        'ಙ':'ṅ','ಞ':'ñ','ಣ':'ṇ','಴':'ṉ','ನ':'n','ಮ':'m',
        'ಯ':'y','ರ':'r','ಲ':'ḻ','ವ':'v','ೞ':'ṛ','ಳ':'ḷ',
        'ಅ':'a','ಆ':'ā','ಇ':'i','ಈ':'ī','ಉ':'u','ಊ':'ū',
        'ಎ':'e','ಏ':'ē','ಐ':'ai','ಒ':'o','ಓ':'ō','ಔ':'au',
        'ಾ':'ā','ಿ':'i','ೀ':'ī','ು':'u','ೂ':'ū',
        'ೆ':'e','ೇ':'ē','ೈ':'ai','ೊ':'o','ೋ':'ō','ೌ':'au',
        '್':'',
        'ಃ':'ḵ',
    },
    vowels: new Map([
        ['a','ಅ'], ['ā','ಆ'], ['i','ಇ'], ['ī','ಈ'], ['u','ಉ'], ['ū','ಊ'],
        ['e','ಎ'], ['ē','ಏ'], ['ai','ಐ'], ['o','ಒ'], ['ō','ಓ'], ['au','ಔ'],
    ]),
    vowelMarks: new Map([
        ['a',''], ['ā','ಾ'],
        ['i','ಿ'], ['ī','ೀ'],
        ['u','ು'], ['ū','ೂ'],
        ['e','ೆ'], ['ē','ೇ'], ['ai','ೈ'],
        ['o','ೊ'], ['ō','ೋ'], ['au','ೌ'],
        ['','್'],
    ]),
    misc: new Map([]),
    modifiers: new Map([['ḵ','ಃ'],]),
    consonants: new Map([
        ['k','ಕ'],['ṅ','ಙ'],
        ['c','ಚ'],['ñ','ಞ'],
        ['ṭ','ಟ'],['ṇ','ಣ'],
        ['ṯ','ಱ'],['ṉ','಴'],
        ['t','ತ'],['n','ನ'],
        ['p','ಪ'],['m','ಮ'],
        ['y','ಯ'],['r','ರ'],
        ['ḻ','ಲ'],['v','ವ'],
        ['ṛ','ೞ'],['ḷ','ಳ'],
    ]),
};

let mlymData = {
    charMap: {
        'ക':'k','ച':'c','ട':'ṭ','റ':'ṯ','ത':'t','പ':'p',
        'ങ':'ṅ','ഞ':'ñ','ണ':'ṇ','ഩ':'ṉ','ന':'n','മ':'m',
        'യ':'y','ര':'r','ല':'ḻ','വ':'v','ഴ':'ṛ','ള':'ḷ',
        'അ':'a','ആ':'ā','ഇ':'i','ഈ':'ī','ഉ':'u','ഊ':'ū',
        'എ':'e','ഏ':'ē','ഐ':'ai','ഒ':'o','ഓ':'ō','ഔ':'au',
        'ാ':'ā','ി':'i','ീ':'ī','ു':'u','ൂ':'ū',
        'െ':'e','േ':'ē','ൈ':'ai','ൊ':'o','ോ':'ō','ൌ':'au',
        '്':'',
        'ഃ':'ḵ',
    },
    vowels: new Map([
        ['a','അ'], ['ā','ആ'], ['i','ഇ'], ['ī','ഈ'], ['u','ഉ'], ['ū','ഊ'],
        ['e','എ'], ['ē','ഏ'], ['ai','ഐ'], ['o','ഒ'], ['ō','ഓ'], ['au','ഔ'],
    ]),
    vowelMarks: new Map([
        ['a',''], ['ā','ാ'],
        ['i','ി'], ['ī','ീ'],
        ['u','ു'], ['ū','ൂ'],
        ['e','െ'], ['ē','േ'], ['ai','ൈ'],
        ['o','ൊ'], ['ō','ോ'], ['au','ൌ'],
        ['','്'],
    ]),
    misc: new Map([]),
    modifiers: new Map([['ḵ','ഃ'],]),
    consonants: new Map([
        ['k','ക'],['ṅ','ങ'],
        ['c','ച'],['ñ','ഞ'],
        ['ṭ','ട'],['ṇ','ണ'],
        ['ṯ','റ'],['ṉ','ഩ'],
        ['t','ത'],['n','ന'],
        ['p','പ'],['m','മ'],
        ['y','യ'],['r','ര'],
        ['ḻ','ല'],['v','വ'],
        ['ṛ','ഴ'],['ḷ','ള'],
    ]),
};

let teluData = {
    charMap: {
        'క':'k','చ':'c','ట':'ṭ','ఱ':'ṯ','త':'t','ప':'p',
        'ఙ':'ṅ','ఞ':'ñ','ణ':'ṇ','఩':'ṉ','న':'n','మ':'m',
        'య':'y','ర':'r','ల':'ḻ','వ':'v','ఴ':'ṛ','ళ':'ḷ',
        'అ':'a','ఆ':'ā','ఇ':'i','ఈ':'ī','ఉ':'u','ఊ':'ū',
        'ఎ':'e','ఏ':'ē','ఐ':'ai','ఒ':'o','ఓ':'ō','ఔ':'au',
        'ా':'ā','ి':'i','ీ':'ī','ు':'u','ూ':'ū',
        'ె':'e','ే':'ē','ై':'ai','ొ':'o','ో':'ō','ౌ':'au',
        '్':'',
        'ః':'ḵ',
    },
    vowels: new Map([
        ['a','అ'], ['ā','ఆ'], ['i','ఇ'], ['ī','ఈ'], ['u','ఉ'], ['ū','ఊ'],
        ['e','ఎ'], ['ē','ఏ'], ['ai','ఐ'], ['o','ఒ'], ['ō','ఓ'], ['au','ఔ'],
    ]),
    vowelMarks: new Map([
        ['a',''], ['ā','ా'],
        ['i','ి'], ['ī','ీ'],
        ['u','ు'], ['ū','ూ'],
        ['e','ె'], ['ē','ే'], ['ai','ై'],
        ['o','ొ'], ['ō','ో'], ['au','ౌ'],
        ['','్'],
    ]),
    misc: new Map([]),
    modifiers: new Map([['ḵ','ః'],]),
    consonants: new Map([
        ['k','క'],['ṅ','ఙ'],
        ['c','చ'],['ñ','ఞ'],
        ['ṭ','ట'],['ṇ','ణ'],
        ['ṯ','ఱ'],['ṉ','఩'],
        ['t','త'],['n','న'],
        ['p','ప'],['m','మ'],
        ['y','య'],['r','ర'],
        ['ḻ','ల'],['v','వ'],
        ['ṛ','ఴ'],['ḷ','ళ'],
    ]),
};

function brahmiyaToLatn(otherScript, sourceText) {
    let scriptDataMap = new Map([
        ["knda", kndaData],
        ["mlym", mlymData],
        ["taml", tamlData],
        ["telu", teluData],
    ]);
    let data = scriptDataMap.get(otherScript);
    let vowelMarks = Array.from(data.vowelMarks.values());
    let consonants = Array.from(data.consonants.values());

    let isConsonant = false;
    let isVowelA = false;
    let transliteratedText = "";
    [...sourceText].forEach(c => {
        let isImplicitA = isConsonant &&
            ! vowelMarks.includes(c);
        if (isImplicitA) {
            transliteratedText += 'a';
        }
        if (c in data.charMap) {
            if (isVowelA || isImplicitA) {
                if (['i','u'].indexOf(data.charMap[c]) >= 0) {
                    transliteratedText += ':';
                }
            }
        }

        isVowelA = (c in data.charMap) && (data.charMap[c] == 'a');
        isConsonant = consonants.includes(c);

        transliteratedText += (c in data.charMap) ? data.charMap[c] : c;
    });

    if (isConsonant) {
        transliteratedText += 'a';
    }

    return transliteratedText;
}

function latnToBrahmiya(otherScript, sourceText) {
    let diphthongConstituents = 'a:(i|u)';
    let diphthongsAndConstituents = ['a', 'i', 'u', 'ai', 'au',];
    let plosiveConsonants = ['k', 'c', 'ṭ', 'ṯ', 't', 'p',];

    let scriptDataMap = new Map([
        ["knda", kndaData],
        ["mlym", mlymData],
        ["taml", tamlData],
        ["telu", teluData],
    ]);
    let data = scriptDataMap.get(otherScript);

    let misc = Array.from(data.misc.keys()).sort().reverse().join('|');
    let modifiers = Array.from(data.modifiers.keys()).sort().reverse().join('|');
    let plosives = plosiveConsonants.sort().reverse().join('|');
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

    sourceText = sourceText.replace(new RegExp(`(${plosives}):`, 'g'), function(match, p1) {
        return data.consonants.get(p1) + data.vowelMarks.get('');
    });
    sourceText = sourceText.replace(new RegExp(diphthongConstituents, 'g'), function(match, p1) {
        return 'a' + data.vowels.get(p1);
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
        return data.consonants.get(match) + data.vowelMarks.get('');
    });

    return sourceText;
}

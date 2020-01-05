function taml_to_latn(other_script, source_text) {
    let data = {
        consonants: new Set([
            'க','ச','ட','ற','த','ப',
            'ங','ஞ','ண','ன','ந','ம',
            'ய','ர','ல','வ','ழ','ள',
        ]),
        vowels: new Set([
            'அ','ஆ','இ','ஈ','உ','ஊ',
            'எ','ஏ','ஐ','ஒ','ஓ','ஔ',
        ]),
        vowel_marks: new Set([
            'ா','ி','ீ','ு','ூ',
            'ெ','ே','ை','ொ','ோ','ௌ',
            '்',
        ]),
        modifiers: new Set([
            'ஃ',
        ]),
        misc: new Set([
            'ௐ', '௸', '௹', '𑿩',
        ]),
        char_map: {
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
    };

    let is_consonant = false;
    let is_vowel_a = false;
    let transliterated_text = "";
    [...source_text].forEach(c => {
        let is_implicit_a = is_consonant && ! data.vowel_marks.has(c);
        if (is_implicit_a) {
            transliterated_text += 'a';
        }
        if (c in data.char_map) {
            if (is_vowel_a || is_implicit_a) {
                if (['i','u'].indexOf(data.char_map[c]) >= 0) {
                    transliterated_text += ':';
                }
            }
        }

        is_vowel_a = (c in data.char_map) && (data.char_map[c] == 'a');
        is_consonant = data.consonants.has(c);

        transliterated_text += (c in data.char_map) ? data.char_map[c] : c;
    });

    if (is_consonant) {
        transliterated_text += 'a';
    }

    return transliterated_text;
}

function latn_to_brahmiya(other_script, source_text) {
    let diphthongs_and_constituents = ['a', 'i', 'u', 'ai', 'au',];
    let plosive_consonants = ['k', 'c', 'ṭ', 'ṯ', 't', 'p',];
    let taml_data = {
        vowels: new Map([
            ['a','அ'], ['ā','ஆ'], ['i','இ'], ['ī','ஈ'], ['u','உ'], ['ū','ஊ'],
            ['e','எ'], ['ē','ஏ'], ['ai','ஐ'], ['o','ஒ'], ['ō','ஓ'], ['au','ஔ'],
        ]),
        vowel_marks: new Map([
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

    let data = taml_data;

    let misc = Array.from(data.misc.keys()).sort().reverse().join('|');
    let modifiers = Array.from(data.modifiers.keys()).sort().reverse().join('|');
    let plosives = plosive_consonants.sort().reverse().join('|');
    let diphthong_constituents = 'a:(i|u)';
    let consonants = Array.from(data.consonants.keys()).sort().reverse().join('|');
    let vowels1 = Array.from(data.vowels.keys()).filter(x => !diphthongs_and_constituents.includes(x)).sort().reverse().join('|');
    let vowels2 = diphthongs_and_constituents.sort().reverse().join('|');

    source_text = source_text.replace(new RegExp(misc, 'g'), function(match) {
        return data.misc.get(match);
    });
    source_text = source_text.replace(new RegExp(modifiers, 'g'), function(match) {
        return data.modifiers.get(match);
    });

    source_text = source_text.replace(new RegExp(`(${plosives}):`, 'g'), function(match, p1) {
        return data.consonants.get(p1) + data.vowel_marks.get('');
    });
    source_text = source_text.replace(new RegExp(diphthong_constituents, 'g'), function(match, p1) {
        return 'a' + data.vowels.get(p1);
    });

    source_text = source_text.replace(new RegExp(`(${consonants})(${vowels1})`, 'g'), function(match, p1, p2) {
        return data.consonants.get(p1) + data.vowel_marks.get(p2);
    });
    source_text = source_text.replace(new RegExp(vowels1, 'g'), function(match) {
        return data.vowels.get(match);
    });

    source_text = source_text.replace(new RegExp(`(${consonants})(${vowels2})`, 'g'), function(match, p1, p2) {
        return data.consonants.get(p1) + data.vowel_marks.get(p2);
    });
    source_text = source_text.replace(new RegExp(vowels2, 'g'), function(match) {
        return data.vowels.get(match);
    });

    source_text = source_text.replace(new RegExp(consonants, 'g'), function(match) {
        return data.consonants.get(match) + data.vowel_marks.get('');
    });

    return source_text;
}

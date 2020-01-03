let Tamil = {
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

function tamil_str_to_ISO15919(source_text) {
    let is_consonant = false;
    let is_vowel_a = false;
    let transliterated_text = "";
    [...source_text].forEach(c => {
        let is_implicit_a = is_consonant && ! Tamil.vowel_marks.has(c);
        if (is_implicit_a) {
            transliterated_text += 'a';
        }
        if (c in Tamil.char_map) {
            if (is_vowel_a || is_implicit_a) {
                if (['i','u'].indexOf(Tamil.char_map[c]) >= 0) {
                    transliterated_text += ':';
                }
            }
        }

        is_vowel_a = (c in Tamil.char_map) && (Tamil.char_map[c] == 'a');
        is_consonant = Tamil.consonants.has(c);

        transliterated_text += (c in Tamil.char_map) ? Tamil.char_map[c] : c;
    });

    if (is_consonant) {
        transliterated_text += 'a';
    }

    return transliterated_text;
}

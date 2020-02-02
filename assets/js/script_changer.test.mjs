import chai from "./chai.js";

import { brahmiyaToLatn, latnToBrahmiya } from "./script_changer.mjs";

let assert = chai.assert;

let tamlData = {
    taml : [
        "அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ ஃ",
        "க கா கி கீ கு கூ கெ கே கை கொ கோ கௌ",
        "க் ங் ச் ஞ் ட் ண் ற் ன் த் ந் ப் ம் ய் ர் ல் வ் ழ் ள்",
        "க ங ச ஞ ட ண ற ன த ந ப ம ய ர ல வ ழ ள",
        "அஅக்க்",
        "க்க",
        "லஅ",
        "ஙஞ்டோ",
        "அஊ",
        "இஓஐஅஓனிறீனௌளஈஅ",
    ],
    latn : [
        "a ā i ī u ū e ē ai o ō au ḵ",
        "ka kā ki kī ku kū ke kē kai ko kō kau",
        "k ṅ c ñ ṭ ṇ ṯ ṉ t n p m y r ḻ v ṛ ḷ",
        "ka ṅa ca ña ṭa ṇa ṯa ṉa ta na pa ma ya ra ḻa va ṛa ḷa",
        "aakk",
        "kka",
        "ḻaa",
        "ṅañṭō",
        "aū",
        "iōaiaōṉiṯīṉauḷaīa",
    ],
};

function testTamilToLatin() {
    [...Array(tamlData.taml.length).keys()].forEach(function(i) {
        assert.equal(
            brahmiyaToLatn("taml", tamlData.taml[i], false),
            tamlData.latn[i]);
    });
}

function testLatinToTamil() {
    [...Array(tamlData.latn.length).keys()].forEach(function(i) {
        assert.equal(
            latnToBrahmiya("taml", tamlData.latn[i], false),
            tamlData.taml[i]);
    });
}

testTamilToLatin();
testLatinToTamil();

let teluData = {
    telu : [
        "అ ఆ ఇ ఈ ఉ ఊ ఎ ఏ ఐ ఒ ఓ ఔ",
        "క కా కి కీ కు కూ కె కే కై కొ కో కౌ",
        "క్ ఙ్ చ్ ఞ్ ట్ ణ్ ఱ్ ఩్ త్ న్ ప్ మ్ య్ ర్ ల్ వ్ ఴ్ ళ్",
        "క ఙ చ ఞ ట ణ ఱ ఩ త న ప మ య ర ల వ ఴ ళ",
    ],
    latn : [
        "a ā i ī u ū e ē ai o ō au",
        "ka kā ki kī ku kū ke kē kai ko kō kau",
        "k ṅ c ñ ṭ ṇ ṯ ṉ t n p m y r ḻ v ṛ ḷ",
        "ka ṅa ca ña ṭa ṇa ṯa ṉa ta na pa ma ya ra ḻa va ṛa ḷa",
    ],
};

function testTeluguToLatin() {
    [...Array(teluData.telu.length).keys()].forEach(function(i) {
        assert.equal(
            brahmiyaToLatn("telu", teluData.telu[i], false),
            teluData.latn[i]);
    });
}

function testLatinToTelugu() {
    [...Array(teluData.latn.length).keys()].forEach(function(i) {
        assert.equal(
            latnToBrahmiya("telu", teluData.latn[i], false),
            teluData.telu[i]);
    });
}

testTeluguToLatin();
testLatinToTelugu();

let devaData = {
    deva : [
        "अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ए ऐ ओ औ अं अँ अः",
        "क का कि की कु कू कृ कॄ कॢ कॣ के कै को कौ कं कँ कः",
        "क् ख् ग् घ् ङ् च् छ् ज् झ् ञ् ट् ठ् ड् ढ् ण् त् थ् द् ध् न् प् फ् ब् भ् म् य् र् ल् ळ् व् श् ष् स् ह्",
        "क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल ळ व श ष स ह",
        "का खा गा घा ङा चा छा जा झा ञा टा ठा डा ढा णा ता था दा धा ना पा फा बा भा मा या रा ला ळा वा शा षा सा हा",
        "अअक्क्",
        "क्क",
        "लअ",
        "ङञ्टो",
        "अऊ",
        "इओऐअओनितीनौळईअ",
        "अग्ः",
//        "ब्हण्हपइच्हउअइअओ",
    ],
    latn : [
        "a ā i ī u ū r̥ r̥̄ l̥ l̥̄ ē ai ō au aṁ am̐ aḥ",
        "ka kā ki kī ku kū kr̥ kr̥̄ kl̥ kl̥̄ kē kai kō kau kaṁ kam̐ kaḥ",
        "k kh g gh ṅ c ch j jh ñ ṭ ṭh ḍ ḍh ṇ t th d dh n p ph b bh m y r l ḷ v ś ṣ s h",
        "ka kha ga gha ṅa ca cha ja jha ña ṭa ṭha ḍa ḍha ṇa ta tha da dha na pa pha ba bha ma ya ra la ḷa va śa ṣa sa ha",
        "kā khā gā ghā ṅā cā chā jā jhā ñā ṭā ṭhā ḍā ḍhā ṇā tā thā dā dhā nā pā phā bā bhā mā yā rā lā ḷā vā śā ṣā sā hā",
        "aakk",
        "kka",
        "laa",
        "ṅañṭō",
        "aū",
        "iōaiaōnitīnauḷaīa",
        "agḥ",
//        "b:haṇhapa:ic:ha:ua:iaō",
    ],
};

function testDevanagariToLatin() {
    [...Array(devaData.deva.length).keys()].forEach(function(i) {
        assert.equal(
            brahmiyaToLatn("deva", devaData.deva[i], false),
            devaData.latn[i]);
    });
}

function testLatinToDevanagari() {
    [...Array(devaData.latn.length).keys()].forEach(function(i) {
        assert.equal(
            latnToBrahmiya("deva", devaData.latn[i], false),
            devaData.deva[i]);
    });
}

testDevanagariToLatin();
testLatinToDevanagari();

let numData = {
    taml : [
        "௦",
        "௧ ௨ ௩ ௪ ௫ ௬ ௭ ௮ ௯",
//        "௰ ௱ ௲",
//        "௰௧௲",
//        "௰௲௲",
//        "௰௧௲௲௱௰௧௲௱௰௧",
//        "௨௲௰௩",
//        "௨௰௲௲௰௩",
//        "௨௰௲௩",
//        "௨௰௲௲௩௲௲௬௱௲௫௰௲௫௱௬௰௬",
//        "௲௲௱௲௰௲௲௱௰௧",
    ],
    telu : [
        "౦",
        "౧ ౨ ౩ ౪ ౫ ౬ ౭ ౮ ౯",
//        "౧౦ ౧౦౦ ౧౦౦౦",
    ],
    deva : [
        "०",
        "१ २ ३ ४ ५ ६ ७ ८ ९",
//        "१० १०० १०००",
    ],
    latn : [
        "0",
        "1 2 3 4 5 6 7 8 9",
//        "10 100 1000",
//        "11000",
//        "10000000",
//        "11111111",
    ],
};

function testNumbers() {
    [...Array(numData.latn.length).keys()].forEach(function(i) {
        assert.equal(
            brahmiyaToLatn("taml", numData.taml[i], true),
            numData.latn[i]);
        assert.equal(
            latnToBrahmiya("taml", numData.latn[i], true),
            numData.taml[i]);
        assert.equal(
            brahmiyaToLatn("telu", numData.telu[i], true),
            numData.latn[i]);
        assert.equal(
            latnToBrahmiya("telu", numData.latn[i], true),
            numData.telu[i]);
        assert.equal(
            brahmiyaToLatn("deva", numData.deva[i], true),
            numData.latn[i]);
        assert.equal(
            latnToBrahmiya("deva", numData.latn[i], true),
            numData.deva[i]);
    });
}

testNumbers();

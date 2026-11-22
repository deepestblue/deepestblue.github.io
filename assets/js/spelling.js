const புள்ளி = "்";
const அLetter = "அ";
const aiLetter = "\u{0B90}";
const aiMarker = "\u{0BC8}";
const ய = "ய";
const anyமெய்Withஅ = "[கஙசஞடணறனதநபமயவரலளழ]";
const letterOrMark = "[\\p{Script=Taml}&&[\\p{Letter}\\p{Mark}]]";

const அய்காரத்துப்புதுவிதிகள் = [
    [RegExp(`(${anyமெய்Withஅ})${ய}${புள்ளி}`, "gv",), `$1${aiMarker}`,],
    [RegExp(`(${letterOrMark}${anyமெய்Withஅ})${ய}`, "gv",), `$1${aiMarker}${ய}`,],
    [RegExp(`${அLetter}${ய}${புள்ளி}`, "gv",), aiLetter,],
];

const அய்காரத்துப்பழயவிதிகள் = [
    [RegExp(`(${letterOrMark}${letterOrMark})${aiMarker}${ய}`, "gv",), `$1${ய}`,],
    [RegExp(`${aiMarker}`, "gv",), `${ய}${புள்ளி}`,],
    [RegExp(`${aiLetter}`, "gv",), `${அLetter}${ய}${புள்ளி}`,],
];

const applyRules = rules => text => rules.reduce(
    (acc, [pattern, replacement,],) => acc.replace(pattern, replacement,),
    text,
);

export const toModnSpelling = applyRules(அய்காரத்துப்புதுவிதிகள்,);
export const toTradSpelling = applyRules(அய்காரத்துப்பழயவிதிகள்,);

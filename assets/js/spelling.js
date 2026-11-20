const புள்ளி = "்";
const அLetter = "அ";
const ஐLetter = "ஐ";
const ஐMarker = "ை";
const ய = "ய";
const anyமெய்Withஅ = "[கஙசஞடணறனதநபமயவரலளழ]";
const letterOrMark = "[\\p{Script=Taml}&&[\\p{Letter}\\p{Mark}]]";

const அய்காரத்துப்புதுவிதிகள் = [
    [RegExp(`(${anyமெய்Withஅ})${ய}${புள்ளி}`, "gv",), `$1${ஐMarker}`,],
    [RegExp(`(${letterOrMark}${anyமெய்Withஅ})${ய}`, "gv",), `$1${ஐMarker}${ய}`,],
    [RegExp(`${அLetter}${ய}${புள்ளி}`, "gv",), ஐLetter,],
];

const அய்காரத்துப்பழயவிதிகள் = [
    [RegExp(`(${letterOrMark}${letterOrMark})${ஐMarker}${ய}`, "gv",), `$1${ய}`,],
    [RegExp(`${ஐMarker}`, "gv",), `${ய}${புள்ளி}`,],
    [RegExp(`${ஐLetter}`, "gv",), `${அLetter}${ய}${புள்ளி}`,],
];

const applyRules = rules => text => rules.reduce(
    (acc, [pattern, replacement,],) => acc.replace(pattern, replacement,),
    text,
);

export const toModnSpelling = applyRules(அய்காரத்துப்புதுவிதிகள்,);
export const toTradSpelling = applyRules(அய்காரத்துப்பழயவிதிகள்,);

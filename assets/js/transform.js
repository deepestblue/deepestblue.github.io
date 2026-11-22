// Calls visitElement on every element from node down and visitText on every text node, with the lang it inherits, leaving out script and style, which hold code rather than text, and elements that carry any of skipAttributes. An elementʼs children are walked with the lang it had before visitElement was called on it, so visitElement may relabel it.
const walk = (inheritedLang, node, skipAttributes, visitElement, visitText,) => {
    switch (node.nodeType) {
        case Node.TEXT_NODE:
            visitText(node, inheritedLang,);
            return;
        case Node.ELEMENT_NODE: {
            if (["script", "style",].includes(node.localName,) || skipAttributes.some(attribute => node.hasAttribute(attribute,),)) {
                return;
            }
            // Only a missing lang inherits: per HTML, an empty one means the language is unknown. As above, grab the lang first before visitElement has a chance to perhaps change it.
            const lang = node.getAttribute("lang",) ?? inheritedLang;
            visitElement(node,);
            node.childNodes.forEach(child => walk(lang, child, skipAttributes, visitElement, visitText,),);
        }
    }
};

// Transliterate all the text in langCode into tgtScript, converting each text node from the script named by the lang it inherits. data-no-transliterate marks text that must keep the script it was written in.
export const transform = (docRoot, transliterate, langCode, tgtScript,) => walk("", docRoot, ["data-no-transliterate",], element => {
    if (! element.getAttribute("lang",)?.startsWith(`${langCode}-`,)) {
        return;
    }
    element.setAttribute("lang", `${langCode}-${tgtScript}`,);
}, (node, lang,) => {
    const [code, srcScript,] = lang.split("-",);
    if (code !== langCode || srcScript === tgtScript) {
        return;
    }
    node.textContent = transliterate(srcScript, tgtScript, node.textContent,);
},);

// Respell all the text in Taml. data-no-respell marks text to leave as written.
export const respell = (docRoot, respeller,) => walk("", docRoot, ["data-no-respell",], () => {}, (node, lang,) => {
    const [, script,] = lang.split("-",);
    if (script !== "Taml") {
        return;
    }
    node.textContent = respeller(node.textContent,);
},);

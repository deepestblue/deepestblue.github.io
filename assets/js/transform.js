/* global Node:false */

// Transliterate all the text in langCode into tgtScript, converting each text node from the script named by the lang it inherits.
export const transform = (docRoot, transliterate, langCode, tgtScript,) => {
    (function walk(inheritedLang, node,) {
        switch (node.nodeType) {
            case Node.TEXT_NODE: {
                const [code, srcScript,] = inheritedLang.split("-",);
                if (code !== langCode || srcScript === tgtScript) {
                    return;
                }
                node.textContent = transliterate(srcScript, tgtScript, node.textContent,);
                return;
            }
            case Node.ELEMENT_NODE: {
                // script and style hold code rather than text, and data-no-transliterate marks text that must keep the script it was written in.
                if (["script", "style",].includes(node.localName,) || node.hasAttribute("data-no-transliterate",)) {
                    return;
                }
                // Only a missing lang inherits: per HTML, an empty one means the language is unknown.
                const elementLang = node.hasAttribute("lang",) ? node.lang : inheritedLang;
                if (node.lang.startsWith(`${langCode}-`,)) {
                    node.lang = `${langCode}-${tgtScript}`;
                }
                node.childNodes.forEach(walk.bind(undefined, elementLang,),);
            }
        }
    })("", docRoot,);
};

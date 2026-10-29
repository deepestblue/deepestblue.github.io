/* global Node:false */

// Transliterate all the text in langCode from srcScript to tgtScript.
export const transform = (docRoot, transliterate, langCode, srcScript, tgtScript,) => {
    (function walk(langMatched, node,) {
        switch (node.nodeType) {
            case Node.TEXT_NODE:
                if (! langMatched) {
                    return;
                }
                node.textContent = transliterate(srcScript, tgtScript, node.textContent,);
                break;
            case Node.ELEMENT_NODE:
                if (node.lang) {
                    langMatched = node.lang === `${langCode}-${srcScript}`;
                    if (langMatched) {
                        node.lang = `${langCode}-${tgtScript}`;
                    }
                }
                node.childNodes.forEach(walk.bind(undefined, langMatched,),);
                break;
        }
    })(false, docRoot,);
};

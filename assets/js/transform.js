/* global Node:false */

// Transliterate all the text in langCode.
function transform(docRoot, transliterate, langCode, srcScript, tgtScript) {
    (function walk(node, langMatched) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                if (node.lang) {
                    langMatched = node.lang == `${langCode}-${srcScript}`;
                    if (langMatched) {
                        node.lang = `${langCode}-${tgtScript}`;
                    }
                }
                node.childNodes.forEach(
                    child => walk(child, langMatched));
                break;
            case Node.TEXT_NODE:
                if (langMatched) {
                    node.textContent = transliterate(srcScript, tgtScript, node.textContent);
                }
                break;
        }
    })(docRoot);
}

export { transform };

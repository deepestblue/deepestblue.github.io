/* global Node:false */

// Transliterate all the text in the given langCode.
function transform(langCode, transliterate) {
    return function walk(node, langMatched) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                if (node.lang) {
                    langMatched = node.lang == langCode;
                }
                node.childNodes.forEach(
                    child => walk(child, langMatched));
                break;
            case Node.TEXT_NODE:
                if (langMatched) {
                    node.textContent = transliterate(node.textContent);
                }
                break;
        }
    };
}

export { transform };

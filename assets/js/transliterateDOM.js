/* global Node:false */

// Transliterate all the text in the given nodes from srcScript to tgtScript.
function transliterateDOM(transliterator, langCode, srcScript, tgtScript) {
    const root = document.documentElement;

    (function walk(node, langMatched) {
        // Walk the DOM starting at node.
        if (node.nodeType == Node.TEXT_NODE) {
            if (langMatched) {
                node.textContent = transliterator(srcScript, tgtScript, node.textContent);
            }
            return;
        }

        if (node.nodeType != Node.ELEMENT_NODE) {
            return;
        }

        if (node.lang) {
            langMatched = node.lang == langCode;
        }

        node.childNodes.forEach(
            child => walk(child, langMatched));
    })(root, root.lang == langCode);
}

export { transliterateDOM };

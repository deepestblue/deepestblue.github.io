/* global Node:false */

// Create a closure of walk on langCode and the source and target scripts.
function closeWalkOn(transliterator, langCode, srcScript, tgtScript) {
    // Walk the DOM starting at node.
    return function walk(node, langMatched) {
        if (node.nodeType == Node.TEXT_NODE) {
            if (langMatched) {
                node.textContent = transliterator(srcScript, tgtScript, node.textContent);
            }
            return;
        }

        if (node.nodeType != Node.ELEMENT_NODE) {
            return;
        }

        const lang = node.dataset.lang;
        if (lang) {
            langMatched = lang == langCode;
        }

        node.childNodes.forEach(
            child => walk(child, langMatched));
    };
}

// Transliterate all the text in the given nodes from srcScript to tgtScript.
function transliterateDOM(transliterator, nodes, docLang, langCode, srcScript, tgtScript) {
    const closedWalk = closeWalkOn(transliterator, langCode, srcScript, tgtScript);
    nodes.forEach(node => closedWalk(node, docLang == langCode));
}

export { transliterateDOM };
/* global Node:false */

import { transliterate } from "https://cdn.jsdelivr.net/gh/deepestblue/SaulabhyaJS@0.2.0/src/saulabhya.min.js";

// Create a closure of walk on langCode and the source and destination scripts.
function closedWalk(langCode, srcScript, dstScript) {
    // Walk the DOM starting at node.
    return function walk(node, langMatched) {
        if (node.nodeType == Node.TEXT_NODE) {
            if (langMatched) {
                node.textContent = transliterate(srcScript, dstScript, node.textContent);
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

// Transliterate all the text in the given nodes from srcScript to dstScript.
function transliterateDOM(nodes, docLang, langCode, srcScript, dstScript) {
    nodes.forEach(node =>
        closedWalk(langCode, srcScript, dstScript)(node, docLang == langCode)
    );
}

export { transliterateDOM };

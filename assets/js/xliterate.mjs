/* global Node:false */

import { brahmicToLatin, latinToBrahmic } from "https://cdn.jsdelivr.net/gh/deepestblue/SaulabhyaJS@0.1.2/src/script_changer.mjs";

// Close walk on langCode and converter and return it.
function closedWalk(langCode, converter) {
    // Walk the DOM starting at node.
    return function walk(node, langMatched) {
        if (node.nodeType == Node.TEXT_NODE) {
            if (langMatched) {
                node.textContent = converter(node.textContent);
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

// Transliterate between Latin and otherScript using converter.
function latnXliterate({ nodes, docLang, langCode}, otherScript, converter) {
    nodes.forEach(node =>
        closedWalk(langCode,
            converter.bind(undefined, otherScript)
        )(node, docLang == langCode)
    );
}

// Given domParams, transliterate from srcScript to dstScript
function xliterate(domParams, srcScript, dstScript) {
    if (dstScript == "latn") {
        latnXliterate(domParams, srcScript, brahmicToLatin);
        return;
    }
    if (srcScript == "latn") {
        latnXliterate(domParams, dstScript, latinToBrahmic);
        return;
    }

    // Transliterate from one Brahmic script to another through Latin.
    latnXliterate(domParams, srcScript, brahmicToLatin);
    latnXliterate(domParams, dstScript, latinToBrahmic);
}

export { xliterate };

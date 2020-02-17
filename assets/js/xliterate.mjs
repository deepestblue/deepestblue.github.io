/* global Node:false */

import { brahmicToLatin, latinToBrahmic } from "https://cdn.jsdelivr.net/gh/deepestblue/SaulabhyaJS@0.1.2/src/script_changer.mjs";

function latnXliterate(nodes, documentLang, langCode, otherScript, converter) {
    function walk(node, langMatched) {
        if (node.nodeType == Node.TEXT_NODE) {
            if (langMatched) {
                node.textContent = converter(otherScript, node.textContent);
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
    }

    const langMatched = documentLang == langCode;

    nodes.forEach(node => walk(node, langMatched));
}

function xliterate(nodes, documentLang, langCode, srcScript, dstScript) {
    if (dstScript == "latn") {
        latnXliterate(nodes, documentLang, langCode, srcScript, brahmicToLatin);
        return;
    }
    if (srcScript == "latn") {
        latnXliterate(nodes, documentLang, langCode, dstScript, latinToBrahmic);
        return;
    }

    latnXliterate(nodes, documentLang, langCode, srcScript, brahmicToLatin);
    latnXliterate(nodes, documentLang, langCode, dstScript, latinToBrahmic);
}

export { xliterate };

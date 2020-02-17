/* global Node:false */

import { brahmicToLatin, latinToBrahmic } from "https://cdn.jsdelivr.net/gh/deepestblue/SaulabhyaJS@0.1.2/src/script_changer.mjs";

function latnXliterate({ nodes, docLang, langCode}, otherScript, converter) {
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

    const langMatched = docLang == langCode;

    nodes.forEach(node => walk(node, langMatched));
}

function xliterate(domParams, srcScript, dstScript) {
    if (dstScript == "latn") {
        latnXliterate(domParams, srcScript, brahmicToLatin);
        return;
    }
    if (srcScript == "latn") {
        latnXliterate(domParams, dstScript, latinToBrahmic);
        return;
    }

    latnXliterate(domParams, srcScript, brahmicToLatin);
    latnXliterate(domParams, dstScript, latinToBrahmic);
}

export { xliterate };

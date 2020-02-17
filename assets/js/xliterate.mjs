/* global Node:false, document:false */

import { brahmicToLatin, latinToBrahmic } from "https://cdn.jsdelivr.net/gh/deepestblue/SaulabhyaJS@0.1.2/src/script_changer.mjs";

function latnXliterate(nodes, langCode, otherScript, converter) {
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

        node = node.firstChild;
        while (node) {
            walk(node, langMatched);
            node = node.nextSibling;
        }
    }

    const langMatched = document.documentElement.lang == langCode;

    nodes.forEach(node => walk(node, langMatched));
}

function xliterate(nodes, langCode, srcScript, dstScript) {
    if (dstScript == "latn") {
        latnXliterate(nodes, langCode, srcScript, brahmicToLatin);
        return;
    }
    if (srcScript == "latn") {
        latnXliterate(nodes, langCode, dstScript, latinToBrahmic);
        return;
    }

    latnXliterate(nodes, langCode, srcScript, brahmicToLatin);
    latnXliterate(nodes, langCode, dstScript, latinToBrahmic);
}

export { xliterate };

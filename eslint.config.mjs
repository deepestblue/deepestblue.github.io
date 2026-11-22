import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import html from "@html-eslint/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import yml from "eslint-plugin-yml";
import globals from "globals";
import { defineConfig, includeIgnoreFile, } from "eslint/config";

const brahmicBlocks = String.raw`\u{0900}-\u{0DFF}\u{1CD0}-\u{1CFF}\u{A8E0}-\u{A8FF}\u{11300}-\u{1137F}\u{11FC0}-\u{11FFF}`;
const brahmicChar = new RegExp(`[${brahmicBlocks}]`, "v",);
const scriptRuns = new RegExp(`[${brahmicBlocks}]+|[^${brahmicBlocks}]+`, "gv",);
// Like scriptRuns, but each run stops at a line break, which never takes part in normalisation, so that each problem is reported at its own line.
const lineScriptRuns = new RegExp(`[${brahmicBlocks}]+|[^${brahmicBlocks}\\n]+`, "gv",);
const formOf = run => (brahmicChar.test(run,) ? "NFC" : "NFD");

const normalisationRule = {
    meta: {
        type: "problem",
        messages: {
            NFC: "Brahmic text in a literal must be in NFC.",
            NFD: "Non‐Brahmic text in a literal must be in NFD.",
        },
    },
    create: context => {
        const check = (node, text,) => {
            const wrong = text.matchAll(scriptRuns,)
                .map(([run,],) => run,)
                .find(run => run !== run.normalize(formOf(run,),),);
            if (! wrong) {
                return;
            }
            context.report({ node, messageId: formOf(wrong,), },);
        };
        return {
            Literal: node => {
                if (typeof node.value === "string") {
                    check(node, node.value,);
                    return;
                }
                if (node.regex) {
                    check(node, node.regex.pattern,);
                }
            },
            TemplateElement: node => check(node, node.value.cooked ?? node.value.raw,),
        };
    },
};

const textNormalisationRule = {
    meta: {
        type: "problem",
        messages: {
            NFC: "Brahmic text must be in NFC.",
            NFD: "Non‐Brahmic text must be in NFD.",
        },
    },
    create: context => {
        const { sourceCode, } = context;
        sourceCode.text.matchAll(lineScriptRuns,)
            .filter(([run,],) => run !== run.normalize(formOf(run,),),)
            .forEach(({ 0: run, index, },) => context.report({
                loc: {
                    start: sourceCode.getLocFromIndex(index,),
                    end: sourceCode.getLocFromIndex(index + run.length,),
                },
                messageId: formOf(run,),
            },),);
        return {};
    },
};

// Keep each entry as narrow as the code points actually needed: an entry wider than that causes no lint error, so the extra characters it allows would go unnoticed.
const allowedCodePoints = {
    whitespace: String.raw`\u{000A}\u{0020}`,
    tamil: String.raw`\u{0B83}\u{0B85}-\u{0B8A}\u{0B8E}-\u{0B8F}\u{0B92}-\u{0B93}\u{0B95}\u{0B99}-\u{0B9A}\u{0B9E}-\u{0B9F}\u{0BA3}-\u{0BA4}\u{0BA8}-\u{0BAA}\u{0BAE}-\u{0BB5}\u{0BBE}-\u{0BC2}\u{0BC6}-\u{0BC7}\u{0BCA}-\u{0BCB}\u{0BCD}\u{0BE7}-\u{0BF2}`,
    grantha: String.raw`\u{0951}-\u{0952}\u{0964}-\u{0965}\u{1CF2}\u{1CF4}\u{11301}-\u{11303}\u{11305}-\u{1130C}\u{1130F}-\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}-\u{11333}\u{11335}-\u{11339}\u{1133E}-\u{11344}\u{11347}-\u{11348}\u{1134B}-\u{1134D}\u{11350}\u{1135D}-\u{11360}\u{11362}\u{11366}-\u{1136C}\u{11370}-\u{11374}`,
    malayalam: String.raw`\u{0D02}\u{0D2E}-\u{0D2F}\u{0D32}-\u{0D33}\u{0D3E}`,
    kannada: String.raw`\u{0C95}\u{0CA1}\u{0CA8}\u{0CCD}`,
    telugu: String.raw`\u{0C17}\u{0C24}\u{0C32}\u{0C41}\u{0C46}`,
    devanagari: String.raw`\u{0901}-\u{0903}\u{0905}-\u{090C}\u{090F}-\u{0910}\u{0913}-\u{0928}\u{092A}-\u{0930}\u{0932}-\u{0933}\u{0935}-\u{0939}\u{093D}-\u{093E}\u{0940}\u{0947}\u{094D}\u{0960}-\u{0961}\u{1CF5}-\u{1CF6}`,
    latin: String.raw`\u{0021}-\u{0026}\u{0028}-\u{007E}\u{00D7}\u{0256}\u{0259}\u{0266}\u{0273}\u{027B}\u{027D}\u{0282}\u{02B0}\u{02BC}\u{02C8}\u{02D0}\u{0301}\u{0303}-\u{0304}\u{0307}\u{0310}\u{0323}\u{0325}\u{0329}-\u{032A}\u{032E}\u{0331}\u{2010}\u{2013}-\u{2014}\u{2018}-\u{2019}\u{201C}-\u{201D}\u{2022}\u{2026}\u{2081}-\u{2083}\u{2122}\u{2265}`,
    arrows: String.raw`\u{21D2}`,
};

const disallowedCodePoint = new RegExp(`[^${Object.values(allowedCodePoints,).join("",)}]`, "gv",);

const allowListRule = {
    meta: {
        type: "problem",
        messages: {
            BOM: "A byte‐order mark is not in the allow‐list.",
            disallowed: "{{codePoint}} is not in the allow‐list.",
        },
    },
    // The whole text is scanned during create and no visitors are needed, to avoid a situation where the visitors could get called multiple times.
    create: context => {
        const { sourceCode, } = context;
        if (sourceCode.hasBOM) {
            context.report({ loc: sourceCode.getLocFromIndex(0,), messageId: "BOM", },);
        }
        sourceCode.text.matchAll(disallowedCodePoint,)
            .map(({ 0: char, index, },) => ({
                loc: {
                    start: sourceCode.getLocFromIndex(index,),
                    end: sourceCode.getLocFromIndex(index + char.length,),
                },
                messageId: "disallowed",
                data: { codePoint: `U+${char.codePointAt(0,).toString(16,).toUpperCase().padStart(4, "0",)}`, },
            }),)
            .forEach(descriptor => context.report(descriptor,),);
        return {};
    },
};

const local = {
    rules: {
        allowList: allowListRule,
        normalisation: normalisationRule,
        textNormalisation: textNormalisationRule,
    },
};

export default defineConfig([
    includeIgnoreFile(`${import.meta.dirname}/.gitignore`,),
    {
        files: ["**/*.js", "**/*.mjs",],
        extends: [
            js.configs.all,
            stylistic.configs.all,
            stylistic.configs.customize({
                braceStyle: "1tbs",
                commaDangle: "always",
                indent: 4,
                jsx: false,
                quotes: "double",
                semi: true,
            },),
        ],
        rules: {
            "capitalized-comments": "off",
            "id-length": "off",
            "max-lines-per-function": "off",
            "max-params": ["error", 10,],
            "max-statements": "off",
            "no-empty": ["error", { allowEmptyCatch: true, },],
            "no-empty-function": "off",
            "no-magic-numbers": "off",
            "no-misleading-character-class": "off",
            "no-sequences": ["error", { allowInParentheses: false, },],
            "no-ternary": "off",
            "no-undefined": "off",
            "one-var": "off",
            "default-case": "off",
            "require-unicode-regexp": ["error", { requireFlag: "v", },],
            "sort-imports": "off",
            "sort-keys": "off",
            "@stylistic/arrow-parens": ["error", "as-needed",],
            "@stylistic/comma-dangle": ["error", "always",],
            "@stylistic/no-extra-parens": "error",
            "@stylistic/newline-per-chained-call": "off",
            "@stylistic/semi": "error",
            "@stylistic/space-unary-ops": ["error", { overrides: { "!": true, }, },],
        },
    },
    {
        files: ["assets/js/**/*.js",],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            "local/normalisation": "error",
        },
    },
    {
        files: ["**/*.md",],
        language: "markdown/gfm",
        plugins: {
            markdown,
        },
    },
    {
        files: ["**/*.json",],
        language: "json/json",
        plugins: {
            json,
        },
    },
    {
        files: ["**/*.yml", "**/*.yaml",],
        language: "yml/yaml",
        plugins: {
            yml,
        },
    },
    {
        files: ["**/*.html",],
        language: "html/html",
        plugins: {
            html,
        },
    },
    {
        files: ["**/*.md", "**/*.html",],
        rules: {
            "local/textNormalisation": "error",
        },
    },
    {
        plugins: {
            local,
        },
        rules: {
            "local/allowList": "error",
        },
    },
],);

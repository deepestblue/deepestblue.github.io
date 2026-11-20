import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";

export default [
    {
        ignores: ["_site/",],
    },
    js.configs.all,
    {
        files: ["assets/js/**/*.js",],
        languageOptions: {
            globals: globals.browser,
        },
    },
    stylistic.configs.customize({
        braceStyle: "1tbs",
        commaDangle: "always",
        indent: 4,
        jsx: false,
        quotes: "double",
        semi: true,
    },),
    {
        plugins: {
            "@stylistic": stylistic,
        },
        rules: {
            "capitalized-comments": "off",
            "id-length": "off",
            "max-lines-per-function": "off",
            "max-params": ["error", 10,],
            "max-statements": "off",
            "no-empty": ["error", { allowEmptyCatch: true, },],
            "no-empty-function": "off",
            "no-magic-numbers": ["error", { ignore: [10,], },],
            "no-sequences": ["error", { allowInParentheses: false, },],
            "no-undefined": "off",
            "one-var": "off",
            "default-case": "off",
            "require-unicode-regexp": ["error", { requireFlag: "v", },],
            "sort-imports": "off",
            "sort-keys": "off",
            "@stylistic/arrow-parens": ["error", "as-needed",],
            "@stylistic/comma-dangle": ["error", "always",],
            "@stylistic/no-extra-parens": "error",
            "@stylistic/semi": "error",
            "@stylistic/space-unary-ops": ["error", { overrides: { "!": true, }, },],
        },
    },
];

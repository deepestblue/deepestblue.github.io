import { transform } from "./transform.js";
import { transliterate }
  from "https://cdn.jsdelivr.net/gh/deepestblue/SaulabhyaJS@0/src/saulabhya.min.js";

// A change is applied and remembered across pages, and a remembered choice is applied as the page loads.
const setUpSelect = (selector, eventHandler,) => {
    const select = document.querySelector(selector,);
    // A browser can refuse storage, for instance when the reader blocks site data, and then choices just arenʼt remembered.
    select.addEventListener("change", () => {
        eventHandler(select.value,);
        try {
            localStorage.setItem(selector, select.value,);
        } catch {
        }
    },);
    const choice = (() => {
        try {
            return localStorage.getItem(selector,);
        } catch {
            return null;
        }
    })();
    if (! choice) {
        return;
    }
    select.value = choice;
    eventHandler(choice,);
};

// So that the document title follows the page headingʼs text. The title can't be changed through transform as it can't have HTML lang tags (it's always plain text).
const withTitleSync = (eventHandler,) => (script,) => {
    const heading = document.querySelector("[data-id='page-title']",);
    const before = heading.textContent;
    eventHandler(script,);
    document.title = document.title.replace(before, heading.textContent,);
};

// Setting the drop‐down starting value based on the pageʼs own language & script.
(lang => {
    const [pageLangCode, pageScript] = lang.split("-",);
    const pageLangSelect = document.querySelector(`#select-${pageLangCode}`,);
    if (! pageLangSelect) {
        return;
    }
    pageLangSelect.value = pageScript;
})(document.documentElement.lang);

// Setting up the form‐selects after their starting values, so that a remembered choice replaces the pageʼs own script.
setUpSelect(
  "#select-ta",
  withTitleSync(transform.bind(undefined, document.documentElement, transliterate, "ta",),),);
setUpSelect(
  "#select-cls",
  withTitleSync(transform.bind(undefined, document.documentElement, transliterate, "cls",),),);

document.querySelector("#script-pickers",).hidden = false;

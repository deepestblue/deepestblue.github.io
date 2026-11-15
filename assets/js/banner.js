import { transform } from "./transform.js";
import { transliterate }
  from "https://cdn.jsdelivr.net/gh/deepestblue/SaulabhyaJS@0.4.0/src/saulabhya.min.js";

// Ensuring the form‐select's change event‐handler has access to
// both the old and new values.
const onSelectValueChange = (selector, eventHandler,) => {
    let previous;
    let elt = document.querySelector(selector,);
    elt.addEventListener("focus", function() {
        previous = this.value;
    },);
    elt.addEventListener("change", function() {
        eventHandler(previous, this.value,);
        previous = this.value;
    },);
};

// So that the document title follows the page headingʼs text. The title can't be changed through transform as it can't have HTML lang tags (it's always plain text).
const withTitleSync = (eventHandler,) => (previous, current,) => {
    const heading = document.querySelector("[data-id='page-title']",);
    const before = heading.textContent;
    eventHandler(previous, current,);
    document.title = document.title.replace(before, heading.textContent,);
};

// Adding handlers for the form‐selectsʼ change events.
onSelectValueChange(
  "#select-tam",
  withTitleSync(transform.bind(undefined, document.documentElement, transliterate, "tam",),),);
onSelectValueChange(
  "#select-cls",
  withTitleSync(transform.bind(undefined, document.documentElement, transliterate, "cls",),),);

// Setting the drop‐down starting value based on the pageʼs own language & script.
(lang => {
    const [pageLangCode, pageScript] = lang.split("-",);
    const pageLangSelect = document.querySelector(`#select-${pageLangCode}`,);
    if (! pageLangSelect) {
        return;
    }
    pageLangSelect.value = pageScript;
})(document.documentElement.lang);

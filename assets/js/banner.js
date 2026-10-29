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

// Adding handlers for the form‐selectsʼ change events.
onSelectValueChange(
  "#select-tam",
  transform.bind(undefined, document.documentElement, transliterate, "tam",),);
onSelectValueChange(
  "#select-cls",
  transform.bind(undefined, document.documentElement, transliterate, "cls",),);

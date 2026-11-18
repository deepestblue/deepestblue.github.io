import { transform } from "./transform.js";
import { transliterate } from "saulabhya";


// setUpSelect wires up one script picker: the Tamil one or the Sanskrit one. Itʼs called once for each, with the selectʼs CSS selector and the function that converts that languageʼs text on the page to a given script.
const setUpSelect = (selector, eventHandler,) => {
    const select = document.querySelector(selector,);

    // This is the first of three moments when this function does something. This moment is when the reader changes the select.
    select.addEventListener("change", () => {
        // A browser can refuse storage, for instance when the reader blocks site data, and then choices just arenʼt remembered.
        const store = choice => {
            try {
                localStorage.setItem(selector, choice,);
            } catch {
            }
        };
        // A freshly loaded page is as the empty choice leaves it, so choosing the empty choice reloads the page. Converting it would be harder because we donʼt necessarily know the original script of each part of the page.
        if (! select.value) {
            store(select.value,);
            location.reload();
            return;
        }
        eventHandler(select.value,);
        store(select.value,);
    },);

    // A choice is either a script code such as "Latn" or "Mlym", or "" for "—". The latter means nothing chosen so that every text would stay as written.
    const storedChoice = () => {
        try {
            return localStorage.getItem(selector,);
        } catch {
            return null;
        }
    };
    const apply = choice => {
        select.value = choice;
        eventHandler(choice,);
    };

    // This is the second of three moments when this function does something. This moment is when the browser shows the page again from its back/forward cache, for example when the reader presses Back. As a detail, “pageshow” also fires on an ordinary load, and event.persisted tells the two apart.
    window.addEventListener("pageshow", event => {
        if (! event.persisted) {
            return;
        }
        const choice = storedChoice();
        if (choice) {
            apply(choice,);
            return;
        }
        // The select still shows what this page was last converted to, and a converted page is reloaded to be as written.
        if (! select.value) {
            return;
        }
        location.reload();
    },);

    // This is the third of three moments when this function does something. This moment is when the page loads. This part runs once straight away when setUpSelect is called.
    const choice = storedChoice();
    if (! choice) {
        // A freshly loaded page is already as the empty choice leaves it. The “pageshow” handler canʼt return early like this, because a page shown again may still be converted, and then it has to be reloaded.
        return;
    }
    apply(choice,);
};

// So that the document title follows the page headingʼs text. The title canʼt be changed through transform as it canʼt have HTML lang tags (itʼs always plain text).
const withTitleSync = (eventHandler,) => (script,) => {
    const heading = document.querySelector("[data-id='page-title']",);
    const before = heading.textContent;
    eventHandler(script,);
    document.title = document.title.replace(before, heading.textContent,);
};

setUpSelect(
  "#select-ta",
  withTitleSync(transform.bind(undefined, document.documentElement, transliterate, "ta",),),);
setUpSelect(
  "#select-cls",
  withTitleSync(transform.bind(undefined, document.documentElement, transliterate, "cls",),),);

document.querySelector("#script-pickers",).hidden = false;

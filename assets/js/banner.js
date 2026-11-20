import { respell, transform, } from "./transform.js";
import { toModnSpelling, toTradSpelling, } from "./spelling.js";
import { transliterate, } from "saulabhya";

// setUpSelect wires up one picker. Itʼs called with the selectʼs CSS selector and the function that converts the text on the page to a given choice.
const setUpSelect = (selector, eventHandler,) => {
    const select = document.querySelector(selector,);
    // So that the document title follows the page headingʼs text. The title canʼt be changed through transform as it canʼt have HTML lang tags (itʼs always plain text).
    const convertWithTitle = choice => {
        const heading = document.querySelector("[data-id='page-title']",);
        const before = heading.textContent;
        eventHandler(choice,);
        document.title = document.title.replace(before, heading.textContent,);
    };

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
        convertWithTitle(select.value,);
        store(select.value,);
    },);

    // A choice is the value of one of the selectʼs options, where "" means the text stays as written.
    // Reading the selectʼs value here, rather than at the time when the currentChoice() runs when the value might differ.
    const initialChoice = select.value;
    const currentChoice = () => {
        try {
            return localStorage.getItem(selector,) ?? initialChoice;
        } catch {
            return initialChoice;
        }
    };
    const apply = choice => {
        select.value = choice;
        convertWithTitle(choice,);
    };

    // This is the second of three moments when this function does something. This moment is when the browser shows the page again from its back/forward cache, for example when the reader presses Back. As a detail, “pageshow” also fires on an ordinary load, and event.persisted tells the two apart.
    window.addEventListener("pageshow", event => {
        if (! event.persisted) {
            return;
        }
        // The select still shows what this page was last converted to, so thereʼs nothing to do if thatʼs the choice.
        const choice = currentChoice();
        if (choice === select.value) {
            return;
        }
        if (choice) {
            apply(choice,);
            return;
        }
        // A converted page is reloaded to be as written.
        location.reload();
    },);

    // This is the third of three moments when this function does something. This moment is when the page loads. This part runs once straight away when setUpSelect is called.
    const choice = currentChoice();
    if (! choice) {
        // A freshly loaded page is already as the empty choice leaves it. The “pageshow” handler canʼt return early like this, because a page shown again may still be converted, and then it has to be reloaded.
        return;
    }
    apply(choice,);
};

const toSpelling = { modn: toModnSpelling, trad: toTradSpelling, };

// Respelling works only on Taml, so ta text shown in another script is converted back to Taml, respelled, and converted to the script itʼs shown in again.
const respellTa = spelling => {
    transform(document.documentElement, transliterate, "ta", "Taml",);
    respell(document.documentElement, toSpelling[spelling],);
    transform(document.documentElement, transliterate, "ta", document.querySelector("#select-ta",).value || "Taml",);
};

// The spelling picker is set up first, so that on load ta text is respelled while itʼs still in Taml, instead of being converted back to it and forward again.
setUpSelect("#select-spelling", respellTa,);
setUpSelect("#select-ta", transform.bind(undefined, document.documentElement, transliterate, "ta",),);
setUpSelect("#select-cls", transform.bind(undefined, document.documentElement, transliterate, "cls",),);

document.querySelector("#script-pickers",).hidden = false;

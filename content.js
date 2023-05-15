// AUTO RETRY

const MAX_ERRORS = 2;

const retryBtn = document.querySelector("#again");
const errorsEl = document.querySelector("b#errors");

if (errorsEl) {
    const errorObserver = new MutationObserver((mutations) => {
        if (+mutations[1].addedNodes[0].textContent > MAX_ERRORS) {
            retryBtn.click();
        }
    });

    errorObserver.observe(errorsEl, {
        childList: true
    });
}


// LETTER STYLING

const LEFT_KEYS = "123456qwertasdfgzxcvb";

const RIGHT_KEYS = "7890-=yuiop[]hjkl;'nm,./";

const fieldsEl = document.querySelector(".fields");

if (fieldsEl) {
    const str_in = fieldsEl.querySelector("#str_in");
    str_in.style = "position: relative; color: transparent;"

    function createOverlay() {
        const overlay = document.createElement("div");
        overlay.id = "str_overlay";
        overlay.className = "f2";

        [...str_in.textContent].forEach(letter => {
            const overlayLetter = document.createElement("span");
            overlayLetter.textContent = letter;

            if (LEFT_KEYS.includes(letter)) {
                overlayLetter.style = "color: #2e48c7;"
            } else if (RIGHT_KEYS.includes(letter)) {
                overlayLetter.style = "color: #d24319;"
            } else if (letter === " ") {
                overlayLetter.style = "border-bottom: 2px solid #00000080; height: 70%;"
            }

            overlay.appendChild(overlayLetter);
        })

        overlay.style = "color: black; position: absolute; top: 0; bottom: 0; right: 0; display: flex; align-items: center; justify-content: end; letter-spacing: .025ex;";

        fieldsEl.append(overlay);
    }

    const strObserver = new MutationObserver((mutations) => {
        {
            const prevOverlay = fieldsEl.querySelector("#str_overlay");
            if (!prevOverlay) {
                createOverlay();
            } else if (mutations.some(m => m.target === str_in && m.addedNodes.length > 0)) {
                fieldsEl.removeChild(prevOverlay);
                createOverlay();
            }
        }
    })
    
    strObserver.observe(fieldsEl, {
        subtree: true,
        childList: true
    })
}


// starting page button keyboard interactions fix
const submitBtn = document.querySelector(".submit");

document.body.addEventListener("keydown", (e) => {
    if ((e.code === "Space" || e.code === "Enter") && e.altKey === false && e.ctrlKey === false && e.metaKey === false && e.shiftKey === false) {
        submitBtn?.click();
    }
}, { once: true })


// SPEED OVERFLOW FIX

const speedB = document.querySelector("#speed");
speedB && (speedB.style = "max-width: 2.4em; text-overflow: clip; overflow: hidden;");

// AUTOFOCUS

const inputField = document.querySelector("#keyboard");
if (inputField) {
    window.addEventListener('focus', () => {
        setTimeout(() => {
            inputField.focus();
        }, 10);
    });
}
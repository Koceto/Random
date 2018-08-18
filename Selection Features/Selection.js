// insert key press event listener
function addEventListener() {
    document.addEventListener("keypress", function(event) {
        eventHandler(event);
    });
}

// Keys to look for
// If any of the below keys is pressed, it will be inserted before and after the word
// To add more keys just list them below in format "<keyCode>: a => `<key>${a}<key>`," (make sure you escape special symbols)
var keys = {
    42: key => `*${key}*`,
    40: key => `(${key})`,
    123: key => `{${key}}`,
    91: key => `[${key}]`,
    39: key => `'${key}'`,
    34: key => `"${key}"`,
    96: key => `\`${key}\``,
};

// Main Logic

// Returns the html element in which the selected text is
function getActive() {
    return document.activeElement;
}

// Receives the html element and the key replacement function
// Find the selection boundaries and inserts the replacement
function replaceSelectedText(element, keyReplaceFunc) {
    // get the start and end index of the highlighted text
    let range = {
        start: element.selectionStart,
        end: element.selectionEnd
    };
    let text = element.value;

    let selectedText = text.slice(range.start, range.end);
    let modifiedText = keyReplaceFunc(selectedText);

    let beforeText = text.slice(0, range.start);
    let afterText = text.slice(range.end);

    let replacement = `${beforeText}${modifiedText}${afterText}`;

    element.value = replacement;

    // Select the modified text
    element.selectionStart = range.start + 1;
    element.selectionEnd = range.end + 1;
}

// event handler
function eventHandler(event) {
    // check if any text is selected
    // if there is no selection then the key should NOT be inserted and the event is ignored
    if (window.getSelection().toString().length > 0) {
        let element = getActive();
        let elementTagName = element.tagName.toLowerCase();

        // check if the text inside the html element could be modifyed
        // stops insertion of the key when the text is NOT supposed to be modified
        if (elementTagName != 'textarea') {
            return;
        }
        let keyFunc = keys[event.keyCode];

        // check if the pressed key is one of the predetermined keys
        // if true continue with the insertion of the key
        if (keyFunc != undefined) {
            replaceSelectedText(element, keyFunc);

            // prevent the actual key press. Otherwise it would remove the replaced items
            event.preventDefault();
        }
    }
}

// Initial StartUp function
// Insert event listener
(function() {
    addEventListener();
})();

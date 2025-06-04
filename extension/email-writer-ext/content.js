console.log("Email Writer Extension - Content Script Loaded"); //Message to confirm that the extension's content script has been loaded and is running.

function createAIButton() { // Function to create the AI Reply button, which looks similar to the Gmail's Send button.
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = "AI Reply";
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;

}

function getEmailContent() {//Finding the main content of the email using various selectors to ensure compatibility with different Gmail layouts.
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]',
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if(content){
            return content.innerText.trim();//Returns the content of the email, removing any leading or trailing whitespace.
        }
        return '';//Returns an empty string if no content is found.
    }
}
function findComposeToolbar() {//Compose toolbar is the area where the reply button will be injected.
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if(toolbar){
            return toolbar;//Returns the toolbar if found.
        }
        return null;
    }
}

function injectButton(){
    const existingButton = document.querySelector('.ai-reply-button');// Removes any existing AI Reply button to avoid duplicates.
    if(existingButton) existingButton.remove();
    const existingDropdown = document.querySelector('.ai-tone-dropdown');// Removes any existing tone dropdown to avoid duplicates.
    if(existingDropdown) existingDropdown.remove();

    const toolbar = findComposeToolbar();
    if(!toolbar){
        console.log("Toolbar not found");
        return;
    }
    console.log("Toolbar found");

   
    const dropdown = document.createElement('select');
    dropdown.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3 ai-tone-dropdown';
    dropdown.style.marginRight = '8px';
    dropdown.style.height = '36px';
    dropdown.style.fontSize = '14px';
    dropdown.style.cursor = 'pointer';
    ['professional', 'friendly', 'casual', 'empathetic', 'concise', 'formal'].forEach(tone => {
        const option = document.createElement('option');
        option.value = tone;
        option.textContent = tone.charAt(0).toUpperCase() + tone.slice(1);
        dropdown.appendChild(option);
    });

    
    const button = createAIButton();
    button.classList.add('ai-reply-button');
    button.addEventListener('click', async() => {
        try{
            button.innerHTML = "Generating...";
            button.disabled  = true;

            const emailContent = getEmailContent();
            const selectedTone = dropdown.value;
            const response = await fetch('https://ai-email-reply-s2aj.onrender.com/api/email/generate',{

                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    "emailContent" : emailContent,
                    tone : selectedTone,
                }),
            });
            if(!response.ok){
                throw new Error("API request failed");
            }
            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
            if(composeBox){
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            }
            else{
                console.error("Compose box not found");
            }
        }
        catch(error){
            console.error(error);
            alert("Error generating reply");
        }
        finally{
            button.innerHTML = "AI Reply";
            button.disabled = false;
        }
    });

    // Insert dropdown and button
    toolbar.insertBefore(dropdown, toolbar.firstChild);
    toolbar.insertBefore(button, dropdown.nextSibling);
}

const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations) {
       const addedNodes = Array.from(mutation.addedNodes);
       const hasComposeElement = addedNodes.some(node =>
              node.nodeType === Node.ELEMENT_NODE &&
              (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
       );

       if (hasComposeElement){
        console.log("Compose element detected");
        setTimeout(injectButton, 1000);
       }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
})
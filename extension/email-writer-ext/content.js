console.log("Email Writer Extension - Content Script Loaded");

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = "AI Reply";
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;

}

function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]',
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if(content){
            return content.innerText.trim();
        }
        return '';
    }
}
function findComposeToolbar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if(toolbar){
            return toolbar;
        }
        return null;
    }
}

// function injectButton(){
//     const existingButton = document.querySelector('.ai-reply-button');
//     if(existingButton) existingButton.remove();

//     const toolbar = findComposeToolbar();
//     if(!toolbar){
//         console.log("Toolbar not found");
//         return;
//     }
//     console.log("Toolbar found");
//     const button = createAIButton();
//     button.classList.add('ai-reply-button');
//     button.addEventListener('click', async() => {
//         try{
//             button.innerHTML = "Generating...";
//             button.disabled  = true;

//             const emailContent = getEmailContent();
//             const response = await fetch('http://localhost:8080/api/email/generate',{
//                 method:'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ 
//                     "emailContent" : emailContent,
//                     tone : "professional",
//                 }),
                
//             });
//             if(!response.ok){
//                 throw new Error("API request failed");
//             }
//             const generatedReply = await response.text();
//             const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
//             if(composeBox){
//                 composeBox.focus();
//                 document.execCommand('insertText', false, generatedReply);
                
//             }
//             else{
//                 console.error("Compose box not found");
//             }
//         }
//         catch(error){
//             console.error(error);
//             alert("Error generating reply");
//         }
//         finally{
//             button.innerHTML = "AI Reply";
//             button.disabled = false;
//         }

//     });

//     toolbar.insertBefore(button, toolbar.firstChild);
// }
function injectButton(){
    const existingButton = document.querySelector('.ai-reply-button');
    if(existingButton) existingButton.remove();
    const existingDropdown = document.querySelector('.ai-tone-dropdown');
    if(existingDropdown) existingDropdown.remove();

    const toolbar = findComposeToolbar();
    if(!toolbar){
        console.log("Toolbar not found");
        return;
    }
    console.log("Toolbar found");

    // // Create dropdown
    // const dropdown = document.createElement('select');
    // dropdown.className = 'ai-tone-dropdown';
    // dropdown.style.marginRight = '8px';
    // ['professional', 'friendly', 'casual', 'empathetic', 'concise', 'formal'].forEach(tone => {
    //     const option = document.createElement('option');
    //     option.value = tone;
    //     option.textContent = tone.charAt(0).toUpperCase() + tone.slice(1);
    //     dropdown.appendChild(option);
    // });
    // Create styled dropdown (like AI Reply button)
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

    // Create button
    const button = createAIButton();
    button.classList.add('ai-reply-button');
    button.addEventListener('click', async() => {
        try{
            button.innerHTML = "Generating...";
            button.disabled  = true;

            const emailContent = getEmailContent();
            const selectedTone = dropdown.value;
            //const response = await fetch('http://localhost:8080/api/email/generate',{
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
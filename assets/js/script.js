document.addEventListener('DOMContentLoaded', () => {
    const promptForm = document.getElementById('prompt-form');
    const promptInput = document.getElementById('prompt-input');
    const chatContainer = document.getElementById('chat-container');
    const submitButton = promptForm.querySelector('button');

    // Make the textarea auto-resize as you type
    promptInput.addEventListener('input', () => {
        promptInput.style.height = 'auto';
        promptInput.style.height = `${promptInput.scrollHeight}px`;
    });

    // Handle form submission
    promptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userPrompt = promptInput.value.trim();

        if (userPrompt) {
            addMessage(userPrompt, 'user');
            promptInput.value = '';
            promptInput.style.height = 'auto'; // Reset height after sending
            
            // Disable form while Grog is "thinking" to prevent multiple submissions
            submitButton.disabled = true;
            promptInput.disabled = true;

            // Get Grog's reply after a short delay
            setTimeout(() => getGrogResponse(userPrompt), 1000 + Math.random() * 1000);
        }
    });

    // Allow submitting with "Enter" but create a new line with "Shift+Enter"
    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            promptForm.requestSubmit();
        }
    });

    /**
     * Adds a message bubble to the chat container.
     * @param {string} text The message content.
     * @param {string} sender 'user' or 'grog'.
     * @returns {HTMLElement} The created message element.
     */
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatContainer.appendChild(messageElement);
        scrollToBottom();
        return messageElement;
    }

    /**
     * Simulates Grog thinking and then providing a response.
     * @param {string} userPrompt The original prompt from the user.
     */
    function getGrogResponse(userPrompt) {
        // Add a "thinking" bubble first for better UX
        const thinkingMessage = addMessage('...', 'grog');
        thinkingMessage.classList.add('thinking');

        const imageKeywords = ['image', 'photo', 'picture', 'draw', 'show', 'generate', 'see'];
        const wantsImage = imageKeywords.some(keyword => userPrompt.toLowerCase().includes(keyword));

        // After another short delay, replace "..." with the actual reply
        setTimeout(() => {
            if (wantsImage) {
                // User asked for an image, so display the frog
                thinkingMessage.textContent = ''; // Clear the "..."
                thinkingMessage.classList.add('has-image'); // Add class for special styling

                const img = document.createElement('img');
                img.src = 'assets/img/frog.png';
                img.alt = 'A ribbiting image from Grog';
                img.className = 'grog-image';
                
                // Add a fallback in case the image can't be found
                img.onerror = () => {
                    thinkingMessage.classList.remove('has-image');
                    thinkingMessage.textContent = 'ribbit... (image not found)';
                };

                thinkingMessage.appendChild(img);
            } else {
                // Default "ribbit" text response
                const ribbitCount = Math.floor(Math.random() * 10) + 1; // 1 to 10 ribbits
                const grogReply = Array(ribbitCount).fill('ribbit').join(' ');
                thinkingMessage.textContent = grogReply;
            }

            thinkingMessage.classList.remove('thinking');
            scrollToBottom();

            // Re-enable the form
            submitButton.disabled = false;
            promptInput.disabled = false;
            promptInput.focus();
        }, 500 + Math.random() * 800);
    }

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    /**
     * Display a welcome message from Grog on page load.
     */
    function showWelcomeMessage() {
        setTimeout(() => {
            addMessage('ribbit?', 'grog');
        }, 500);
    }

    showWelcomeMessage();
});
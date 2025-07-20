import { addMessage, scrollToBottom, toggleFormState } from './ui.js';

const IMAGE_KEYWORDS = ['image', 'photo', 'picture', 'draw', 'show', 'generate', 'see'];
const FROG_IMAGE_PATH = 'assets/img/frog.png';

/**
 * Creates and appends a frog image to a message element.
 * @param {HTMLElement} messageElement The parent message element.
 */
function displayImage(messageElement) {
    messageElement.textContent = ''; // Clear the "..."
    messageElement.classList.add('has-image'); // Add class for special styling

    const img = document.createElement('img');
    img.src = FROG_IMAGE_PATH;
    img.alt = 'A ribbiting image from Grog';
    img.className = 'grog-image';

    // Add a fallback in case the image can't be found
    img.onerror = () => {
        messageElement.classList.remove('has-image');
        messageElement.textContent = 'ribbit... (image not found)';
    };

    messageElement.appendChild(img);
}

/**
 * Generates a text response from Grog.
 * @returns {string} Grog's text reply.
 */
function getTextResponse() {
    const ribbitCount = Math.floor(Math.random() * 10) + 1; // 1 to 10 ribbits
    return Array(ribbitCount).fill('ribbit').join(' ');
}

/**
 * Simulates Grog thinking and then providing a response.
 * @param {string} userPrompt The original prompt from the user.
 */
export function getGrogResponse(userPrompt) {
    const thinkingMessage = addMessage('...', 'grog');
    thinkingMessage.classList.add('thinking');

    const wantsImage = IMAGE_KEYWORDS.some(keyword => userPrompt.toLowerCase().includes(keyword));

    setTimeout(() => {
        if (wantsImage) {
            displayImage(thinkingMessage);
        } else {
            thinkingMessage.textContent = getTextResponse();
        }
        thinkingMessage.classList.remove('thinking');
        scrollToBottom();
        toggleFormState(false); // Re-enable the form
    }, 500 + Math.random() * 800);
}
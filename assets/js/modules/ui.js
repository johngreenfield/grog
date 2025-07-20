import { chatContainer, submitButton, promptInput } from './dom.js';

/**
 * Scrolls the chat container to the bottom.
 */
export function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

/**
 * Adds a message bubble to the chat container.
 * @param {string} text The message content.
 * @param {string} sender 'user' or 'grog'.
 * @returns {HTMLElement} The created message element.
 */
export function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = text;
    chatContainer.appendChild(messageElement);
    scrollToBottom();
    return messageElement;
}

/**
 * Toggles the disabled state of the form inputs.
 * @param {boolean} disabled - True to disable, false to enable.
 */
export function toggleFormState(disabled) {
    submitButton.disabled = disabled;
    promptInput.disabled = disabled;
    if (!disabled) {
        promptInput.focus();
    }
}

/**
 * Resets the prompt input to its default state.
 */
export function resetPromptInput() {
    promptInput.value = '';
    promptInput.style.height = 'auto'; // Reset height
}

/**
 * Clears all messages from the chat container.
 */
export function clearChat() {
    // More performant than setting innerHTML to an empty string.
    while (chatContainer.firstChild) {
        chatContainer.removeChild(chatContainer.firstChild);
    }
}

/**
 * Display a welcome message from Grog on page load.
 */
export function showWelcomeMessage() {
    setTimeout(() => {
        addMessage('ribbit?', 'grog');
    }, 500);
}
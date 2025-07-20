import { promptForm, promptInput } from './modules/dom.js';
import { addMessage, toggleFormState, resetPromptInput, showWelcomeMessage } from './modules/ui.js';
import { getGrogResponse } from './modules/grog.js';
import { initializeKeyboardShortcuts } from './modules/keyboard.js';

/**
 * Handles the form submission.
 * @param {Event} e The submit event.
 */
function handleFormSubmit(e) {
    e.preventDefault();
    const userPrompt = promptInput.value.trim();

    if (userPrompt) {
        addMessage(userPrompt, 'user');
        resetPromptInput();

        // Disable form while Grog is "thinking"
        toggleFormState(true);

        // Get Grog's reply after a short delay
        setTimeout(() => getGrogResponse(userPrompt), 1000 + Math.random() * 1000);
    }
}

/**
 * Handles keydown events on the prompt input.
 * Submits on "Enter" but not "Shift+Enter".
 * @param {KeyboardEvent} e The keydown event.
 */
function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        promptForm.requestSubmit();
    }
}

/**
 * Initializes the application by setting up event listeners.
 */
function initialize() {
    // Make the textarea auto-resize as you type
    promptInput.addEventListener('input', () => {
        promptInput.style.height = 'auto';
        promptInput.style.height = `${promptInput.scrollHeight}px`;
    });
    promptForm.addEventListener('submit', handleFormSubmit);
    promptInput.addEventListener('keydown', handleKeydown);
    showWelcomeMessage();
    initializeKeyboardShortcuts();
}

// Start the application once the DOM is ready
document.addEventListener('DOMContentLoaded', initialize);
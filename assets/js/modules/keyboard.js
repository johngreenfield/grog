import { promptInput } from './dom.js';
import { clearChat, showWelcomeMessage } from './ui.js';

/**
 * Handles global keydown events for shortcuts.
 * @param {KeyboardEvent} e The keydown event.
 */
function handleShortcuts(e) {
    // A check to see if the user is currently typing in an input field.
    const isTyping = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';

    // Shortcut: '/' to focus the prompt input (when not already typing).
    if (e.key === '/' && !isTyping) {
        e.preventDefault();
        promptInput.focus();
    }

    // Shortcut: 'Ctrl + L' to clear the chat history.
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        if (confirm('Are you sure you want to clear the chat history?')) {
            clearChat();
            // Show the initial welcome message again after clearing.
            showWelcomeMessage();
        }
    }
}

/**
 * Sets up the global keyboard shortcut listener.
 */
export function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', handleShortcuts);
}
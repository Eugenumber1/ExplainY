var _a;
export function updateApiKey(input) {
    const apiKey = input.value;
    chrome.storage.sync.set({ apiKey }, () => {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = 'API key saved!';
            console.log(messageElement.textContent);
        }
    });
}
// Attach event listeners
(_a = document.getElementById('saveApiKey')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const inputElement = document.getElementById('apiKey');
    updateApiKey(inputElement);
});

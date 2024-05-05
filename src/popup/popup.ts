export function updateApiKey(input: HTMLInputElement): void {
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
document.getElementById('saveApiKey')?.addEventListener('click', () => {
  const inputElement = document.getElementById('apiKey') as HTMLInputElement;
  updateApiKey(inputElement);
});
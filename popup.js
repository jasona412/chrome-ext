const toggleButton = document.getElementById('toggleExtension');

chrome.storage.local.get(['enabled'], (result) => {
  toggleButton.textContent = result.enabled ? 'Disable Extension' : 'Enable Extension';
});

toggleButton.addEventListener('click', () => {
  chrome.storage.local.get(['enabled'], (result) => {
    const newEnabledState = !result.enabled;
    chrome.storage.local.set({ enabled: newEnabledState });
    toggleButton.textContent = newEnabledState ? 'Disable Extension' : 'Enable Extension';

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { enabled: newEnabledState });
    });
  });
});
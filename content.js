// Helper function to remove unwanted styles and attributes
function cleanElement(element) {
    element.removeAttribute('style');
    const attributes = Array.from(element.attributes);
    attributes.forEach((attribute) => {
      if (attribute.name.startsWith('data-')) {
        element.removeAttribute(attribute.name);
      }
    });
  }
  
  // Function to handle pasting event
  function handlePaste(event) {
    event.preventDefault();
  
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('text/html');
  
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = pastedData;
  
    tempDiv.querySelectorAll('*').forEach((element) => {
      cleanElement(element);
    });
  
    const cleanedHTML = tempDiv.innerHTML;
    document.execCommand('insertHTML', false, cleanedHTML);
  }
  
  document.addEventListener('paste', handlePaste);
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.hasOwnProperty('enabled')) {
      if (message.enabled) {
        document.addEventListener('paste', handlePaste);
      } else {
        document.removeEventListener('paste', handlePaste);
      }
    }
  });
  
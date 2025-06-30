// Background script for Quick URL Copy extension (Firefox Manifest V2)

// Listen for the keyboard shortcut command
browser.commands.onCommand.addListener(async (command) => {
  if (command === "copy-url") {
    try {
      // Get the active tab in the current window
      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true
      });
      
      if (tabs.length > 0) {
        const currentTab = tabs[0];
        const url = currentTab.url;
        
        // Copy URL to clipboard using content script with better error handling
        try {
          await browser.tabs.executeScript(currentTab.id, {
            code: `
              (async function() {
                const url = '${url.replace(/'/g, "\\'")}';
                
                try {
                  // Method 1: Try modern Clipboard API
                  if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(url);
                    return true;
                  }
                } catch (e) {
                  console.log('Clipboard API failed, trying fallback...');
                }
                
                try {
                  // Method 2: Fallback using execCommand
                  const textArea = document.createElement('textarea');
                  textArea.value = url;
                  
                  // Make textarea invisible but focusable
                  textArea.style.position = 'fixed';
                  textArea.style.top = '-9999px';
                  textArea.style.left = '-9999px';
                  textArea.style.opacity = '0';
                  textArea.style.pointerEvents = 'none';
                  textArea.setAttribute('readonly', '');
                  
                  document.body.appendChild(textArea);
                  
                  // Select and copy
                  textArea.select();
                  textArea.setSelectionRange(0, 99999); // For mobile devices
                  
                  const successful = document.execCommand('copy');
                  document.body.removeChild(textArea);
                  
                  if (successful) {
                    return true;
                  } else {
                    throw new Error('execCommand failed');
                  }
                } catch (e) {
                  console.error('All clipboard methods failed:', e);
                  return false;
                }
              })();
            `
          });
          
          // Show success notification
          browser.notifications.create({
            type: 'basic',
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMDA2NmNjIi8+CjxjaXJjbGUgY3g9IjE4IiBjeT0iMjQiIHI9IjYiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjI0IiByPSI2IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KPGxpbmUgeDE9IjIwIiB5MT0iMjQiIHgyPSIyOCIgeTI9IjI0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+',
            title: 'URL Copied ✓',
            message: url.length > 50 ? url.substring(0, 47) + '...' : url
          });
          
          console.log('URL copied to clipboard:', url);
          
        } catch (scriptError) {
          console.error('Script injection failed:', scriptError);
          
          // Show error notification
          browser.notifications.create({
            type: 'basic',
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjZGMzNTQ1Ii8+Cjx0ZXh0IHg9IjI0IiB5PSIzMiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4hPC90ZXh0Pgo8L3N2Zz4K',
            title: 'Copy Failed',
            message: 'Could not copy URL. Try selecting the address bar manually.'
          });
        }
      }
    } catch (error) {
      console.error('Error copying URL:', error);
    }
  }
});
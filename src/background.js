chrome.commands.onCommand.addListener(function(command) {
  if (command === "open_popup") {
    chrome.windows.create({ url: chrome.runtime.getURL('/dir/popup.html'), type: 'popup' });
  }
});
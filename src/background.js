let countdown;
let countdownInterval;

chrome.commands.onCommand.addListener(function (command) {
  if (command === "open_popup") {
    chrome.windows.create({ url: chrome.runtime.getURL('/dir/popup.html'), type: 'popup', width: 300, height: 500});
  }
});

/* timer logic */
function startOrAddToCountdown(secondsToAdd) {
  // If a countdown is already running, just add seconds to the current countdown
  if (countdownInterval) {
    countdown += secondsToAdd;
  } else {
    // If no countdown is running, start a new one with the specified seconds
    countdown = secondsToAdd;
    clearInterval(countdownInterval); // Clear any existing interval just to be safe
    countdownInterval = setInterval(() => {
      if (countdown > 0) {
        countdown--;
        // Optionally, store the remaining time in chrome.storage.local
        chrome.storage.local.set({ countdown: countdown });
      } else {
        clearInterval(countdownInterval);
        countdownInterval = null; // Clear the interval variable
        // Reload the current tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.reload(tabs[0].id);
        });
      }
    }, 1000);
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command === "startTimer" || request.command === "addToTimer") {
    // Parse the duration or seconds to add from the request
    let secondsToAdd = parseInt(request.duration) || parseInt(request.seconds) || 0;
    startOrAddToCountdown(secondsToAdd);
  }
});
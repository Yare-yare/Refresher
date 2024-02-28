console.log("Content script has been injected and is running.");
document.addEventListener("DOMContentLoaded", function () {
  const onOrOff = document.getElementById("onOrOff");
  const toggleWord = document.getElementById("toggleWord");
  const question = document.getElementById("question");
  const refreshButton = document.getElementById("refreshButton");
  const duration = document.getElementById("duration");
  const countdownDisplay = document.getElementById("countdownDisplay");
  const fiveSec = document.getElementById('fiveSec');
  const tenSec = document.getElementById('tenSec');
  const chatParent = document.getElementById('chatParent');
  const toggle = document.getElementById('toggle')

  let countdownInterval;

  const showElement = (element, displayStyle) => {
    element.style.display = displayStyle;
  };

  const hideElement = (element) => {
    element.style.display = "none";
  };

  const showAlert = (message) => {
    alert(message);
  };

  /* button timer logic */
  fiveSec.addEventListener('click', () => {
    // Send a message to the background script to add 5 seconds to the timer
    chrome.runtime.sendMessage({ command: "addToTimer", seconds: 5 });
  });
  
  tenSec.addEventListener('click', () => {
    // Send a message to the background script to add 10 seconds to the timer
    chrome.runtime.sendMessage({ command: "addToTimer", seconds: 10 });
  });
  

  onOrOff.addEventListener("click", () => {
    if (!toggle.checked) {
      showElement(question, "block");
      hideElement(toggleWord);
      chatParent.style.display = "flex";
      chatParent.style.alignItems = "center";
      chatParent.style.justifyContent = "center";
      chatParent.style.flexDirection = "column";
    } else {
      hideElement(chatParent);
      hideElement(question);
      showElement(toggleWord, "block");
      hideElement(countdownDisplay);
    }
  });

  refreshButton.addEventListener("click", () => {
    // Send a message to the background script to start the timer
    chrome.runtime.sendMessage({ command: "startTimer", duration: duration.value });
  });
});

/* chat gpt shortcut */
function keyListener() {
  document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'y') {
      chrome.runtime.sendMessage({ message: "open_window" });
    }
  });
}
keyListener()
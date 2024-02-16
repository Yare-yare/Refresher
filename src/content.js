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

  let countdownStarted = false;
  let countdown = 0;

  const startCountdown = (additionalTime = 0) => {
    clearInterval(countdownInterval);

    let durationValue = duration.value ? parseInt(duration.value) : 0;

    if (isNaN(durationValue) || durationValue < 0) {
      showAlert("Please enter a valid duration greater than 0.");
      return;
    }

    countdown = durationValue + additionalTime;

    countdownValue.textContent = countdown;
    showElement(countdownDisplay, "block");

    countdownInterval = setInterval(() => {
      if (countdown > 0) {
        countdown--;
        countdownValue.textContent = countdown;
      } else {
        clearInterval(countdownInterval);
        countdownStarted = false;
        // Reload the current tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.reload(tabs[0].id);
        });
      }
    }, 1000);

    countdownStarted = true;
  };

  fiveSec.addEventListener('click', () => {
    if (!countdownStarted) {
      countdown = parseInt(duration.value);
      startCountdown();
    }
    clearInterval(countdown);
    countdown += 5;
  });

  tenSec.addEventListener('click', () => {
    if (!countdownStarted) {
      countdown = parseInt(duration.value);
      startCountdown();
    }
    clearInterval(countdown);
    countdown += 10;
  });

  onOrOff.addEventListener("click", () => {
    if (toggleWord.style.display === "block") {
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
    startCountdown();
  });
});

/* chat gpt shortcut */
function keyListener() {
  document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'y') {
      chrome.runtime.sendMessage({message: "open_window"});
    }
  });
}
keyListener()


/* chat window */
/* const apiKey = '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';
const prompt = 'Once upon a time, ';
const apiUrl = 'https://api.openai.com/v1/chat/completions'

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    "model": "gpt-3.5-turbo-instruct-0914",
    "prompt": "Who is Talha bin Ubaidillah",
    "max_tokens": 50,
    "temperature": 0,
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Response from OpenAI API:', data);
    // Handle the response data here
  })
  .catch(error => {
    console.error('Error:', error);
  });
 */
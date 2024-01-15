const onOrOff = document.getElementById("onOrOff");
const toggleWord = document.getElementById("toggleWord");
const question = document.getElementById("question");
const refreshButton = document.getElementById("refreshButton");
const duration = document.getElementById("duration");
const countdownDisplay = document.getElementById("countdownDisplay");
const fiveSec = document.getElementById('fiveSec')
const tenSec = document.getElementById('tenSec')

let clickCount = 0;
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
  clearInterval(countdownInterval)

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
      showAlert("Countdown completed!");
      countdownStarted = false;
    }

  }, 1000);

  countdownStarted = true;
};

fiveSec.addEventListener('click', () => {
  if (!countdownStarted) {
    countdown = parseInt(duration.value);
    startCountdown();
  }
  clearInterval(countdown)
  countdown += 5;
});

tenSec.addEventListener('click', () => {
  if (!countdownStarted) {
    countdown = parseInt(duration.value);
    startCountdown();
  }
  clearInterval(countdown)
  countdown += 10;
});

onOrOff.addEventListener("click", () => {
  if (toggleWord.style.display === "block") {
    showElement(question, "block");
    hideElement(toggleWord);
  } else {
    hideElement(question);
    showElement(toggleWord, "block");
    hideElement(countdownDisplay);
  }
})

refreshButton.addEventListener("click", () => {
  startCountdown();
});
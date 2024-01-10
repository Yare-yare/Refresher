const button = document.getElementById('bruh');
const onOrOff = document.getElementById("onOrOff")
const toggleWord = document.getElementById("toggleWord")
const question = document.getElementById("question")
const refreshButton = document.getElementById("refreshButton")
const duration = document.getElementById("duration")
const countdownDisplay = document.getElementById("countdownDisplay") // Define countdownDisplay once

onOrOff.addEventListener("click", () => {
  if (toggleWord.style.display === "block") {
    // Show question content, hide toggleWord
    question.style.display = "block"
    toggleWord.style.display = "none"
  }
  else {
    // Hide question content, show toggleWord
    question.style.display = "none"
    toggleWord.style.display = "block"
    countdownDisplay.style.display = "none"
  }
});

refreshButton.addEventListener("click", () => {
  
  countdownDisplay.style.display = "block"

  const countdownValue = document.getElementById('countdownValue'); // Use a different variable name to avoid confusion

  const durationValue = parseInt(duration.value);

  if (isNaN(durationValue) || durationValue <= 0) {
    alert('Please enter a valid duration greater than 0.');
    return;
  }

  let countdown = durationValue;
  countdownValue.textContent = countdown; // Display initial countdown value

  const countdownInterval = setInterval(() => {
    if (countdown > 0) {
      countdown--;
      countdownValue.textContent = countdown; // Update countdown value on the page
    } else {
      clearInterval(countdownInterval);
      alert('Countdown completed!');
    }
  }, 1000);
});

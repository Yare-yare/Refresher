const button = document.getElementById('bruh');
const onOrOff = document.getElementById("onOrOff")
const toggleWord = document.getElementById("toggleWord")
const question = document.getElementById("question")
const timer_animatable = document.getElementById("timer animatable")

onOrOff.addEventListener("click", () => {
  if (toggleWord.style.display === "block") {
    // Show question, hide toggleWord
    question.style.display = "block"
    toggleWord.style.display = "none"
  }
  else {
    // Hide question, show toggleWord
    question.style.display = "none"
    toggleWord.style.display = "block"
  }
});

function startTimer() {
    const durationInput = document.getElementById('duration');
    let timeLeft = parseInt(durationInput.value);
  
    if (isNaN(timeLeft) || timeLeft <= 0) {
      alert('Please enter a valid duration greater than 0.');
      return;
    }
  
    let timer = document.getElementById('timeLeft');
  
    function isTimeLeft() {
      return timeLeft > -1;
    }
  
    function runTimer(timerElement) {
      const timerCircle = timerElement.querySelector('svg > circle + circle');
      timerElement.classList.add('animatable');
      timerCircle.style.strokeDashoffset = 1;
  
      let countdownTimer = setInterval(function(){
        if(isTimeLeft()){
          const timeRemaining = timeLeft--;
          const normalizedTime = (durationInput.value - timeRemaining) / durationInput.value;
          timerCircle.style.strokeDashoffset = normalizedTime;
          timer.innerHTML = timeRemaining;
        } else {
          clearInterval(countdownTimer);
          timerElement.classList.remove('animatable');
        }  
      }, 1000);
    }
  
    runTimer(document.querySelector('.timer'));
  }
  
  document.getElementById('startBtn').addEventListener('click', startTimer);
  
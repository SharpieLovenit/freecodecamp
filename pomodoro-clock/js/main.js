/*eslint-env jquery*/
/*eslint-disable no-console */

$(document).ready(function () {
   
    // Initialize default Pomodoro time to 25 min
    // Can be updated by user with +/- buttons
    var pomodoroSec = 25*60;

    var remainingSec;
    var timerOn = false;
    var x; // setInterval

    updateTimer(pomodoroSec);
 
    $('.play_stop').click(function () {
        if (timerOn) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    function startTimer() {
        timerOn = true;
        remainingSec = pomodoroSec;
        $('.play_stop span').text('stop');
        x = setInterval(function(){
            remainingSec--;
            updateTimer(remainingSec);
            if (remainingSec == 0) clearInterval(x);
        }, 1000);
    }

    function stopTimer() {
        timerOn = false;
        $('.play_stop span').text('play_arrow');
        clearInterval(x);
        updateTimer(pomodoroSec);
    }

    function updateTimer(seconds) {
        var min = Math.floor(seconds/60);
        var sec = '' + seconds % 60;
        $('.countdown').html(min+':'+sec.padStart(2,'0'));
    }
});
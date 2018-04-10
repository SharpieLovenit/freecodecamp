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

    $('.plus').on('click', function () {
        pomodoroSec += 60;
        updateTimer(pomodoroSec);
    });

    $('.min').on('click', function () {
        pomodoroSec -= 60;
        updateTimer(pomodoroSec);
    });
 
    $('.play_stop').on('click', function () {
        if (timerOn) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    function startTimer() {
        timerOn = true;
        remainingSec = pomodoroSec;

        // disable plus/min buttons
        $('.plus, .min').attr('disabled',true);
        $('.material-icons.plusmin').css('opacity', '0.26');

        // Change start_stop button span icon to stop icon
        $('.play_stop span').text('stop');

        // Start Interval
        x = setInterval(function(){
            remainingSec--;
            updateTimer(remainingSec);
            if (remainingSec == 0) clearInterval(x);
        }, 1000);
    }

    function stopTimer() {
        timerOn = false;

        // enable plus/min buttons
        $('.plus, .min').attr('disabled',false);
        $('.material-icons.plusmin').css('opacity', '1');

        // Change start_stop button span icon back to play icon
        $('.play_stop span').text('play_arrow');

        // Disable Interval
        clearInterval(x);

        // Reset timer back to start value
        updateTimer(pomodoroSec);
    }

    function updateTimer(seconds) {
        var min = Math.floor(seconds/60);
        var sec = '' + seconds % 60;
        $('.countdown').html(min+':'+sec.padStart(2,'0'));
    }
});
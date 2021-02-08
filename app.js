const $startButton = document.getElementById("start");
var staringMinutes = 0;
var startingSeconds = 0;
var myTimer;


// Start button
const startTimer = () => {
    $startButton.addEventListener('click', handleClickStartButton, true);
    counter.style.display = ""
};

// Plays audio for all the buttons 
const playAudio = () => {
    const $startSound = document.getElementById("audio");
    $startSound.play();
};

// Play audio for when timer runs out
const timerSound = () => {
    const gong = document.getElementById("timer");
    gong.play();
}

// What happens after start button is clicked 
const handleClickStartButton = () => {
    $startButton.style.display = "none";

    const $pausePlay = document.getElementsByClassName("pausePlay");
    const $pauseButton = document.getElementById("pause");
    const $playButton = document.getElementById('play');
    $playButton.disabled = true;
    for (var i = 0; i < $pausePlay.length; i++) {
        $pausePlay[i].style.display = "block";
    }
    $pauseButton.addEventListener('click', handleClickPauseButton);
    $playButton.addEventListener('click', handleClickPlayButton);
    initApp();
    playAudio();

};
// Countdown function. After timer hits 0, the 'counter turns red, and gong sounds through timerSound(), and options() runs
const countDown = ({ minutes, seconds }) => {
    if (!minutes && seconds === '00') {
        const timer = document.getElementById('counter');

        options();
        timerSound();
        return;
    }
    // Sets timer. Subtracts the minutes set by 1
    myTimer = setTimeout(() => {
        if (seconds === '00') {
            minutes = minutes - 1;
            seconds = 60;
        }
        // Subtracts the seconds
        seconds = seconds - 1;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        document.getElementById('minutes').innerHTML = minutes + " :";
        document.getElementById('seconds').innerHTML = seconds;
console.log(myTimer);
        staringMinutes = minutes;
        startingSeconds = seconds;
        countDown({ minutes, seconds });
    }, 1000);
};

// Function that allows the CountDown to run
const initApp = () => {
    staringMinutes = 25;
    startingSeconds = 01;
    countDown({
        minutes: staringMinutes,
        seconds: startingSeconds
    });
};

// Gets rid of the pausePlay class and displays the middlebuttons
const options = () => {
    const $pausePlay = document.getElementsByClassName("pausePlay");
    const $middleButtons = document.getElementsByClassName("middleButtons");

    for (var i = 0; i < $pausePlay.length; i++) {
        $pausePlay[i].style.display = "none";
    }
    for (var i = 0; i < $middleButtons.length; i++) {
        $middleButtons[i].style.display = "block";
    }

    const fiveMinButton = document.getElementById('fiveMin');
    fiveMinButton.addEventListener('click', fiveMinBreak);

    const restartButton = document.getElementById('redo');
    redo.addEventListener('click', restartTimer);

    const endSession = document.getElementById('endSess');
    endSession.addEventListener('click', endSess);


}

//  Pause button
const handleClickPauseButton = () => {
    clearInterval(myTimer);
    const $pauseButton = document.getElementById("pause");
    $pauseButton.disabled = true;
    const $playButton = document.getElementById('play');
    $playButton.disabled = false;


};
// Play button 
const handleClickPlayButton = () => {

    const $pauseButton = document.getElementById("pause");
    $pauseButton.disabled = false;
    const $playButton = document.getElementById("play");
    $playButton.disabled = true;

    countDown({
        minutes: staringMinutes,
        seconds: startingSeconds
    });
};

//  Five minute break
const fiveMinBreak = () => {

    countDown({
        minutes: 5,
        seconds: 01
    });
}

//Restart button
const restartTimer = () => {
    initApp();
}

//End session 
const endSess = () => {
    const $middleButtons = document.getElementsByClassName("middleButtons");
    const $message = document.getElementById('message');
    for (var i = 0; i < $middleButtons.length; i++) {
        $middleButtons[i].style.display = "none";
        counter.style.display = "none";
    }

    $message.style.display = "block";
}

startTimer();

let buttonColors = ['red', 'green', 'yellow', 'blue'];

let userClickPattern = [];
let start = false;

let level = 0;

let gamePattern = [];

$(document).keypress(function(e) {
    if (!start) {
        $('#level-title').text(`Level ${level}`);
        nextSequence();
        start = true;
    }
});

function nextSequence() {
    userClickPattern = [];
    level++;
    $('#level-title').text('Level ' + level);

    let randomNumber = Math.floor(Math.random() * buttonColors.length + 1);
    let randomChoosenNumber = buttonColors[randomNumber];

    gamePattern.push(randomChoosenNumber);
    console.log(gamePattern.push(randomChoosenNumber));
    console.log(randomChoosenNumber);
    console.log(gamePattern);

    // $('#' + randomChoosenNumber).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
    animatePress(randomChoosenNumber);
    playSound(randomChoosenNumber);
    // checkAnswer(userClickPattern.length - 1)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        if (gamePattern.length === userClickPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('wrong');
        $('#level-title').text('Game Over, Press Any Key to Restart');

        setTimeout(() => {
            $('body').removeClass('wrong');
        }, 1000);

        startOver();
    }
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setInterval(() => {
        $('#' + currentColor).removeClass('pressed');
    }, 1000);
}

$('.btn').on('click', function(event) {
    window.userChoosenColor = $(this).attr('id');

    event.preventDefault();
    userClickPattern.push(userChoosenColor);
    console.log(userClickPattern);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio('/sounds/' + name + '.mp3');
    audio.play();
}

startOver = () => {
    level = 0;
    start = false;
    gamePattern = [];
};
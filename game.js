// Global Variables

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


// to Check next sequence
function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("level" + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    console.log(gamePattern);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


// to check when a button is clicked
$(".btn").click(handler);

function handler(event) {
    var userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
    
}

// to play sounds
function playSound(name) {
    var sounds = new Audio('sounds/' + name + ".mp3");
    sounds.play();
}


// to animate buttons when pressed
function animatePress(currentColour) {

    $("." + currentColour).addClass("pressed");

    function remove() {
        $("." + currentColour).removeClass("pressed");

    }

    setTimeout(remove, 100);
}


// to detect when a key is pressed to start the game
$(document).keypress(start);


function start() {

    

    if (started !== true) {
        $("#level-title").text("level " + level);

        nextSequence();

        started = true;

    }

}

// to Check a user's answer

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
        console.log ("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    } else{
        console.log("wrong");
        var wrongSound = new Audio('sounds/wrong.mp3');
        wrongSound.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        } , 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver(); 
    }

}

// Restart the game
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


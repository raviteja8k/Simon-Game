var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// Map colors to their respective audio files
var colorAudio = {
    red: new Audio('sounds/red.mp3'),
    blue: new Audio('sounds/blue.mp3'),
    green: new Audio('sounds/green.mp3'),
    yellow: new Audio('sounds/yellow.mp3'),
    wrong: new Audio('sounds/wrong.mp3')
};

// Play sound for a given color
function playSound(color) {
    colorAudio[color].play();
}

// Animate button press
function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}

// Generate the next sequence
function nextSequence() {
    userClickedPattern = []; // Reset user input for the next level
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    // Flash and animate the button
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Check the user's answer
function checkAnswer(currentLevel) {
     
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        // Check if the user has completed the sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

    // Debugging logs
    console.log("User Pattern: ", userClickedPattern);
    console.log("Game Pattern: ", gamePattern);
}

// Restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

// Start the game on a keypress
// $(document).keypress(function() {
$(document).on("keypress touchstart", function () {
    if (level === 0) { // Only start if the game isn't already running
        $("h1").text("Level " + level);
        nextSequence();
    }
});

// Handle button clicks
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Check the user's answer
    checkAnswer(userClickedPattern.length - 1);
});

function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
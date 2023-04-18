// Global Variables
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// First Keypress detectors
$(document).keypress(function () {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

// Click detector
$(".btn").click(function () {
	let userChosenColour = $(this).attr("id");

	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);
	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length - 1);
});

// Checking answer function
function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
			// console.log("success");
		}
	} else {
		// console.log("wrong");
		playSound("wrong");

		$("body").addClass("game-over");
		$("#level-title").text("Game Over, Press Any Key to Restart");

		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		startOver();
	}
}

// Function sequence
function nextSequence() {
	userClickedPattern = [];

	level++;
	$("#level-title").text("Level " + level);

	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);

	playSound(randomChosenColour);
}

// Animation
function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

// Audio effect
function playSound(name) {
	let audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

// End game. Starting again
function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}

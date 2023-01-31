let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function nextSequence(){
    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level+=1;
    $('#level-title').html("<h1>Level " + level + "</h1>");
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setInterval(function(){ 
        $('div').removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
       if(currentLevel == gamePattern.length - 1){
        setInterval(nextSequence(), 1000);
        userClickedPattern = [];
       }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setInterval(function(){ 
            $("body").removeClass("game-over")
        }, 200);
        $("h1").html("<h2>Game Over, Press Any Key to Restart</h2>");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

$(".btn").click(function(){
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function(){
    if(gamePattern.length == 0){
        nextSequence();
        $('#level-title').html("<h1>Level " + level + "</h1>");
    }
});
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
    for(let i=0; i<=currentLevel; i++){
        if(gamePattern[i] == userClickedPattern[i]){
            continue;
        }
        else{

        }
    }
    nextSequence();
}

$(".btn").click(function(){
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // nextSequence();
    checkAnswer(level);
});

$(document).keypress(function(){
    if(gamePattern.length == 0){
        nextSequence();
        $('#level-title').html("<h1>Level " + level + "</h1>");
    }
});
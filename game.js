$(document).ready(function(){
    var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
//The function nextSequence produces a random number which is then use as an index to schose a random number from the buttonColors array
//
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level "+level);    
    var randomNunmber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNunmber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);    
}
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
    
});
function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

// $(document).keypress(nextSequence);
$(document).keypress(function(){
    if(!started){
        $("#level-title").html("Level "+level);
        nextSequence();
        started = true;
    }
})
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over ");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        
    }
}
function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}
});
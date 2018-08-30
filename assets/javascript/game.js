//Variables
var wins = 0;
var loss = 0;

//states = ["loading","ready","guessing","selected"]
var currentState = 0;



$(document).ready(function(){
    checkState();

$(".answer").click(function(){
    if(currentState !== 2){return;}

    console.log(this);
    $(this).addClass("selected");
    if($(this).attr("value")){
        wins++;
    }
    else{
        loss++;
    }
    setState(3);

});
});

function setState(state){
    console.log("set state: " + state);
    currentState = state;
    checkState();
}

function checkState(){
    console.log("current state: " + currentState);

    switch(currentState){
        case 0:
            $("#answer-container").addClass("hidden");
            ResetAnswerState();
        break;
        case 1:
            LoadQuestionDisplay(questions[currentQuestion]);
            $("#answer-container").removeClass("hidden");
        break;
        case 2:
            //guessing
        break;
        case 3:
        setTimeout(function() {
            DisplayCorrectAnswer();

            setTimeout(function() {
              setState(0);
              currentQuestion++;
              setState(1); 
            }, 3000); 
          }, 1000); 
          
        break;
    }
}
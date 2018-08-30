var questions = [];
var topics = ["all","videogames"];
var currentQuestion = 0

function LoadQuestions(topic){
    console.log("here");
    //Asyncrinis Javascritp xml
    $.ajax({
        url: "https://opentdb.com/api.php?amount=50&category=15&difficulty=easy&type=multiple",
        method: "GET"
    }).then(function(response){
        questions = response.results;
        //console.log(questions);
        setState(1);
        //LoadQuestionDisplay(questions[4]);
    });
}
LoadQuestions("t"); // load API right away

function LoadQuestionDisplay(quest){
    console.log(quest);
    $("#question").text(quest.question);
    LoadAnswersRandom(quest);
    setState(2);// currentState = 2;
}

function LoadAnswersRandom(question){
    let rand = Math.floor(Math.random() * 4 ) +1;
    $("#answer" + rand).text(question.correct_answer);
    $("#answer" + rand).attr("value", true);

    let j = 0;
    for(let i = 1; i<=4; i++){
        if(i !== rand){
            $("#answer" + i).text(question.incorrect_answers[j]);
            $("#answer" + i).attr("value", false); 
            j++;
        }
    }

}

function DisplayCorrectAnswer(){
    for(let i = 1; i<=4; i++){
        console.log(i +" is: " + $("#answer" + i).attr("value"))
        if($("#answer" + i).attr("value")=== "true"){
            console.log(i +" is: " + $("#answer" + i).attr("value"))
            $("#answer" + i).addClass("correct");
        }
        else if($("#answer" +i).hasClass("selected")){
            console.log($("#answer" +i).hasClass("selected"));
            $("#answer" + i).addClass("wrong");
        }
    }
}

function ResetAnswerState(){
    for(let i = 1; i<=4; i++){
        if($("#answer" +i).hasClass("selected")){
            $("#answer" +i).removeClass("selected");
        }
        if($("#answer" +i).hasClass("wrong")){
            $("#answer" +i).removeClass("wrong");
        }
        if($("#answer" +i).hasClass("correct")){
            $("#answer" +i).removeClass("correct");
        }
    }
}
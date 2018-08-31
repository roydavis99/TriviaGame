var questions = [];
//var topics = ["all", "VideoGames", "BoardGames", "History"];
var  topics = [0,15, 16, 23];
var difficulties = ["easy","medium","hard"];
var currentQuestion = 0;
var divs = { 
    questionDiv: "#question",
    answerDivs: ["#answer1","#answer2","#answer3","#answer4"]
} ;

function LoadQuestions(topic, difficulty){
    var urlQuery = "https://opentdb.com/api.php?amount=10&category=" + topic + "&difficulty=" + difficulty + "&type=multiple";
    $.ajax({
        url: urlQuery,
        method: "GET"
    }).then(function(response){
        questions = response.results;
        //setState(states.Ready);
        setState(states.Loading);
    });
}// load API right away

function LoadQuestionDisplay(quest){
    console.log(quest);
    $("#question").text(quest.question);
    LoadAnswersRandom(quest);
    //setState(states.Ready);// currentState = 2;
}

function LoadAnswersRandom(question){
    let rand = Math.floor(Math.random() * 4 );
    console.log(rand);
    $(divs.answerDivs[rand]).text(question.correct_answer);
    $(divs.answerDivs[rand]).attr("value", true);

    let j = 0;
    divs.answerDivs.forEach(element => {
        if(element !== divs.answerDivs[rand]){
            $(element).text(question.incorrect_answers[j]);
            $(element).attr("value", false); 
            j++;
        }
    });

}

function DisplayCorrectAnswer(){
    
    divs.answerDivs.forEach(element => {
        //console.log(i +" is: " + $(element).attr("value"))
        if($(element).attr("value")=== "true"){
            //console.log(i +" is: " + $(element).attr("value"))
            $(element).addClass("correct");
        }
        else if($(element).hasClass("selected")){
            //console.log($(element).hasClass("selected"));
            $(element).addClass("wrong");
        }
    });
}

function ResetAnswerState(){
    divs.answerDivs.forEach(element => {
        if($(element).hasClass("selected")){
            $(element).removeClass("selected");
        }
        if($(element).hasClass("wrong")){
            $(element).removeClass("wrong");
        }
        if($(element).hasClass("correct")){
            $(element).removeClass("correct");
        }
        $(element).text("");
    });
}
var questions = [];
//var topics = ["all", "VideoGames", "BoardGames", "History"];
var  topics = [0,15, 16, 23];
var difficulties = ["easy","medium","hard"];
var currentQuestion = 0;
var divs = { 
    questionDiv: "#question",
    answerDivs: ["#answer1","#answer2","#answer3","#answer4"]
} ;
var dif = 1;
var cat = 16;

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
    //console.log(quest);
    $("#question").text(cleanStringHTML(quest.question));
    LoadAnswersRandom(quest);
    //setState(states.Ready);// currentState = 2;
}

function LoadAnswersRandom(question){
    let rand = Math.floor(Math.random() * 4 );
    //console.log(rand);
    $(divs.answerDivs[rand]).text(cleanStringHTML(question.correct_answer));
    $(divs.answerDivs[rand]).attr("value", true);

    let j = 0;
    divs.answerDivs.forEach(element => {
        if(element !== divs.answerDivs[rand]){
            $(element).text(cleanStringHTML(question.incorrect_answers[j]));
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

function cleanStringArray(arrayToClean){
    $.each(arrayToClean, function (key, value) {
        arrayToClean[key] = cleanStringHTML(value);;
    });
    return arrayToClean;
}

function cleanStringHTML(word) {
    let returnWord = word.toString();
    returnWord = returnWord.replace(/&#039;/g, "\'");
    returnWord = returnWord.replace(/&quot;/g, "\"");
    returnWord = returnWord.replace(/&apos;/g, "\'");
    returnWord = returnWord.replace(/&amp;/g, "&");
    returnWord = returnWord.replace(/&lt;/g, "<");
    returnWord = returnWord.replace(/&gt;/g, ">");
    returnWord = returnWord.replace(/&nbsp;/g, " ");
    return returnWord;
}
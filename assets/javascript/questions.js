var questions = [];
var topics = ["all","videogames"];

function LoadQuestion(topic){
    console.log("here");
    //Asyncrinis Javascritp xml
    $.ajax({
        url: "https://opentdb.com/api.php?amount=50&category=15&difficulty=easy&type=multiple",
        method: "GET"
    }).then(function(response){
        questions = response.results;
        console.log(questions);
        
        LoadDisplay(questions[4]);
    });
}

function LoadDisplay(quest){
    console.log(quest);
    $("#question").text(quest.question);
}
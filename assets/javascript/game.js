//Variables
var wins = 0;
var losses = 0;

//states = ["loading","ready","guessing","selected","APILoading", "win", "loss"]
var states = {
    APILoading: 0,
    Loading: 1,
    Ready: 2,
    Guessing: 3,
    Selected: 4,
    Win: 5,
    Loss: 6,
    EndScreen: 7,
    StartScreen: 8,
    GameScreen: 9
};
var currentState = states.StartScreen;
var gameTimer = 8;



$(document).ready(function () {
    checkState();

    $(".answer").click(function () {
        if (currentState !== states.Guessing) { return; }

        $(this).addClass("selected");
        console.log($(this).attr("value"));
        if ($(this).attr("value") === "true") {
            //setState(states.Win);
            win();
        }
        else {
            loss();
        }

    });

    $("#start").click(function () {
        setState(states.GameScreen);
    });
});

function win() {
    wins++;
    setState(states.Selected);
}

function loss() {
    losses++;
    setState(states.Selected);
}

function setState(state) {
    //console.log("set state: " + state);
    currentState = state;
    checkState();
}

function checkState() {

    switch (currentState) {
        case states.Loading:
            console.log("current state: loading");
            $("#answer-container").addClass("hidden");
            ResetAnswerState();
            console.log("current Question: " + currentQuestion + " out of " + questions.length);

            setState(states.Ready);

            break;
        case states.Ready:
            console.log("current state: Ready");
            if (currentQuestion < questions.length) {
                LoadQuestionDisplay(questions[currentQuestion]);
                $("#answer-container").removeClass("hidden");
                setState(states.Guessing);
            }
            else {
                setState(states.EndScreen);
            }
            break;
        case states.Guessing:
            console.log("current state: Guessing");
            GuessingTimer()
            //guessing
            break;
        case states.Selected:
            console.log("current state: Selected");
            StopGuessingTimer();

            setTimeout(function () {
                DisplayCorrectAnswer();

                setTimeout(function () {
                    currentQuestion++;
                    setState(states.Loading);
                }, 3000);
            }, 1000);

            break;
        case states.APILoading:
            console.log("current state: APILoading");
            LoadQuestions(topics[2], difficulties[0]);

            break;
        case states.Win: //win
            //console.log("current state: Win");
            //win();
            break;
        case states.Loss: //loss
            //console.log("current state: Loss");
            //loss();
            break;
        case states.EndScreen:
            console.log("current state: EndScreen");
            SetEndScreen();
            break;
        case states.StartScreen:
            SetStartScreen();
            break;
        case states.GameScreen:
            SetGameScreen();
            break;
    }
}

function GuessingTimer() {
    var tim = 0;
    tim = setTimeout(function () {
        console.log("timer: " + tim + " AND GameTimer: " + gameTimer);
        if (tim === gameTimer) {
            loss();
        }
    }, 5000);
    gameTimer = tim;
    console.log(gameTimer);
}

function StopGuessingTimer(){
    console.log(gameTimer);
    clearTimeout(gameTimer);
    gameTimer = 0;
}

function SetEndScreen() {
    //display score here
    $("#gameScreen").addClass("collapse");
    $("#endScreen").removeClass("collapse");

    $("#winsCount").text(wins);
    $("#lossCount").text(losses);
}

function SetStartScreen() {
    if (!$("#gameScreen").hasClass("collapse")) {
        $("#gameScreen").addClass("collapse");
    }
    if (!$("#endScreen").hasClass("collapse")) {
        $("#endScreen").addClass("collapse");
    }
    if ($("#startScreen").hasClass("collapse")) {
        $("#startScreen").removeClass("collapse");
    }
}

function SetGameScreen() {
    setState(states.APILoading);
    if ($("#gameScreen").hasClass("collapse")) {
        $("#gameScreen").removeClass("collapse");
    }
    if (!$("#endScreen").hasClass("collapse")) {
        $("#endScreen").addClass("collapse");
    }
    if (!$("#startScreen").hasClass("collapse")) {
        $("#startScreen").addClass("collapse");
    }

}
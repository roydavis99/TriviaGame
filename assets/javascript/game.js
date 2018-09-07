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

    $(".cat").click(function () {
        $(".cat").removeClass("selected");
        $(this).addClass("selected");

        cat = $(this).attr("data-cat");
    });

    $(".dif").click(function () {
        $(".dif").removeClass("selected");
        $(this).addClass("selected");

        dif = $(this).attr("data-dif");
    });

    $("#start").click(function () {
        setState(states.GameScreen);
    });

    $("#main-menu").click(function () {
        setState(states.StartScreen);
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
                }, 1500);
            }, 1000);

            break;
        case states.APILoading:
            console.log("current state: APILoading");
            LoadQuestions(cat, difficulties[dif]);

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
    }, 15000);
    gameTimer = tim;
    console.log(gameTimer);
}

function StopGuessingTimer() {
    console.log(gameTimer);
    clearTimeout(gameTimer);
    gameTimer = 0;
}

function SetEndScreen() {
    $("body").css("background-image", "url(../assets/images/TriviaBK.jpg)");
    //display score here
    $("#gameScreen").addClass("collapse");
    $("#endScreen").removeClass("collapse");

    $("#winsCount").text(wins);
    $("#lossCount").text(losses);
}

function SetStartScreen() {
    $("body").css("background-image", "url(../assets/images/TriviaBK.jpg)");
    if (!$("#gameScreen").hasClass("collapse")) {
        $("#gameScreen").addClass("collapse");
    }
    if (!$("#endScreen").hasClass("collapse")) {
        $("#endScreen").addClass("collapse");
    }
    if ($("#startScreen").hasClass("collapse")) {
        $("#startScreen").removeClass("collapse");
    }
    Reset();
}

function SetGameScreen() {
    console.log("SetGameState: " + cat);
    $("body").css("background-image", "url(../assets/images/" + cat + ".jpg)");
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

function Reset() {
    wins = 0;
    losses = 0;
    currentQuestion = 0;
}
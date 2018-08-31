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
    Loss: 6
};
var currentState = states.APILoading;



$(document).ready(function () {
    checkState();

    $(".answer").click(function () {
        if (currentState !== states.Guessing) { return; }

        console.log(this);
        $(this).addClass("selected");
        if ($(this).attr("value")) {
            setState(states.Win);
        }
        else {
            setState(states.Loss);
        }

    });
});

function win() {
    wins++;
    console.log(win);
    setState(states.Selected);
}

function loss() {
    losses++;
    setState(states.Selected);
}

function setState(state) {
    console.log("set state: " + state);
    currentState = state;
    checkState();
}

function checkState() {
    console.log("current state: " + currentState);

    switch (currentState) {
        case states.Loading:
            $("#answer-container").addClass("hidden");
            ResetAnswerState();
            setState(states.Ready);
            break;
        case states.Ready:
            LoadQuestionDisplay(questions[currentQuestion]);
            $("#answer-container").removeClass("hidden");
            setState(states.Guessing);
            break;
        case states.Guessing:
            //guessing
            break;
        case states.Selected:
            setTimeout(function () {
                DisplayCorrectAnswer();

                setTimeout(function () {
                    setState(states.Loading);
                    currentQuestion++;
                    setState(states.Ready);
                }, 3000);
            }, 1000);

            break;
        case states.APILoading:
            LoadQuestions(topics[2], difficulties[0]);
            
            break;
        case states.Win: //win
            win();
            break;
        case states.Loss: //loss
            loss();
            break;
    }
    console.log("out: " + currentState);
}
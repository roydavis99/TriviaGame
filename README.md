# TriviaGame
Trivia Game

https://roydavis99.github.io/TriviaGame/


#Task:

* You'll create a trivia game that shows only one question until the player answers it or their time runs out.

* If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

* The scenario is similar for wrong answers and time-outs.

  * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
  * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

* On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page)

# My Thoughts
* Use a state handler to manage the timers and user input.  This allows one function to control the web page instead of each task calling each other

* Use an API for the questions.  Give me more time to manage the game instead of trying to populate multiple question and answers.

* use bootstrap collapse class to hide individual sections for the Main Menu, Game play, and End screen.  This give make it easier for the user to play with out scrolling.
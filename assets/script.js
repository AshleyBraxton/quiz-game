var question = document.getElementById('question');
var choices = Array.from(document.getElementsByClassName('choice'));
var startBtn = document.getElementById('start-button');
var timer = document.querySelector('.time');
var timeLeft= 25;
var verifyAnswer = document.querySelector('.answer-checker');
var userscore = document.getElementById('userScore');
var currentIndex = 0;
let currentQuestion= {};
let availableQuestions= [];
var userInitials = document.getElementById('userInitials');
var submitBtn = document.getElementById('submit');
var highscoreList = [];
var highscoreBtn = document.getElementById('highscore-link');
var highscoreDisplay = document.getElementById('highscore-display');
var clearscores = document.getElementById('clear');
var returnHome = document.getElementById('return')
// ^^^sets up global vriables to be accessed later
function setTimer() {
    var timeSet = setInterval(function () {
        timeLeft--;
        timer.textContent = timeLeft
        if (timeLeft == 0) {
            clearInterval(timeSet);
            document.getElementById('score-container').style.display="block";
            document.getElementById('quiz-window').style.display="none";
        } else if (currentIndex > availableQuestions.length - 1){

            clearInterval(timeSet)
        }
    }, 1000);
}
// ^^sets up the timer function, and also tell quiz to stop if time runs out 
let questions = [
    {
        question: "What is the proper way to link a JavaScript file?",
        choice1: "<link>",
        choice2: "<script>",
        choice3: "href=' '",
        choice4: "<a>",
        answer: 2
    },
    {
        question: "Which of these is NOT a JavaScript data type?",
        choice1: "Boolean",
        choice2: "Number",
        choice3: "Letter",
        choice4: "String",
        answer: 3
    },
    {
        question: "How do you write a comment in JavaScript?",
        choice1: "/* */",
        choice2: "#",
        choice3: "$ $",
        choice4: "//",
        answer: 4
    },
    {
        question: "What symbol is used to end a JavaScript statement and seperate it from the next?",
        choice1: "_",
        choice2: ";",
        choice3: ",",
        choice4: ":",
        answer: 2
    },
    {
        question: "What method is used to write on a browser's console?",
        choice1: "console.log()",
        choice2: "console.edit()",
        choice3: "console.write()",
        choice4: "console.output()",
        answer: 1
    }
//array containing quiz questions
    
];
 function startGame() {
     setTimer();
    document.getElementById('quiz-start').style.display="none"
    document.getElementById('quiz-window').style.display="block"
    availableQuestions=[...questions];
    getNewQuestion();
 };
//the function to start the game, switching to the quiz display instead of start screen, sets timer, and gets a queston
 function getNewQuestion() {
if (currentIndex > availableQuestions.length - 1){

document.getElementById('score-container').style.display="block"
document.getElementById('quiz-window').style.display="none"
userscore.textContent = "You scored a " + timeLeft + " please input your initials below to join highscoreboard"
return;
}
//^once all questions are used, quiz stops, displays score
    var currentQuestion = availableQuestions[currentIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];

        choice.innerText = currentQuestion["choice" + number];
    });

//sets up the question and answer choices to display on the screen through the html
const ac = new AbortController();
choices.forEach(choice => {
choice.addEventListener('click', e => {


    var optionChosen = e.target;
    var userAnswer = optionChosen.dataset["number"];
    checkAnswer(userAnswer, currentQuestion);
    currentIndex++
    getNewQuestion();
    ac.abort()

},{signal: ac.signal});
//function to see which answer choice the user has picked, sed it to the function to ceck answer, has abort so that the eventlisterner does not multiply exponentially
}) 
}

function checkAnswer(userAnswer, currentQuestion,) {
    if (userAnswer == currentQuestion.answer) {
        verifyAnswer.textContent = "Correct! Well Done" 
    }else if (userAnswer!== currentQuestion.answer) {
        verifyAnswer.textContent = "Incorrect"  
        timeLeft= timeLeft -5; 
    }
    if (timeLeft === 0) {
        clearInterval(timeSet);
        document.getElementById('score-container').style.display="block";
        document.getElementById('quiz-window').style.display="none";
    }

}
//^^check if the users chosen answer, displays message depending if it is correct or incorrect
function takeUserscore() {
    if (userInitials === null) {
    return;

    } else {
    userInfo = {
            Initials: userInitials.value,
            Score: timeLeft,
        }
        var highscoreList = localStorage.getItem("highscoreList");
        if (highscoreList === null) {
            highscoreList = [];
        } else {
            highscoreList = JSON.parse(highscoreList);
        }
        highscoreList.push(userInfo);
        var newScore = JSON.stringify(highscoreList);
        localStorage.setItem("highscoreList", newScore);
}
displayHighscores()
}
//^^takes the time left when the quiz is finished and the users initials that they input and saves them to an array in local storage

function displayHighscores () {
    document.getElementById('highscore-page').style.display="block"
    document.getElementById('score-container').style.display="none" 
    document.getElementById('quiz-start').style.display="none"  
    var highscoreList = localStorage.getItem("highscoreList");
    var parsed = JSON.parse(highscoreList);
    if (parsed !== null) {

        for (var i = 0; i < parsed.length; i++) {
    
            var createLi = document.createElement("li");
            createLi.textContent = parsed[i].Initials + " " + parsed[i].Score;
            highscoreDisplay.appendChild(createLi);
    
        }
    }
    

}
//^^^^gets the highscores form local storage and displays them of the highscore page in list items
function returnToHome(){
    window.location.reload();
}
//^^goes back to start screen
function ClearHighscores(){
localStorage.clear();
window.location.reload();
}
//^^clears the local storage to clear save highscores


submitBtn.addEventListener('click', takeUserscore);
 startBtn.addEventListener('click', startGame);
 highscoreBtn.addEventListener('click', displayHighscores);
 returnHome.addEventListener('click', returnToHome);
 clearscores.addEventListener('click', ClearHighscores);
//^^sets all buttons to run their desired functions upon the user clicking the button
var question = document.getElementById('question');
var choices = Array.from(document.getElementsByClassName('choice'));
var startBtn = document.getElementById('start-button')
var timer = document.querySelector('.time');
var timeLeft= 25;
var verifyAnswer = document.querySelector('.answer-checker')
var userscore = document.getElementsByClassName('userScore')
var currentIndex = 0;
let currentQuestion= {};
let score=0;
letavailableQuestions= [];

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

    
];
 function startGame() {
     setTimer();
    document.getElementById('quiz-start').style.display="none"
    document.getElementById('quiz-window').style.display="block"
    availableQuestions=[...questions];
    getNewQuestion();
 };

 function getNewQuestion() {
    console.log('D',currentIndex)
if (currentIndex > availableQuestions.length - 1){

document.getElementById('score-container').style.display="block"
document.getElementById('quiz-window').style.display="none"
return;
// userscore.innerText = "You scored a " + timeLeft + " please input your initials below to join highscoreboard"
}

    var currentQuestion = availableQuestions[currentIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];

        choice.innerText = currentQuestion["choice" + number];
    });


const ac = new AbortController();
choices.forEach(choice => {
choice.addEventListener('click', e => {


    var optionChosen = e.target;
    console.log(optionChosen)
    var userAnswer = optionChosen.dataset["number"];
    checkAnswer(userAnswer, currentQuestion);
    currentIndex++
    getNewQuestion();
    ac.abort()

},{signal: ac.signal});

}) 
}

function checkAnswer(userAnswer, currentQuestion,) {
    console.log('useanswer>>>>>', userAnswer)
    console.log('currentquestion answer>>>>', currentQuestion.answer)
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

 startBtn.addEventListener('click', startGame)
 

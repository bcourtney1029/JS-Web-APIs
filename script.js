const startQuiz = document.getElementById('startQuiz');
const resultsContainer = document.getElementById('results');
const timer = document.getElementById('timer');
const question = document.getElementById('question');
const answers = document.getElementById('answers');
const choiceA = document.getElementById('A');
const choiceB = document.getElementById('B');
const choiceC = document.getElementById('C');
const choiceD = document.getElementById('D');
const start = document.getElementById("start");
const quizQuestions = [
    {
        question: "Commonly used data types DO NOT include: ",
        choiceA: "strings",
        choiceB: "booleans",
        choiceC: "alerts",
        choiceD: "numbers",    
        correctAnswer: "C"
    },
    {
        question: "Arrays in Javascript can be used to store ________.",
        choiceA: "numbers and strings",
        choiceB: "booleans",
        choiceC: "other arrays",
        choiceD: "all of the above",
        correctAnswer: "D"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is ",
        choiceA: "Javascript",
        choiceB: "booleans",
        choiceC: "for loops",
        choiceD: "console log",
        correctAnswer: "D"
    },
    {
        question: "The condition in an if/else statement is enclosed within",
        choiceA: "quotes",
        choiceB: "curly brackets",
        choiceC: "parenthesis",
        choiceD: "square brackets",
        correctAnswer: "C"
    }
];
const lastQuestionIndex = quizQuestions.length - 1;
let runningQuestionIndex = 0;
let count = 30;
let score = 0;
var localHighScore = localStorage.getItem("localHighScore");


function questionRender() {
    let q = quizQuestions[runningQuestionIndex];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

function takeQuiz() {
    start.style.display = "none";
    startQuiz.style.display = "none";    
    questionRender();
    quiz.style.display = "block";
}

function countdownTimer() {
    var interval = setInterval(function()  {
        document.getElementById('timer').innerHTML=count;
        count--;
        if (count <= 0) {
            showResults();
            clearInterval(interval);
        }      
    }, 1000);
}

function checkAnswer(answer) {
    if(quizQuestions[runningQuestionIndex].correctAnswer == answer) {
        score++;
    }else if (quizQuestions[runningQuestionIndex].correctAnswer != answer){
        count = count - 10;
    }
    if(runningQuestionIndex < lastQuestionIndex) {
        runningQuestionIndex++;
        takeQuiz();
    }else{
        count = 0;
        return;
    }
}

function showResults() {
    quiz.style.display = "none";
    timer.style.display = "none";
    resultsContainer.style.display = "block";
    if (localHighScore !== null) {
        if(score > localHighScore) {
            localStorage.setItem("localHighScore", score);
        } 
    }
    else {
        localStorage.setItem("localHighScore", score);
    }
    highScore(score);
}

function highScore(score) {
    let userInitials = prompt("Please enter your initials to save your high score!");
    resultsContainer.innerHTML = "Congratulations " + userInitials + "! You scored a " + score + "/4 on this quiz!\nYour all-time high score is a " + localHighScore + "/4!";
    
 }

start.addEventListener('click', takeQuiz);
start.addEventListener('click', countdownTimer);



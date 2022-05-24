const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Everyone who works in this department uses ___ pen.",
        choice1: "a",
        choice2: "an",
        choice3: "the",
        choice4: "-",
        answer: 1
    },
    {
        question: "Tina gave me ____ book for my birthday",
        choice1: "a",
        choice2: "-",
        choice3: "the",
        choice4: "an",
        answer: 1
    },
    {
        question: "I read _____ book Tina gave me while I was on holiday.",
        choice1: "the",
        choice2: "an",
        choice3: "-",
        choice4: "a",
        answer: 1
    },
    {
        question: "Sally lives in ___ big house in the country.",
        choice1: "a",
        choice2: "the",
        choice3: "-",
        choice4: "an",
        answer: 1
    }
]

const CORRECT = 10;
const MAX_QUESTIONS = 4;

startQuiz = () => { // start the quiz function 
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions)
    getNewQuestion();
};

getNewQuestion = () =>{ // function to get info of the questions and asnwers
    // when we get out of questions
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        // go to the end page becuase the quiz finished.
        localStorage.setItem("mostRecentScore", score); // code to access te score in te end page.
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`; // updates the questions number
    // update the progress progressBarFull
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS)*100}%`;
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    //number = 1;
    choices.forEach(choice =>{
        const number = choice.dataset["number"]; //did not work
        choice.innerText = currentQuestion["choice" + number];
    });
    availableQuestions.splice(questionIndex,1);//removes questions already used
    acceptingAnswers = true;  
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        //console.log(e.target); // checks wich option the student clicked
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        //console.log(selectedAnswer == currentQuestion.answer); check if the answer is correct or incorrect
        const incorrectCorrect = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        console.log(incorrectCorrect); // checks if the asnwer is correct or incorrent
        if(incorrectCorrect == "correct"){
            incrementScore(CORRECT);
        };
        selectedChoice.parentElement.classList.add(incorrectCorrect); // select the colo from the css file .correct, .incorrect

        setTimeout( () =>{ // code to animate the colors avoiding multiple colors in one question
            selectedChoice.parentElement.classList.remove(incorrectCorrect);
            getNewQuestion();
        },1000)
        
    });
});

incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
};


startQuiz();
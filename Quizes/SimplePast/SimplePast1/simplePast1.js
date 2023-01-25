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
        question: "Yesterday, I _____ at home all day.",
        choice1: "was",
        choice2: "were",
        answer: 1
    },
    {
        question: "They _____ playing soccer in the park when it started to rain.",
        choice1: "was",
        choice2: "were",
        answer: 2
    },
    {
        question: "We _____ so tired after our hike that we took a nap as soon as we got home.",
        choice1: "was",
        choice2: "were",
        answer: 2
    },
    {
        question: "My sister _____ very happy when she got her new car.",
        choice1: "was",
        choice2: "were",
        answer: 2
    },
    {
        question: "The flowers _____ beautiful in the garden last spring.",
        choice1: "was",
        choice2: "were",
        answer: 2
    }
    ,
    {
        question: "I _____ at the library studying for my exam.",
        choice1: "was",
        choice2: "were",
        answer: 1
    }
    ,
    {
        question: "They _____ very excited about their vacation.",
        choice1: "was",
        choice2: "were",
        answer: 2
    }
    ,
    {
        question: "I _____ really hungry, so I made myself a sandwich.",
        choice1: "was",
        choice2: "were",
        answer: 1
    }
    ,
    {
        question: "The children _____ playing in the playground when their parents came to pick them up.",
        choice1: "was",
        choice2: "were",
        answer: 2
    }
    ,
    {
        question: "My Father _____ calling my mother yesterday",
        choice1: "was",
        choice2: "were",
        answer: 1
    }

]

const CORRECT = 10;
const MAX_QUESTIONS = 10;

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
        return window.location.assign("https://diegogithub-coding.github.io/accurateacademy/Quizes/SimplePast/SimplePast1/simplePast1end.html");    
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
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
        question: "I gave the book to _____. (Object pronoun)",
        choice1: "I",
        choice2: "me",
        choice3: "him",
        choice4: "her",
        answer: 3
    },
    {
        question: "_____ is going to the store. (Subject pronoun)",
        choice1: "They",
        choice2: "We",
        choice3: "She",
        choice4: "He",
        answer: 3
    },
    {
        question: "_____ are playing soccer together. (Subject pronoun)",
        choice1: "I",
        choice2: "They",
        choice3: "He",
        choice4: "She",
        answer: 2
    },
    {
        question: "He cooked dinner for _____. (Object pronoun)",
        choice1: "I",
        choice2: "us",
        choice3: "them",
        choice4: "her",
        answer: 1
    },
    {
        question: "The dog chased _____ tail. (Possessive pronoun)",
        choice1: "its",
        choice2: "his",
        choice3: "her",
        choice4: "their",
        answer: 2
    }
    ,
    {
        question: "We saw _____ at the concert. (Object pronoun)",
        choice1: "them",
        choice2: "she",
        choice3: "he",
        choice4: "I",
        answer: 1
    }
    ,
    {
        question: "You should call _____. (Object pronoun)",
        choice1: "me",
        choice2: "her",
        choice3: "him",
        choice4: "them",
        answer: 1
    }
    ,
    {
        question: "The teacher graded _____ homework. (Object pronoun)",
        choice1: "our",
        choice2: "his",
        choice3: "their",
        choice4: "her",
        answer: 1
    }
    ,
    {
        question: "I will see _____ later. (Object pronoun)",
        choice1: "you",
        choice2: "her",
        choice3: "them",
        choice4: "me",
        answer: 1
    }
    ,
    {
        question: "He is taller than _____. (Object pronoun)",
        choice1: "me",
        choice2: "she",
        choice3: "them",
        choice4: "him",
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
        return window.location.assign("https://diegogithub-coding.github.io/accurateacademy/QuizTestTemplate/end.html");    
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
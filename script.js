const questions = [
    {
        question: "What is the capital city of Australia?",
        answers: [
            {text: "Sydney", correct: false},
            {text: "Melbourne", correct: false},
            {text: "Canberra", correct: true},
            {text: "Brisbane", correct: false},
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: false},
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            {text: "William Shakespeare", correct: true},
            {text: "Jane Austen", correct: false},
            {text: "Mark Twain", correct: false},
            {text: "Charles Dickens", correct: false},
        ]
    },
    {
        question: "What is the boiling point of water at sea level?",
        answers: [
            {text: "90°C", correct: false},
            {text: "100°C", correct: true},
            {text: "80°C", correct: false},
            {text: "120°C", correct: false},
        ]
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: [
            {text: "Gold", correct: false},
            {text: "Oxygen", correct: true},
            {text: "Osmium", correct: false},
            {text: "Oxide", correct: false},
        ]
    },
    {
        question: "How many continents are there on Earth?",
        answers: [
            {text: "5", correct: false},
            {text: "6", correct: false},
            {text: "7", correct: true},
            {text: "8", correct: false},
        ]
    },
    {
        question: "Which ocean is the largest?",
        answers: [
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: "Arctic Ocean", correct: false},
            {text: "Pacific Ocean", correct: true},
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            {text: "Iron", correct: false},
            {text: "Diamond", correct: true},
            {text: "Gold", correct: false},
            {text: "Quartz", correct: false},
        ]
    },
    {
        question: "Which language is the most spoken worldwide?",
        answers: [
            {text: "English", correct: false},
            {text: "Mandarin Chinese", correct: true},
            {text: "Spanish", correct: false},
            {text: "Hindi", correct: false},
        ]
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            {text: "K2", correct: false},
            {text: "Mount Everest", correct: true},
            {text: "Kangchenjunga", correct: false},
            {text: "Lhotse", correct: false},
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
};

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();


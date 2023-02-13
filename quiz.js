// Array of questions and answers for the quiz
const questions = [
    {
        question: "What is the most watched annual sporting event in the world?",
        answers: [
            { text: "Super Bowl", correct: false },
            { text: "World Cup", correct: true },
            { text: "Olympics", correct: false },
            { text: "NBA Finals", correct: false }
        ]
    },
    {
        question: "Although up for interpretation, who is most commonly known as the greatest basketball player of all time?",
        answers: [
            { text: "Michael Jordan", correct: true },
            { text: "Lebron James", correct: false },
            { text: "Kobe Bryant", correct: false },
            { text: "Magic Johnson", correct: false }
        ]
    },
    {
        question: "Who is the highest scoring New York Ranger of all time?",
        answers: [
            { text: "Wayne Gretzky", correct: false },
            { text: "Mark Messier", correct: false },
            { text: "Jaromir Jagr", correct: false },
            { text: "Rod Gilbert", correct: true },

        ]
    },
    {
        question: "Which of the following is not a current NBA team?",
        answers: [
            { text: "New York Knicks", correct: false },
            { text: "Los Angeles Lakers", correct: false },
            { text: "New Jersey Nets", correct: true },
            { text: "New Orleans Pelicans", correct: false },
        ]
    },
    {
        question: "if you bet $100 on a +100 underdog moneyline, how much money would you net (assuming your team wins)?",
        answers: [
            { text: "$100", correct: true },
            { text: "$200", correct: false },
            { text: "$300", correct: false },
            { text: "$400", correct: false },
        ]
    },

];

// variables from index.html to reference and manipulate DOM elements
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const quiz = document.getElementById("quiz");
const timer = document.getElementById("timer");
const resultsContainer = document.getElementById("results-container");
const finalScore = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const saveScoreForm = document.querySelector("form");

// initlaize variables for timer and quiz questions
let currentQuestionIndex = 0;
let timeLeft = 75;

// startQuiz function is called when the "Start Quiz" button is clicked
function startQuiz() {
    // hide the start button and display the quiz container
    startButton.style.display = "none";
    quizContainer.style.display = "block";

    // render the first question
    renderQuestion();

    // set the timer interval to decrement the timeLeft variable by 1 second
    timerInterval = setInterval(() => {
        timeLeft--;
        // update the timer display
        timer.textContent = `Time: ${timeLeft} seconds`;
        // if the timeLeft reaches 0, end the quiz
        if (timeLeft === 0) {
            endQuiz();
        }
    }, 1000);
}

// renderQuestion function displays the current question and its options
function renderQuestion() {
    // clear the quiz container
    quiz.innerHTML = "";

    // get the current question object
    const currentQuestion = questions[currentQuestionIndex];

    // create a paragraph element to display the question text
    const questionText = document.createElement("p");
    questionText.textContent = currentQuestion.question;
    quiz.appendChild(questionText);

    // loop through the options array and create a button for each option
    currentQuestion.options.forEach((option) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;

        // add an event listener to the option button to handle the user's answer
        optionButton.addEventListener("click", (event) => {
            const selectedOption = event.target.textContent;
            // if the selected option is the correct answer
            if (selectedOption === currentQuestion.answer) {
                // increment the currentQuestionIndex and either render the next question or end the quiz
                currentQuestionIndex++;
                if (currentQuestionIndex === questions.length) {
                    endQuiz();
                } else {
                    renderQuestion();
                }
            } else {
                // subtract 5 seconds from the timeLeft if the answer is incorrect
                timeLeft -= 5;
            }
        });
        quiz.appendChild(optionButton);
    });
}

function endQuiz() {
    // Stop the timer interval
    clearInterval(timerInterval);

    // Hide the quiz container
    quizContainer.style.display = "none";

    // Show the results container
    resultsContainer.style.display = "block";

    // Update the text content of the final score element to show the user's final score
    finalScore.textContent = `Your final score is: ${timeLeft}`;
}






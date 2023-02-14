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
const highScoresContainer = document.getElementById("high-scores-container");
const highScoresList = document.getElementById("high-scores-list");
const backButton = document.getElementById("back-button");
const clearButton = document.getElementById("clear-button");
const seeScores = document.getElementById("see-scores");

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

function renderQuestion() {
    // clear the quiz container
    quiz.innerHTML = "";

    // get the current question object
    const currentQuestion = questions[currentQuestionIndex];

    // create a paragraph element to display the question text
    const questionText = document.createElement("p");
    questionText.textContent = currentQuestion.question;
    questionText.classList.add("question-text");
    quiz.appendChild(questionText);

    // loop through the answers array and create a button for each answer
    currentQuestion.answers.forEach((answer, i) => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer.text;
        answerButton.classList.add("answer-button");

        // add an event listener to the answer button to handle the user's answer
        answerButton.addEventListener("click", (event) => {
            const selectedAnswer = event.target.textContent;
            // if the selected answer is correct
            if (selectedAnswer === currentQuestion.answers[i].text && currentQuestion.answers[i].correct) {
                currentQuestionIndex++;
                if (currentQuestionIndex === questions.length) {
                    endQuiz();
                } else {
                    renderQuestion();
                }
            } else if (selectedAnswer !== currentQuestion.answers[i].text || !currentQuestion.answers[i].correct) {
                // subtract 5 seconds from the timeLeft if the answer is incorrect
                timeLeft -= 5;
                currentQuestionIndex++;
                if (currentQuestionIndex === questions.length) {
                    endQuiz();
                } else {
                    renderQuestion();
                }
            }
        });
        quiz.appendChild(answerButton);
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

// Save the user's initials and score to local storage
saveScoreForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Get the value of the initials input and store it in the "initials" variable
    const initials = initialsInput.value;

    // Retrieve the "highScores" from local storage or set it to an empty array if it doesn't exist
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Push the current score and initials to the "highScores" array
    highScores.push({ initials, score: timeLeft });

    // Store the updated "highScores" array back in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Reset the form after the score has been saved
    saveScoreForm.reset();

    // Call the function to display the high scores
    displayHighScores();
});

function displayHighScores() {
    // Hide the results container and show the high scores container
    resultsContainer.style.display = "none";
    highScoresContainer.style.display = "block";

    // Retrieve the "highScores" array from local storage or set it to an empty array if it doesn't exist
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Sort the "highScores" array by score in descending order
    highScores.sort((a, b) => b.score - a.score);

    // Clear the high scores list
    highScoresList.innerHTML = "";

    // Loop through the high scores
    for (let i = 0; i < highScores.length; i++) {
        // Create a list item for each high score
        let item = document.createElement("li");
        item.textContent = `${highScores[i].initials} - ${highScores[i].score}`;

        // Append the list item to the high scores list
        highScoresList.appendChild(item);
    }

}

// hides everything on the page besides the scoreboard to be used with "see scores" button
function showScores() {
    displayHighScores();
    startButton.style.display = "none";
    quizContainer.style.display = "none";
    resultsContainer.style.display = "none";
    highScoresContainer.style.display = "block";
}

// Add an event listener to the back button to reload the page to start the quiz over
backButton.addEventListener("click", () => {
    window.location.reload();
});

// Add an event listener to the clear button to clear the high scores from local storage
clearButton.addEventListener("click", () => {
    localStorage.clear();
    highScoresList.innerHTML = "";
});

// Add an event listener to the see scores button to call the showScores function
seeScores.addEventListener("click", () => {
    startButton.style.display = "none";
    quizContainer.style.display = "none";
    resultsContainer.style.display = "none";
    highScoresContainer.style.display = "block";
    showScores();


});



// Add an event listener to the start button to call the startQuiz function
startButton.addEventListener("click", startQuiz);






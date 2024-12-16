// Project Title: Interactive Quiz App
// Overview
// Build a Quiz Web App featuring multiple questions, dynamic score tracking, progress indicators, and feedback for correct or incorrect answers.
//  The project will use HTML for structure, CSS for layout and styling, and JavaScript for core functionality and interactivity.

// Core Objectives
// 1 Display a list of quiz questions one at a time.
// 2 Track user answers and keep score.
// 3 Give immediate feedback (correct/incorrect) and a final score summary at the end.
// 4 Use an external JavaScript file for functionality and external CSS for styling.

// Store quiz questions in a JavaScript array (or an external JSON file for advanced usage). Each question object should at least contain:
// js

// {
//   question: "String",
//   choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
//   correctAnswerIndex: 1  // numeric index of the correct choice
// }
// Alternatively, fetch these questions from a local questions.json or an API (e.g., Open Trivia Database) if you want to practice AJAX/fetch.

// HTML Structure

// Header / Navbar
// A simple title, e.g., “JavaScript Quiz.”
// Main Container
// A section to display one question at a time and the possible multiple-choice answers.
// A Next button to move to the next question.
// A Score or Progress Indicator (“Question 3 of 10” or a progress bar).
// Footer
// Might hold your name, the date, or some additional links.

// CSS Styling

// Use an external styles.css file to style the quiz.
// Ensure the quiz is responsive: it should be legible on both desktop and mobile.
// Use consistent colors, fonts, and spacing.
// Add hover effects or animations on buttons (optional but nice for polish).
// JavaScript Logic (this is the biggest part!)

// Question Rendering

// Dynamically insert the question text and the multiple-choice answers into the DOM.
// When the user selects an answer and clicks “Submit” or “Next,” your script should check correctness and update the score.
// Score Tracking
// Maintain a variable to keep track of how many questions the user has answered correctly.

// Feedback

// Immediately or after pressing “Submit,” highlight the chosen answer in green if correct, or red if incorrect.
// Update the scoreboard or a progress bar.
// Progression
// Move to the next question automatically or on a button click.
// If it’s the last question, show a “Finish” or “View Results” button instead.
// Results / Restart
// When the quiz ends, display a summary: “You got 7 out of 10 correct!”
// Optionally, let the user restart the quiz from the beginning.


// Quiz questions


const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
      correctAnswerIndex: 2,
    },
    {
      question: "What is 2 + 2?",
      choices: ["3", "4", "5", "6"],
      correctAnswerIndex: 1,
    },
    {
      question: "What is the capital of Lithuania?",
      choices: ["Berlin", "Kaunas", "Vilnius", "Panevezys"],
      correctAnswerIndex: 2,
    },
    {
        question: "What is 2 + 5?",
        choices: ["3", "4", "5", "7"],
        correctAnswerIndex: 3,
    },
    {
        question: "What is biggest river of Lithuania?",
        choices: ["Nevezis", "Sventoji", "Nemunas", "Neris"],
        correctAnswerIndex: 2,
    },
    {
        question: "What is 5 * 5",
        choices: ["3", "20", "10", "25"],
        correctAnswerIndex: 3,
    },
    {
        question: "What color is grass?",
        choices: ["blue", "red", "green", "yellow"],
        correctAnswerIndex: 2,
    },
    {
        question: "What is 50 / 10?",
        choices: ["1", "4", "5", "6"],
        correctAnswerIndex: 2,
    },
    {
        question: "What is largest planet in Solar system?",
        choices: ["Mars", "Earth", "Jupiter", "Venus"],
        correctAnswerIndex: 2,
    },
    {
        question: "What is 60 - 20?",
        choices: ["30", "40", "50", "60"],
        correctAnswerIndex: 1,
    },    
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");
const resultsContainer = document.getElementById("results-container");
const resultsEl = document.getElementById("results");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  // Clear previous choices
  choicesEl.innerHTML = "";

  // Render choices
  currentQuestion.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.dataset.index = index;
    li.addEventListener("click", selectAnswer);
    choicesEl.appendChild(li);
  });

  progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function selectAnswer(event) {
  const selectedChoice = event.target;
  const selectedAnswerIndex = parseInt(selectedChoice.dataset.index, 10);
  const correctAnswerIndex = questions[currentQuestionIndex].correctAnswerIndex;

  // Highlight correct/incorrect answers
  if (selectedAnswerIndex === correctAnswerIndex) {
    selectedChoice.style.backgroundColor = "green";
    score++;
  } else {
    selectedChoice.style.backgroundColor = "red";
  }

  // Disable all choices
  Array.from(choicesEl.children).forEach((li) => {
    li.removeEventListener("click", selectAnswer);
  });

  nextBtn.disabled = false;
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }

  nextBtn.disabled = true;
}

function showResults() {
  questionContainer.classList.add("hidden");
  resultsContainer.classList.remove("hidden");  
  resultsEl.textContent = `You scored ${score} out of ${questions.length}!`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  questionContainer.classList.remove("hidden");
  resultsContainer.classList.add("hidden");
  showQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

// Initialize quiz
showQuestion();
nextBtn.disabled = true;
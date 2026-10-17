// Core quiz logic.
// This file has NO browser (DOM) code so it can be tested with Node.js.

/**
 * Returns a new array with the items in random order.
 * The original array is not changed.
 */
function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Returns true when the selected option is the correct one.
 */
function isCorrect(question, selectedIndex) {
  return question.answer === selectedIndex;
}

function assertQuizState(state) {
  if (
    state === null ||
    typeof state !== "object" ||
    !Array.isArray(state.questions) ||
    !Number.isInteger(state.current) ||
    !Number.isInteger(state.score)
  ) {
    throw new TypeError("state must be a valid quiz state");
  }
}

function createQuiz(questions) {
  if (!Array.isArray(questions)) {
    throw new TypeError("questions must be an array");
  }
  return { questions: [...questions], current: 0, score: 0 };
}

function answerQuestion(state, selectedIndex) {
  assertQuizState(state);
  const question = state.questions[state.current];
  if (!question) {
    throw new RangeError("there is no current question to answer");
  }

  const correct = isCorrect(question, selectedIndex);
  return {
    state: { ...state, score: state.score + (correct ? 1 : 0) },
    correct,
  };
}

function advanceQuiz(state) {
  assertQuizState(state);
  return { ...state, current: state.current + 1 };
}

function isQuizFinished(state) {
  assertQuizState(state);
  return state.current >= state.questions.length;
}

/**
 * Formats the remaining countdown seconds for display.
 */
function formatTimeLeft(seconds) {
  if (!Number.isInteger(seconds) || seconds < 0) {
    throw new TypeError("seconds must be a non-negative integer");
  }
  return `⏱ ${seconds}s`;
}

/**
 * Converts a score into a whole-number percentage (0-100).
 */
function calculatePercentage(score, total) {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

/**
 * Turns a percentage into a grade.
 * A = 90% or more, B = 75% or more, C = 50% or more.
 */
function getGrade(percentage) {
  if (percentage >= 90) return "A";
  if (percentage >= 75) return "B";
  if (percentage >= 50) return "C";
  return "Keep practicing";
}

// Returns an encouraging message for a grade: "A", "B", "C" or anything else
function getFeedbackMessage(grade) {
  switch (grade) {
    case "A":
      return "Excellent work!";
    case "B":
      return "Good job!";
    case "C":
      return "You can do better!";
    default:
      return "Keep practicing!";
  }
}

// Lets Node.js tests load this file. Browsers ignore this block.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    shuffle,
    isCorrect,
    createQuiz,
    answerQuestion,
    advanceQuiz,
    isQuizFinished,
    formatTimeLeft,
    calculatePercentage,
    getGrade,
    getFeedbackMessage,
  };
}

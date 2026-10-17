// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
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
} = require("../src/quiz.js");

test("createQuiz creates a fresh state when given questions", () => {
  const questions = [{ answer: 0 }];
  const state = createQuiz(questions);

  assert.deepEqual(state, { questions, current: 0, score: 0 });
  assert.notEqual(state.questions, questions);
});

test("createQuiz creates an empty state when given no questions", () => {
  assert.deepEqual(createQuiz([]), { questions: [], current: 0, score: 0 });
});

test("createQuiz rejects null when given an invalid question list", () => {
  assert.throws(() => createQuiz(null), TypeError);
});

test("answerQuestion adds a point without mutation when the answer is correct", () => {
  const state = { questions: [{ answer: 1 }], current: 0, score: 0 };
  const result = answerQuestion(state, 1);

  assert.equal(result.correct, true);
  assert.deepEqual(result.state, { questions: state.questions, current: 0, score: 1 });
  assert.deepEqual(state, { questions: [{ answer: 1 }], current: 0, score: 0 });
  assert.notEqual(result.state, state);
});

test("answerQuestion leaves the score unchanged when the answer is wrong", () => {
  const state = { questions: [{ answer: 1 }], current: 0, score: 2 };
  const result = answerQuestion(state, 0);

  assert.equal(result.correct, false);
  assert.equal(result.state.score, 2);
  assert.equal(state.score, 2);
});

test("answerQuestion treats a timeout as incorrect when no option is selected", () => {
  const result = answerQuestion(
    { questions: [{ answer: 1 }], current: 0, score: 0 },
    null
  );

  assert.equal(result.correct, false);
  assert.equal(result.state.score, 0);
});

test("answerQuestion rejects null when state is invalid", () => {
  assert.throws(() => answerQuestion(null, 0), TypeError);
});

test("advanceQuiz returns a new state when moving to the next question", () => {
  const state = { questions: [{ answer: 0 }, { answer: 1 }], current: 0, score: 1 };
  const nextState = advanceQuiz(state);

  assert.deepEqual(nextState, { questions: state.questions, current: 1, score: 1 });
  assert.equal(state.current, 0);
  assert.notEqual(nextState, state);
});

test("isQuizFinished returns false when questions remain", () => {
  assert.equal(isQuizFinished({ questions: [{}, {}], current: 1, score: 0 }), false);
});

test("isQuizFinished returns true when all questions are complete", () => {
  assert.equal(isQuizFinished({ questions: [{}], current: 1, score: 0 }), true);
});

test("isQuizFinished returns true when the quiz is empty", () => {
  assert.equal(isQuizFinished(createQuiz([])), true);
});

test("isQuizFinished rejects null when state is invalid", () => {
  assert.throws(() => isQuizFinished(null), TypeError);
});

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("formatTimeLeft formats a positive countdown", () => {
  assert.equal(formatTimeLeft(15), "⏱ 15s");
});

test("formatTimeLeft formats the urgent countdown boundary", () => {
  assert.equal(formatTimeLeft(5), "⏱ 5s");
});

test("formatTimeLeft formats zero seconds", () => {
  assert.equal(formatTimeLeft(0), "⏱ 0s");
});

test("formatTimeLeft rejects invalid seconds", () => {
  for (const seconds of [null, undefined, "", -1, 1.5]) {
    assert.throws(() => formatTimeLeft(seconds), TypeError);
  }
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getGrade includes the A boundary at 90%", () => {
  assert.equal(getGrade(90), "A");
  assert.equal(getGrade(89), "B");
});

test("getGrade includes the B boundary at 75%", () => {
  assert.equal(getGrade(75), "B");
  assert.equal(getGrade(74), "C");
});

test("getGrade includes the C boundary at 50%", () => {
  assert.equal(getGrade(50), "C");
  assert.equal(getGrade(49), "Keep practicing");
});

test("getFeedbackMessage returns the A message for an A grade", () => {
  assert.equal(getFeedbackMessage("A"), "Excellent work!");
});

test("getFeedbackMessage returns the B message for a B grade", () => {
  assert.equal(getFeedbackMessage("B"), "Good job!");
});

test("getFeedbackMessage returns the C message for a C grade", () => {
  assert.equal(getFeedbackMessage("C"), "You can do better!");
});

test("getFeedbackMessage returns the default message for other grades", () => {
  assert.equal(getFeedbackMessage("D"), "Keep practicing!");
  assert.equal(getFeedbackMessage(null), "Keep practicing!");
});

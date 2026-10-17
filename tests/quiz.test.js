// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  shuffle,
  isCorrect,
  formatTimeLeft,
  calculatePercentage,
  getGrade,
  getFeedbackMessage,
} = require("../src/quiz.js");

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

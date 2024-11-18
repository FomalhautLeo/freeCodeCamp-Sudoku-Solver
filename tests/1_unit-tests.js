const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
let solver;

suite("Unit Tests", () => {
  const solver = new Solver();

  test("Logic handles a valid puzzle string of 81 characters", function () {
    assert.isTrue(
      solver.validate(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      )
    );
  });
  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function () {
    assert.isFalse(
      solver.validate(
        "AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      )
    );
  });
  test("Logic handles a puzzle string that is not 81 characters in length", function () {
    assert.isFalse(
      solver.validate(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6."
      )
    );
  });
  test("Logic handles a valid row placement", function () {
    assert.isTrue(
      solver.checkRowPlacement(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        0,
        0,
        7
      )
    );
  });
  test("Logic handles an invalid row placement", function () {
    assert.isFalse(
      solver.checkRowPlacement(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        0,
        0,
        1
      )
    );
  });
  test("Logic handles a valid column placement", function () {
    assert.isTrue(
      solver.checkColPlacement(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        0,
        0,
        7
      )
    );
  });
  test("Logic handles an invalid column placement", function () {
    assert.isFalse(
      solver.checkColPlacement(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        0,
        0,
        1
      )
    );
  });
  test("Logic handles a valid region (3x3 grid) placement", function () {
    assert.isTrue(
      solver.checkRegionPlacement(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        0,
        0,
        7
      )
    );
  });
  test("Logic handles an invalid region (3x3 grid) placement", function () {
    assert.isFalse(
      solver.checkRegionPlacement(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        0,
        0,
        9
      )
    );
  });
  test("Valid puzzle strings pass the solver", function () {
    assert.notEqual(
      solver.solve(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      ),
      ""
    );
  });
  test("Invalid puzzle strings fail the solver", function () {
    assert.strictEqual(
      solver.solve(
        "AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      ),
      ""
    );
  });
  test("Solver returns the expected solution for an incomplete puzzle", function () {
    assert.strictEqual(
      solver.solve(
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
      ),
      "769235418851496372432178956174569283395842761628713549283657194516924837947381625"
    );
  });
});

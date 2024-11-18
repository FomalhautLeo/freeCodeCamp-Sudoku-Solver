"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  const solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    console.log("== Check: ", req.body);
    const puzzle = req.body.puzzle;
    const coordinate = req.body.coordinate;
    let value = req.body.value;

    let resJson = {};
    if (!puzzle || !coordinate || !value) {
      resJson = { error: "Required field(s) missing" };
    } else if (!/^[A-Ia-i][1-9]$/.test(coordinate)) {
      resJson = { error: "Invalid coordinate" };
    } else if (!/^[1-9]$/.test(value)) {
      resJson = { error: "Invalid value" };
    } else if (puzzle.length !== 81) {
      resJson = { error: "Expected puzzle to be 81 characters long" };
    } else if (!solver.validate(puzzle)) {
      resJson = { error: "Invalid characters in puzzle" };
    } else {
      const conflict = [];
      const row = coordinate.toLowerCase().charCodeAt(0) - 97;
      const col = coordinate[1] - "1";
      const index = solver.getIndex(row, col);
      if (puzzle[index] !== ".") {
        resJson = { valid: true };
      } else {
        if (!solver.checkRowPlacement(puzzle, row, col, value)) {
          conflict.push("row");
        }
        if (!solver.checkColPlacement(puzzle, row, col, value)) {
          conflict.push("column");
        }
        if (!solver.checkRegionPlacement(puzzle, row, col, value)) {
          conflict.push("region");
        }
        if (conflict.length === 0) {
          resJson = {
            valid: true,
          };
        } else {
          resJson = {
            valid: false,
            conflict,
          };
        }
      }
    }
    console.log("-- Send: ", resJson);
    res.json(resJson);
  });

  app.route("/api/solve").post((req, res) => {
    console.log("== Solve: ", req.body);
    const puzzle = req.body.puzzle;
    let resJson = {};
    if (!puzzle) {
      resJson = { error: "Required field missing" };
    } else if (puzzle.length !== 81) {
      resJson = { error: "Expected puzzle to be 81 characters long" };
    } else if (!solver.validate(puzzle)) {
      resJson = { error: "Invalid characters in puzzle" };
    } else {
      const ret = solver.solve(puzzle);
      if (ret === "") {
        resJson = { error: "Puzzle cannot be solved" };
      } else {
        resJson = { solution: ret };
      }
    }
    console.log("-- Send: ", resJson);
    res.json(resJson);
  });
};

class SudokuSolver {
  getIndex(row, column) {
    return row * 9 + column;
  }
  validate(puzzleString) {
    return /^[\d.]{81}$/.test(puzzleString);
  }

  stringToArr(puzzleString) {
    return puzzleString
      .replace(/\./g, "0")
      .split("")
      .map((char) => Number(char));
  }

  checkPositions(numbers, positionArr) {
    const numberMap = Array(10).fill(0);
    for (const position of positionArr) {
      const number = numbers[position];
      // the value has already appeared
      if (numberMap[number] > 0) return false;
      // update record
      numberMap[number] = number;
    }
    return true;
  }

  getCellNum(index) {
    return Math.floor(index / 27) * 3 + Math.floor((index % 9) / 3);
  }

  getCellPositions(cellNum) {
    const cellStart = Math.floor(cellNum / 3) * 18 + 3 * cellNum;
    let ret = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        ret.push(cellStart + j + i * 9);
      }
    }
    return ret;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const index = this.getIndex(row, column);
    let numbers = this.stringToArr(puzzleString);
    numbers[index] = value;
    const positionArr = [];
    for (let i = 0; i < 9; i++) {
      positionArr.push(this.getIndex(row, i));
    }
    return this.checkPositions(numbers, positionArr);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const index = this.getIndex(row, column);
    let numbers = this.stringToArr(puzzleString);
    numbers[index] = value;
    const positionArr = [];
    for (let i = 0; i < 9; i++) {
      positionArr.push(this.getIndex(i, column));
    }
    return this.checkPositions(numbers, positionArr);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const index = this.getIndex(row, column);
    let numbers = this.stringToArr(puzzleString);
    numbers[index] = value;
    const cellNum = this.getCellNum(index);
    return this.checkPositions(numbers, this.getCellPositions(cellNum));
  }

  solve(puzzleString) {
    if (!this.validate(puzzleString)) return "";
    if (puzzleString.length === 0) return "";
    let row = -1;
    let col = -1;
    let index = -1;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        index = this.getIndex(i, j);
        if (puzzleString[index] === ".") {
          row = i;
          col = j;
          break;
        }
      }
      if (row >= 0) break;
    }
    // all dots filled
    if (row < 0) return puzzleString;

    for (let n = 1; n <= 9; n++) {
      const newString = puzzleString.replace(".", String(n));
      if (
        this.checkRowPlacement(newString, row, col, n) &&
        this.checkColPlacement(newString, row, col, n) &&
        this.checkRegionPlacement(newString, row, col, n)
      ) {
        const curRet = this.solve(newString);
        if (curRet.length > 0) return curRet;
      }
    }
    return "";
  }
}

module.exports = SudokuSolver;

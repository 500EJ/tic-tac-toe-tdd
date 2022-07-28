const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {
  constructor() {
    this.playerTurn = "X";

    this.grid = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "]
    ];

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);
    this.cursor.setBackgroundColor();

    Screen.addCommand("up", "move up", () => {
      this.cursor.up();
    });
    Screen.addCommand("down", "move down", () => {
      this.cursor.down();
    });
    Screen.addCommand("left", "move left", () => {
      this.cursor.left();
    });
    Screen.addCommand("right", "move right", () => {
      this.cursor.right();
    });
    Screen.addCommand("space", "place move", () => {
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
      this.grid[this.cursor.row][this.cursor.col] = this.playerTurn;
      const winner = TTT.checkWin(this.grid);
      this.playerTurn === "X"
        ? (this.playerTurn = "O")
        : (this.playerTurn = "X");
      Screen.render();
      if (winner) TTT.endGame(winner);
    });

    Screen.render();
  }

  static _horizontalWin(grid) {
    if (grid.some(row => row.every(char => char === "X"))) {
      return "X";
    } else if (grid.some(row => row.every(char => char === "O"))) {
      return "O";
    }
  }

  static _verticalWin(grid) {
    const cols = [];
    for (let i = 0; i < grid.length; i++) {
      const col = [];
      for (let j = 0; j < grid.length; j++) {
        col.push(grid[j][i]);
      }
      cols.push(col);
    }
    return TTT._horizontalWin(cols);
  }

  static _diagonalWin(grid) {
    if (
      grid[0][0] === grid[1][1] &&
      grid[1][1] === grid[2][2] &&
      grid[0][0] !== " "
    ) {
      return grid[0][0];
    }
    if (
      grid[0][2] === grid[1][1] &&
      grid[1][1] === grid[2][0] &&
      grid[0][2] !== " "
    ) {
      return grid[0][2];
    }
  }

  static _tie(grid) {
    if (grid.every(row => row.every(char => char !== " "))) return "T";
  }

  static checkWin(grid) {
    return (
      TTT._horizontalWin(grid) ||
      TTT._verticalWin(grid) ||
      TTT._diagonalWin(grid) ||
      TTT._tie(grid) ||
      false
    );
  }

  static endGame(winner) {
    if (winner === "O" || winner === "X") {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === "T") {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
}

module.exports = TTT;

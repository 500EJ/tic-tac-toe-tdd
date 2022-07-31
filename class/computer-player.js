const TTT = require("./ttt");

class ComputerPlayer {
  static getValidMoves(grid) {
    const validMoves = [];
    grid.forEach((row, i) =>
      row.forEach((char, j) => {
        if (char === " ") validMoves.push({ row: i, col: j });
      })
    );
    return validMoves;
  }

  static randomMove(grid) {
    const validMoves = ComputerPlayer.getValidMoves(grid);
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }

  static getWinningMoves(grid, symbol) {
    const winningMoves = [];
    ComputerPlayer.getValidMoves(grid).forEach(move => {
      const newGrid = grid.slice();
      newGrid[move.row] = newGrid[move.row].slice();
      newGrid[move.row][move.col] = symbol;
      if (TTT.checkWin(newGrid) === symbol) winningMoves.push(move);
    });
    return winningMoves;
  }

  static getTraps(grid, symbol) {}

  static getSmartMove(grid, symbol) {
    const winning = ComputerPlayer.getWinningMoves(grid, symbol);
    if (winning.length) return winning[0];
    const block = ComputerPlayer.getWinningMoves(
      grid,
      symbol === "X" ? "O" : "X"
    );
    if (block.length) return block[0];
    if (grid[1][1] === " ") return { row: 1, col: 1 };
    return ComputerPlayer.randomMove(grid);
  }
}

module.exports = ComputerPlayer;

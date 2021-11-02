import React, { useState } from "react";
import TicTacToeContext from "./TicTacToeContext";

function Provider({ children }) {
  const [ticTacToe, setTicTacToe] = useState({
    activePlayer: 1,
    gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  const victoryArchivedInLine = (gameBoard) => {
    for (let i = 0; i <= 6; i += 3) {
      if (
        gameBoard[i] === gameBoard[i + 1]
        && gameBoard[i + 1] === gameBoard[i + 2]
        && gameBoard[i] !== 0
      ) return gameBoard[i];
    }
    return false;
  }

  const victoryArchivedInColumn = (gameBoard) => {
    for (let i = 0; i <= 2; i += 1) {
      if (
        gameBoard[i] === gameBoard[i + 3]
        && gameBoard[i + 3] === gameBoard[i + 6]
        && gameBoard[i] !== 0
      ) return gameBoard[i];
    }
    return false;
  }

  const victoryArchivedInDiagonals = (gameBoard) => {
    if (gameBoard[4] === 0) return false;
    if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8]) {
      return gameBoard[0];
    }
    if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6]) {
      return gameBoard[2];
    }
    return false;
  }

  const resetGame = () => {
    setTicTacToe({
      activePlayer: 1,
      gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    })
  }

  const toggleActivePlayer = () => {
    if (ticTacToe.activePlayer === 1) return 2;
    return 1;
  }

  const updateState = (cellClicked) => {
    const newState = [...ticTacToe.gameBoard];
    let newActivePlayer = ticTacToe.activePlayer;

    if (ticTacToe.gameBoard[cellClicked] === 0) {
      newState[cellClicked] = ticTacToe.activePlayer;
      newActivePlayer = toggleActivePlayer();
    } else newState[cellClicked] = ticTacToe.gameBoard[cellClicked];

    setTicTacToe({
      activePlayer: newActivePlayer,
      gameBoard: newState,
    });
  }

  const victoryArchieved = () => {
    return (
      victoryArchivedInLine(ticTacToe.gameBoard)
      || victoryArchivedInColumn(ticTacToe.gameBoard)
      || victoryArchivedInDiagonals(ticTacToe.gameBoard)
    );
  }

  const context = {
    ticTacToe,
    victoryArchieved,
    updateState,
    toggleActivePlayer,
    resetGame,
  };

  return (
    <TicTacToeContext.Provider value={ context }>
      { children }
    </TicTacToeContext.Provider>
  );
}

export default Provider;
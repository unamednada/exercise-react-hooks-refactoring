import React, { useContext } from 'react';
import TicTacToeContext from './context/TicTacToeContext';
import GameBoard from './GameBoard';

function TicTacToe() {
  const { ticTacToe: { gameBoard }, resetGame, victoryArchieved, updateState } = useContext(TicTacToeContext);

  const renderButton = () => {
    return (
      <button
        type="button"
        onClick={resetGame}
        data-testid="restart-button"
      >
        Recomeçar Jogo
      </button>
    );
  }

  const win = victoryArchieved();
  if (!gameBoard.includes(0) && !win) {
    return (
      <>
        {renderButton()}
        <h1>Empate</h1>
      </>
    );
  }
  return (
    <>
      {renderButton()}
      {(!win)
        ? (
          <GameBoard
            gameState={gameBoard}
            updateGame={updateState}
          />
        )
        : <h1>{`Player ${win === 2 ? 'O' : 'X'} Ganhou`}</h1>}
    </>
  );
}

export default TicTacToe;

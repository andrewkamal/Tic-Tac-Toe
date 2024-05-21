import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";

import Player from "./components/Player";
import GameBoard from "./components/Gameboard";
import Logs from "./components/Logs";
import GameOver from "./components/GameOver";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") currentPlayer = "O";
  else currentPlayer = "X";

  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const activePlayer = derivedActivePlayer(gameTurn);

  let gameBoard = [...initialBoard.map((array) => [...array])];
  let winner;

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
    console.log(gameBoard);
  }

  for (const comb of WINNING_COMBINATIONS) {
    const firstSqrSmbl = gameBoard[comb[0].row][comb[0].column];
    const secondSqrSmbl = gameBoard[comb[1].row][comb[1].column];
    const thirdSqrSmbl = gameBoard[comb[2].row][comb[2].column];

    if (
      firstSqrSmbl &&
      firstSqrSmbl === secondSqrSmbl &&
      firstSqrSmbl === thirdSqrSmbl
    ) {
      winner = players[firstSqrSmbl];
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSqrSelect(rowIndex, colIndex) {
    setGameTurn((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updateTurns;
    });
  }
  function restartGame() {
    setGameTurn([]);
  }
  function nameChanged(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={nameChanged}
          ></Player>
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={nameChanged}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={restartGame}></GameOver>
        )}
        <GameBoard onSelectSqr={handleSqrSelect} board={gameBoard}></GameBoard>
      </div>
      <Logs turns={gameTurn}></Logs>
    </main>
  );
}

export default App;

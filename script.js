const Gameboard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => board;
  
    const updateCell = (index, marker) => {
      if (board[index] === "") {
        board[index] = marker;
        return true;
      }
      return false;
    };
  
    const checkWin = (marker) => {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
      ];
  
      return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] === marker && board[b] === marker && board[c] === marker;
      });
    };
  
    const checkTie = () => {
      return board.every(cell => cell !== "");
    };
  
    return {
      getBoard,
      updateCell,
      checkWin,
      checkTie,
    };
  })();
  
  const Player = (name, marker) => {
    return { name, marker };
  };

const DisplayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const startButton = document.getElementById("startButton");
    const player1NameInput = document.getElementById("player1Name");
    const player2NameInput = document.getElementById("player2Name");
    const messageDisplay = document.getElementById("message");
  
    let player1, player2, currentPlayer;
    let gameEnded = false; 
  
    startButton.addEventListener("click", () => {
      player1 = Player(player1NameInput.value, "X");
      player2 = Player(player2NameInput.value, "O");
      currentPlayer = player1;
      messageDisplay.textContent = `${currentPlayer.name}'s turn`;
  
      cells.forEach((cell, index) => {
        cell.textContent = "";
        cell.addEventListener("click", () => handleCellClick(cell, index));
      });
  
      startButton.disabled = true;
      gameEnded = false; 
    });
  
    const handleCellClick = (cell, index) => {
      if (gameEnded || !Gameboard.updateCell(index, currentPlayer.marker)) {
        return;
      }
  
      cell.textContent = currentPlayer.marker;
      if (Gameboard.checkWin(currentPlayer.marker)) {
        messageDisplay.textContent = `${currentPlayer.name} wins!`;
        disableCellClick();
        gameEnded = true; 
      } else if (Gameboard.checkTie()) {
        messageDisplay.textContent = "It's a tie!";
        disableCellClick();
        gameEnded = true; 
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        messageDisplay.textContent = `${currentPlayer.name}'s turn`;
      }
    };
  
    const disableCellClick = () => {
      cells.forEach((cell) => {
        cell.removeEventListener("click", handleCellClick);
      });
      startButton.disabled = false;
    };
  })();
  
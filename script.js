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
     
    };
  
    const checkTie = () => {
      
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
  
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!Gameboard.updateCell(index, currentPlayer.marker)) {
          return;
        }
  
        cell.textContent = currentPlayer.marker;
        if (Gameboard.checkWin(currentPlayer.marker)) {
          
        } else if (Gameboard.checkTie()) {
          
        } else {
          
          currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
      });
    });
  })();
  
  let player1 = Player("Player 1", "X");
  let player2 = Player("Player 2", "O");
  let currentPlayer = player1;
  
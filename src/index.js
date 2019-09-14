import "./styles.css";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

if (document.readyState !== "loading") {
  // Document ready, executing
  console.log("Document ready, executing");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    //body.appendChild(tbl); // Document was not ready, executing when loaded
    console.log("Document ready, executing after a wait");
    initializeCode();
  });
}

function initializeCode() {
  console.log("Initializing");
  var board = document.getElementById("board");
  generatetable(board);
  clicker(board);
}

//Handles player interaction with the gameboard
function clicker(board) {
  let playerID = 2;
  let winner = 0;
  if (board != null) {
    for (var i = 0; i < board.rows.length; i++) {
      for (var j = 0; j < board.rows[i].cells.length; j++)
        board.rows[i].cells[j].onclick = function() {
          playerID = placeval(this, playerID);
          winner = winCheck(board);
          if (winner === true) {
            restart(board);
          } else if (winner === false) {
            restart(board);
          }
        };
    }
  }
}

//Places values in the gameboard based on player number
function placeval(cell, playerID) {
  if (cell.innerHTML === "") {
    if (playerID % 2 === 0 && cell.innerHTML !== "O") {
      cell.innerHTML = "X";
      playerID = playerID + 1;
    } else if (playerID % 2 !== 0 && cell.innerHTML !== "X") {
      cell.innerHTML = "O";
      playerID = playerID - 1;
    }
  }
  return playerID;
}

function winCheck(board) {
  //Check rows
  for (var i = 0; i < 5; i++) {
    if (
      document.getElementById(i + "," + 0).innerHTML === "X" &&
      document.getElementById(i + "," + 1).innerHTML === "X" &&
      document.getElementById(i + "," + 2).innerHTML === "X" &&
      document.getElementById(i + "," + 3).innerHTML === "X" &&
      document.getElementById(i + "," + 4).innerHTML === "X"
    ) {
      alert("Player 1 won!");
      return true;
    } else if (
      document.getElementById(i + "," + 0).innerHTML === "O" &&
      document.getElementById(i + "," + 1).innerHTML === "O" &&
      document.getElementById(i + "," + 2).innerHTML === "O" &&
      document.getElementById(i + "," + 3).innerHTML === "O" &&
      document.getElementById(i + "," + 4).innerHTML === "O"
    ) {
      alert("Player 2 won!");
      return true;
    }
  }

  //Check columns
  for (let j = 0; j < 5; j++) {
    if (
      document.getElementById(0 + "," + j).innerHTML === "X" &&
      document.getElementById(1 + "," + j).innerHTML === "X" &&
      document.getElementById(2 + "," + j).innerHTML === "X" &&
      document.getElementById(3 + "," + j).innerHTML === "X" &&
      document.getElementById(4 + "," + j).innerHTML === "X"
    ) {
      alert("Player 1 won!");
      return true;
    } else if (
      document.getElementById(0 + "," + j).innerHTML === "O" &&
      document.getElementById(1 + "," + j).innerHTML === "O" &&
      document.getElementById(2 + "," + j).innerHTML === "O" &&
      document.getElementById(3 + "," + j).innerHTML === "O" &&
      document.getElementById(4 + "," + j).innerHTML === "O"
    ) {
      alert("Player 2 won!");
      return true;
    }
  }

  //Check diagonals
  if (
    document.getElementById(0 + "," + 0).innerHTML === "X" &&
    document.getElementById(1 + "," + 1).innerHTML === "X" &&
    document.getElementById(2 + "," + 2).innerHTML === "X" &&
    document.getElementById(3 + "," + 3).innerHTML === "X" &&
    document.getElementById(4 + "," + 4).innerHTML === "X"
  ) {
    alert("Player 1 won!");
    return true;
  } else if (
    document.getElementById(0 + "," + 0).innerHTML === "O" &&
    document.getElementById(1 + "," + 1).innerHTML === "O" &&
    document.getElementById(2 + "," + 2).innerHTML === "O" &&
    document.getElementById(3 + "," + 3).innerHTML === "O" &&
    document.getElementById(4 + "," + 4).innerHTML === "O"
  ) {
    alert("Player 2 won!");
    return true;
  } else if (
    document.getElementById(4 + "," + 0).innerHTML === "X" &&
    document.getElementById(3 + "," + 1).innerHTML === "X" &&
    document.getElementById(2 + "," + 2).innerHTML === "X" &&
    document.getElementById(1 + "," + 3).innerHTML === "X" &&
    document.getElementById(0 + "," + 4).innerHTML === "X"
  ) {
    alert("Player 1 won!");
    return true;
  } else if (
    document.getElementById(4 + "," + 0).innerHTML === "O" &&
    document.getElementById(3 + "," + 1).innerHTML === "O" &&
    document.getElementById(2 + "," + 2).innerHTML === "O" &&
    document.getElementById(1 + "," + 3).innerHTML === "O" &&
    document.getElementById(0 + "," + 4).innerHTML === "O"
  ) {
    alert("Player 2 won!");
    return true;
  }

  //Checks if board is full
  if (hasSpace(board) !== true) {
    alert("Draw!");
    return false;
  }
}

//Checks if board as any empty cells. If empty cells exists returns true
function hasSpace(board) {
  if (board != null) {
    for (let i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        if (document.getElementById(i + "," + j).innerHTML === "") {
          return true;
        }
      }
    }
  }
}

//Generates A 5x5 table
function generatetable(table) {
  for (let i = 0; i < 5; i++) {
    let tr = table.insertRow(i);
    for (var j = 0; j < 5; j++) {
      if (i === 5 && j === 5) {
        break;
      } else {
        let td = tr.insertCell(j);
        td.setAttribute("id", i + "," + j);
      }
    }
  }
}

function restart(board) {
  if (board != null) {
    for (let i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        document.getElementById(i + "," + j).innerHTML = "";
      }
    }
    clicker(board);
  }
}

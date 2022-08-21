/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  board = Array(HEIGHT).fill().map(() => Array(WIDTH).fill());
  

  /** springboard's answer */
  // for (let y = 0; y < HEIGHT; y++) {
  //   board.push(Array.from({ length: WIDTH }));
  // }

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   const htmlBoard = document.getElementById('board');

  // TODO: Clickable top row of the board where game piece will be dropped
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
 
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
    top.style.backgroundColor = "#9700cc";
  }
  htmlBoard.append(top);

  // Main board below top row. 
  // Create cells where game pieces will go. Each cell will have an id and the cell will append to a row, which will then be appended to htmlBoard
  for (let y = 0; y < HEIGHT; y++) {
    let row = document.createElement("tr");
    
    for (let x = 0; x < WIDTH; x++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // Need to start searching at index where y = 5, which is the last row
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (board[y][x] === undefined) {
      return y;
    }
  }
  return null;

  /** Springboard's answer **
  for (let y = HEIGHT -1; y >=0; y--){ // HEIGHT - 1, since we want to check row index at the bottom of the board first
    if (!board[y][x]) { // if cell is empty return y
      return y;
    }
  }
  return null;

  */
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.classList.add("piece");

  currPlayer === 1 ? piece.classList.add("p1") : piece.classList.add("p2");

  /* ** Springboard's answer **
    
  piece.classList.add(`p${currPlayer}`); 

  */

  /** append game piece to td (cell) that was created up top */
  document.getElementById(`${y}-${x}`).append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */    

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    const top = document.querySelector("#column-top");
    top.removeEventListener("click", handleClick);
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  if (board.every((row) => row.every((col) => col !== undefined))) {
    endGame("Tie!");
  }

  /***  Springboard's answer ***

  if (board.every((row) => row.every((cell) => cell))) {
    return endGame("It's a tie!");
  }

***/


  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
  const top = document.querySelector('#column-top');
  p1_color = "#9700cc";
  p2_color = "#f6019d";
  if(currPlayer===2){
    top.style.backgroundColor = p2_color;
  }
  else{
    top.style.backgroundColor = p1_color;
  }


  /*** Springboard's answer ***
  
  currPlayer = currPlayer === 1 ? 2 : 1 
  
  ***/
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // [0,0], [0,1], [0,2], [0,3)] 
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

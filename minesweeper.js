class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  playMove (rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === ' B ') {
      console.log("There was a bomb on that tile. \nGAME OVER");
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log("Congrats avoided all the bombs. \nYOU WIN!")
    } else {
      console.log("Current Board:");
      this._board.print();
    }
  }
}


class Board {
  constructor (numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    // Why is _numberOfTiles -> _numberOfEmptySpaces in Solution
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard () {
    return this._playerBoard;
  }


  flipTile (rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== '   '){
      console.log("This tile has already been flipped!");
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === ' B '){
      this._playerBoard[rowIndex][columnIndex] = ' B ';
    } else {
      this._playerBoard[rowIndex][columnIndex] = " " + this.getNumberofNeighborBombs(rowIndex, columnIndex) + " ";
    }
    // soultion marks this as _numberOfEmptySpaces
    this._numberOfTiles--;
  }

  getNumberofNeighborBombs (rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach( offset => {
      const neighborRowIndex = offset[0] + rowIndex;
      const neighborColumnindex = offset[1] + columnIndex;
      //check this one
      if (neighborRowIndex >= 0 &&
        neighborRowIndex < this._bombBoard.length &&
        neighborColumnindex >= 0 &&
        neighborColumnindex < this._bombBoard[0].length) {
        if (this._bombBoard[neighborRowIndex][neighborColumnindex] === ' B '){
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles () {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print () {
    // why is this 'row' not 'this._row'
    console.log(this._playerBoard.map(row => row.join('|')).join('\n'));
  }

  static generatePlayerBoard (numberOfRows, numberOfColumns) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let columnIndex = 0 ; columnIndex < numberOfColumns; columnIndex++){
        row.push('   ');
      }
      board.push(row);
    }
    return board;
  }
  static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
  // Building the bomb board size/structure to overwrite
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let columnIndex = 0 ; columnIndex < numberOfColumns; columnIndex++){
        row.push(null);
      }
      board.push(row);
    }
    // Random placing of the bombs on the board.
    // Will only place if bomb doesn't currently exist.
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random()*numberOfRows);
      let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== ' B ') {
        board[randomRowIndex][randomColumnIndex] = ' B ';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
}

/*
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board:')
printboard(playerBoard);
console.log('\n Bomb Board:');
printboard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0 );
console.log('\n Updated Player Board:');
printboard(playerBoard);
*/

const g = new Game (3,3,3);
g.playMove(0,0);

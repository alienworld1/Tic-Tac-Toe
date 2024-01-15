const GameMaster = (function() {
    const gameBoard = {
        board: [['', '', ''], ['', '', ''], ['', '', '']],

        checkIfOccupied: (xPosition, yPosition) => {
            if (board[yPosition][xPosition]) return true;
            return false; 
        },

        placeSymbol: (symbol, xPosition, yPosition) => {
            board[yPosition][xPosition] = symbol;
        }
    };

    const gameController = {
        playMove: (player, xPosition, yPosition) => {
            if (gameBoard.checkIfOccupied(xPosition, yPosition)) {
                console.log("This square is occupied.");
                return -1;
            }
            
            gameBoard.placeSymbol(player.symbol, xPosition, yPosition);
        },

        evaluateBoard: () => {
            // Returns 1 if the game is not over, 0 if it is a tie
            // and the winning player's symbol in case of a winner.
            
            for (let i = 0; i < 3; i++) {
                
                // Checking rows
                if (gameBoard.board[i][0] === gameBoard.board[i][1] === gameBoard.board[i][2] && gameBoard.board[i][0]) {
                    return gameBoard.board[i][0];
                }

                // Checking columns
                if (gameBoard.board[0][i] === gameBoard.board[1][i] === gameBoard.board[2][i] && gameBoard.board[0][i]) {
                    return gameBoard.board[0][i];
                }
            }

            // Checking diagonals
            if (gameBoard.board[1][1]) {
                if (gameBoard.board[0][0] === gameBoard.board[1][1] === gameBoard.board[2][2]) return gameBoard.board[0][0];
                if (gameBoard.board[0][2] === gameBoard.board[1][1] === gameBoard.board[2][0]) return gameBoard.board[0][2];
            }            

            // Checking if the board is full, (for a tie)
            gameBoard.board.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) return 1;
                });
            });

            return 0;
            
        }
    }

    return {
        gameController,
    }
})();

function Player(name, startsFirst) {
    let symbol = startsFirst? "X" : "O";

    return {
        name,
        symbol,
    };
}
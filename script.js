const GameMaster = (function() {
    const gameBoard = {
        board: [['', '', ''], ['', '', ''], ['', '', '']],

        checkIfOccupied: (xPosition, yPosition) => {
            if (gameBoard.board[yPosition][xPosition]) return true;
            return false; 
        },

        placeSymbol: (symbol, xPosition, yPosition) => {
            gameBoard.board[yPosition][xPosition] = symbol;
        },

        reset: () => {
            gameBoard.board = [['', '', ''], ['', '', ''], ['', '', '']];
        },
    };

    const gameController = {
        playMove: (player, xPosition, yPosition) => {
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
                if (gameBoard.board[0][i] === gameBoard.board[1][i] && gameBoard.board[1][i] === gameBoard.board[2][i] && gameBoard.board[0][i]) {
                    return gameBoard.board[0][i];
                }
            }

            // Checking diagonals
            if (gameBoard.board[1][1]) {
                if (gameBoard.board[0][0] === gameBoard.board[1][1] && gameBoard.board[1][1] === gameBoard.board[2][2]) return gameBoard.board[0][0];
                if (gameBoard.board[0][2] === gameBoard.board[1][1] && gameBoard.board[1][1] ===  gameBoard.board[2][0]) return gameBoard.board[0][2];
            }            

            // Checking if the board is full, (for a tie)
            for (const row of gameBoard.board) {
                for (const cell of row) {
                    if (!cell) return 1;
                }
            }

            return 0;
            
        },
    }

    let playerX;
    let playerO;
    let currentTurn;

    function gameIsOver() {
        return (gameController.evaluateBoard() != 1);
    }

    function initializePlayers(player1, player2) {
        if (player1.symbol === "X") {
            playerX = player1;
            playerO = player2;
        }

        else {
            playerX = player2;
            playerO = player1;
        }

        currentTurn = playerX;
    }

    function getCurrentTurn() {
        // if (gameIsOver()) return;
        return currentTurn;
    }

    function playMove(xPosition, yPosition) {
        // if (gameIsOver()) return;

        if (gameBoard.checkIfOccupied(xPosition, yPosition)) {
            return -1;
        }

        gameController.playMove(currentTurn, xPosition, yPosition);

        currentTurn = (currentTurn === playerX)? playerO : playerX;
    }

    const ConsoleController = {
        printBoard: () => {
            gameBoard.board.forEach((row) => {
                console.log(row);
            })
        },
    }

    const getResult = () => gameController.evaluateBoard();

    return {
        initializePlayers,
        getCurrentTurn,
        playMove,
        ConsoleController,
        gameIsOver,
        getResult,
    }

})();

const UIController = (function() {
    function createSquare(content = "") {
        const square = document.createElement("div");
        square.classList.add("square");
        square.textContent = content;

        return square;
    }
})();

function Player(name, startsFirst) {
    let symbol = startsFirst? "X" : "O";

    return {
        name,
        symbol,
    };
}

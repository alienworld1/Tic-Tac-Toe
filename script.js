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
                if (gameBoard.board[i][0] === gameBoard.board[i][1] && gameBoard.board[i][1] === gameBoard.board[i][2] && gameBoard.board[i][0]) {
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

    function getBoard() {
        return gameBoard.board;
    }

    const getResult = () => gameController.evaluateBoard();

    return {
        initializePlayers,
        getCurrentTurn,
        playMove,
        getBoard,
        gameIsOver,
        getResult,
    }

})();

const UIController = (function() {

    const board = document.querySelector("#board");

    function removeAllChildElements(parentNode) {
        while (parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild);
        }
    }

    function createSquare(content = "") {
        const square = document.createElement("div");
        square.classList.add("square");
        square.textContent = content;

        return square;
    }

    function playMove(event) {
        const positon = event.currentTarget.id;
        const coordinates = positon.split(" ");
        const xPos = +coordinates[0];
        const yPos = +coordinates[1];
        GameMaster.playMove(xPos, yPos);
        refreshBoard();

        if (GameMaster.gameIsOver()) {
            
        } 
    }

    function drawBoard(boardArray) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++){
                let content = boardArray[i][j];

                const square = createSquare(content);
                square.id = `${j} ${i}`;

                if (!content) square.addEventListener("click", playMove);
                else square.classList.add("no-click");
                board.appendChild(square);
            }
        }
    }

    function refreshBoard() {
        removeAllChildElements(board);
        const gameBoard = GameMaster.getBoard();
        drawBoard(gameBoard);
    }

    return {
        refreshBoard,
    }

})();

function Player(name, startsFirst) {
    let symbol = startsFirst? "X" : "O";

    return {
        name,
        symbol,
    };
}

UIController.refreshBoard();
const player1 = Player("player1", true);
const player2 = Player("player2", false);
GameMaster.initializePlayers(player1, player2);
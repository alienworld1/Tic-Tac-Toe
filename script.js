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
const GameMaster = (function() {
    const gameBoard = {
        board: [['', '', ''], ['', '', ''], ['', '', '']],

        checkIfOccupied: (xPosition, yPosition) => {
            if (board[yPosition][xPosition]) return true;
            return false; 
        },
    };

    const gameController = {
        playMove: (player, xPosition, yPosition) => {
            
        }
    }

    return {
        gameBoard,
    }
})();

function Player(name, startsFirst) {
    let symbol = startsFirst? "X" : "O";

    return {
        name,
        symbol,
    };
}
const GameMaster = (function() {
    const gameBoard = {
        board: [[], [], []],
    };

    return {
        gameBoard,
    }
})();

function Player(name, startsFirst) {
    const symbol = startsFirst? "X" : "O";
    
    return {
        name,
        symbol,
    };
}
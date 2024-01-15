const GameMaster = (function() {
    const gameBoard = {
        board: [[], [], []],
    };

    return {
        gameBoard,
    }
})();

function Player(name) {
    return {
        name,
    };
}
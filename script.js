
const gameBoard = (function (){
    var board = [[null,null,null],[null,null,null],[null,null,null]];

    const clearBoard = function(){
        board = [[null,null,null],[null,null,null],[null,null,null]];
    }

    const setCell = function(id, val){
        var valInt = 0;
        if(val == "X") valInt = 1;
        board[Math.floor(id/3)][id%3] = val;
    }

    const checkWin = function(id, val){
        var valInt = 0;
        if(val == "X") valInt = 1;
        const x = Math.floor(id/3);
        const y = id%3;

        var rowTotal = 0;
        var colTotal = 0;
        var diagTotal = 0;
        var negDiagTot = 0;

        for(var i=0; i<3; i ++){
            rowTotal += gameBoard[x][i];
            colTotal += gameBoard[i][y];
            diagTotal += gameBoard[i][i];
            negDiagTot += gameBoard[2-i][2-i];
        }

        if(rowTotal == valInt*3 && gameBoard[x][0] != null) return true;
        if(colTotal == valInt*3 && gameBoard[0][x] != null) return true;
        if(diagTotal == valInt*3 && gameBoard[0][0] != null) return true;
        if(negDiagTot == valInt*3 && gameBoard[1][1] != null) return true;

        return false;
    }

    return {clearBoard, setCell, checkWin}
})();

const displayController = (function(){
    const gameCells = document.getElementsByClassName("game-cell");

    for(var gameCell in gameCells){
        gameCell.addEve
    }
})()
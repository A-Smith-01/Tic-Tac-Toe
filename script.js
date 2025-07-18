const winDialog = document.querySelector("dialog");
const resetBtn = document.querySelector("dialog > button");
const winner = document.querySelector("dialog > p")

const gameBoard = (function (){
    var board = [[10,10,10],[10,10,10],[10,10,10]];

    const clearBoard = function(){
        board = [[10,10,10],[10,10,10],[10,10,10]];
    }

    const setCell = function(id, val){
        var valInt = 0;
        if(val == "X") valInt = 1;
        board[Math.floor(id/3)][id%3] = valInt;
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
            rowTotal += board[x][i];
            colTotal += board[i][y];
            diagTotal += board[i][i];
            negDiagTot += board[i][2-i];
        }

        if(rowTotal == valInt*3) return true;
        if(colTotal == valInt*3) return true;
        if(diagTotal == valInt*3) return true;
        if(negDiagTot == valInt*3) return true;

        return false;
    }

    return {clearBoard, setCell, checkWin}
})();

const displayController = (function(gameBoard){
    const gameCells = document.querySelectorAll("div.game-cell");
    console.log(gameCells);
    var activeVal = "X";

    gameCells.forEach(gameCell =>{
        gameCell.addEventListener("click", () => {
            const id = gameCell.id;
            const val = gameCell.textContent;
            if(gameCell.classList.contains("empty")){
                gameBoard.setCell(id,val);
                gameCell.classList.remove("empty");
                switchVal();
                if (gameBoard.checkWin(id, val)){
                    console.log("Winner");
                    winner.textContent = val;
                    winDialog.showModal();
                }
            }
        });
    });

    const resetBoard = function(){
        gameBoard.clearBoard();
        activeVal = "X";
        gameCells.forEach(cell => {
            cell.textContent = activeVal;
            if(!cell.classList.contains("empty")) cell.classList.add("empty")
        })
    }

    const switchVal = function(){
        if(activeVal == "X"){
            activeVal = "O"
        }else{
            activeVal = "X"
        }

        gameCells.forEach(gameCell => {
            if(gameCell.classList.contains("empty")){
                gameCell.textContent = activeVal;
            }
        });
    }

    return {resetBoard}
})(gameBoard);

resetBtn.addEventListener("click", () => {
    displayController.resetBoard();
    winDialog.close();
})
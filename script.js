function createPlayer(symbol){
    var name = symbol;
    const getName = () => name;
    const getSymbol = () => symbol;
    const setName = (newName) => name = newName;

    return {getName, setName, getSymbol}
}

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
        console.log("Win not detected");
        return false;
    }

    return {clearBoard, setCell, checkWin}
})();

const game = (function(gameBoard){
    const players = [createPlayer('X'),createPlayer('O')];
    var playCount = 0;
    var currentPlayer = 0;

    const getCurrentPlayer = () => {
        return players[currentPlayer].getName();
    }

    const getCurrentSymbol = () => {
        return players[currentPlayer].getSymbol();
    }

    const setPlayers = (player1, player2) => {
        players[0].setName(player1);
        players[1].setName(player2);
    }

    const makePlay = (idx) => {
        console.log(currentPlayer)
        // Set cell in grid
        gameBoard.setCell(idx,players[currentPlayer].getSymbol())
        playCount++;

        // Check for win or stalemate
        var result = "none";
        if(gameBoard.checkWin(idx, getCurrentSymbol())){
            result = "win"
        }else if(playCount == 9){
            result = "draw"
        }
        return result;
    }

    const switchPlayer = () => {
        currentPlayer = 1 - currentPlayer;
        console.log(`player switched to ${getCurrentPlayer()} (${currentPlayer})`)
    }

    const reset = () => {
        currentPlayer = 0;
        playCount = 0;
        gameBoard.clearBoard();
    }

    return {getCurrentPlayer, getCurrentSymbol,setPlayers, makePlay,switchPlayer, reset}
})(gameBoard)

const displayController = (function(game){
    const resetBtn = document.querySelector("#reset");
    const player1In = document.querySelector("#p1");
    const player2In = document.querySelector("#p2");
    const submitBtn = document.querySelector("button#submit");
    const setupDialog = document.querySelector(".setup");
    const gameCells = document.querySelectorAll("div.game-cell");
    const status = document.querySelector("p.status")
    console.log(gameCells);
    var activeVal = "X";



    const init = () => {
        bindEvents();
    };

    const bindEvents = () => {
        resetBtn.addEventListener("click", () => resetBoard());
        submitBtn.addEventListener("click", () => startGame());

        gameCells.forEach(gameCell =>{
            gameCell.addEventListener("click", () => {
                // Get id and val
                const id = gameCell.id;

                // Check if valid box
                if(!gameCell.classList.contains("empty")) return;

                // Make move and update text
                var moveResult = game.makePlay(id);
                console.log(moveResult);
                gameCell.classList.remove("empty");

                if(!(moveResult == "none")) updateText(moveResult);
                game.switchPlayer();
                switchVal();
                if(moveResult == "none") updateText(moveResult);
            });
        });
    }

    const startGame = () => {
        // Validate text input
        if(!inputNotEmpty(player1In.value, player2In.value)){
            alert("Both players must have names!");
            return;
        }

        game.setPlayers(player1In.value,player2In.value);
        updateText("none");
        closeModal();
    }

    const resetBoard = function(){
        game.reset();
        gameCells.forEach(cell => {
            cell.textContent = game.getCurrentSymbol();
            if(!cell.classList.contains("empty")) cell.classList.add("empty")
        })
        updateText("none");
    }

    const switchVal = function(){
        gameCells.forEach(gameCell => {
            if(gameCell.classList.contains("empty")){
                gameCell.textContent = game.getCurrentSymbol();
            }
        });
    }

    const closeModal = function(){
        setupDialog.classList.add("hidden");
    }

    const inputNotEmpty = function(p1, p2){
        if(p1 != "" && p2 != "") return true;
        return false;
    }

    const updateText = (result) =>{
        if(result == "none"){
            status.textContent = `${game.getCurrentPlayer()}'s Turn!`
        }else if(result == "win"){
            status.textContent = `${game.getCurrentPlayer()} Wins!`
        }else{
            status.textContent = `It's a Tie!`
        }
    }

    return {init}
})(game);

displayController.init();
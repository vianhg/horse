var board, moves = 34;
var nbOfMovesForBonus = 4;
var lifes = 1, level = 4;

function createBoard () {
    board = new Array(8);
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(8);
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = 0;
        };
    };
}

function clearBoard() {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = 0;
            var c = document.getElementById("c"+i+j);
            c.innertHTML = "";
            //c.style.background = "black";
        };
    };
}

function initVals() {
    switch(level) {
    case 1:
        nbOfMovesForBonus = 4;
        break;
    case 2:
        nbOfMovesForBonus = 5;
        break;
    case 3:
        nbOfMovesForBonus = 6;
        break;
    case 4:
        nbOfMovesForBonus = 7;
        break;
    case 5:
        nbOfMovesForBonus = 10;
        break;
    default:
        break;
    } 
}

function paintRow(n) {
    for (var j = 0; j < board[n].length; j++) {
        board[n][j] = 1;
        moves--;
        var c = document.getElementById("c"+n+j);
        c.innerHTML = "<img alt='' src='knight.svg'>";
        c.style.background = "lightgray";
        c.style.boxShadow = "";
    };
}

function paintCol(n) {
    for (var i = 0; i < board.length; i++) {
        board[i][n] = 1;
        moves--;
        var c = document.getElementById("c"+i+n);
        c.innerHTML = "<img alt='' src='knight.svg'>";
        c.style.background = "lightgray";
        c.style.boxShadow = "";
    };
}

function paintLevel() {
    clearBoard();
    switch(level) {
    case 2:
        paintCol(6);
        break;
    case 3:
        paintRow(6);
        break;
    case 4:
        paintCol(0);
        paintCol(1);
        paintCol(2);
        paintCol(3);
        break;
    case 5:
        paintRow(0);
        paintRow(1);
        paintRow(2);
        paintRow(3);
        break;
    default:
        break;
    }
}
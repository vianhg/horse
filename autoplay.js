var nbOptions = 0, lastX, lastY, bonus = 0;


function isVisited (x, y) {
	return (board[x][y] == 1)
}

function isValid (x, y) {
	if (x > 7 || x < 0|| y > 7 || y < 0) {
		return false;
	}

	if (isVisited(x, y)) {
		return false;
	}

	if (Math.abs(lastX - x) + Math.abs(lastY - y) == 3) {
		return true;
	};

	if ((nbOptions  == 0) && (bonus > 0)) {
		return true;
	};

	return false;
}

function paintBonus(x, y) {
	var c = document.getElementById("c"+x+y);
	c.style.background = "green";
	c.innerHTML = "<img alt='' src='bonus.gif'>";
}

function setOneBonus() {
	var x = Math.floor((Math.random() * 8));
	var y = Math.floor((Math.random() * 8));
	if (!isVisited(x, y)) {
		board[x][y] = 2;
		paintBonus(x, y);
	};
}

function checkBonus () {
	if (moves%nbOfMovesForBonus == 0) {
		setOneBonus();
	};
}

function showMessage(title, msg) {		
	document.getElementById("message").style.display = "block";
	document.getElementById("notification").innerHTML = title;
	document.getElementById("data_message").innerHTML = msg + document.getElementById("min").innerHTML + ":" + document.getElementById("sec").innerHTML;
	setTimeOut(2000, newGame);
}

function newGame() {
	resetTime();

	if (moves == 0) {
		level++;
	} else if (lifes == 0) {
		level = 1;
		lifes = 0;
	}
	paintLevel();
}

function checkWin () {
	if (moves == 0) {
		showMessage("You won!", "Congrats");
		
	};
}

function checkGameOver (nbOfOptions) {
	if (nbOfOptions == 0 && bonus == 0) {
		showMessage("Game over", "Keep trying");
		resetTime();	
		newGame(0);
	};
}

function setMoves () {
	moves--;
	var m = document.getElementById("moves");
	m.innerHTML = moves;
	checkWin();
	checkBonus();
}


function setOpt (x, y) {
	if (isValid(x, y)) {
		nbOptions++; 
		var c = document.getElementById("c"+x+y);
		c.style.boxShadow = "inset 0px 0px 6px gold,	inset 0px 0px 2px gold,	inset 0px 0px 15px gold";
	}
}

function setOptions (x, y) {
	nbOptions = 0;
	setOpt(x+1, y+2);
	setOpt(x+1, y-2);
	setOpt(x+2, y+1);
	setOpt(x+2, y-1);
	setOpt(x-1, y+2);
	setOpt(x-1, y-2);
	setOpt(x-2, y+1);
	setOpt(x-2, y-1);

	var m = document.getElementById("optind");
	m.innerHTML = nbOptions;
	checkGameOver(nbOptions);
}

function unsetOpt (x, y) {
	var c = document.getElementById("c"+x+y);
	if (c != null) { //Si existe (no está fuera del tablero)
		c.style.boxShadow = "";
	}
}

function unsetOldOptions (x, y) {
	if (typeof lastX != "undefined" && lastX != x) {
		unsetOpt(lastX+1, lastY+2);
		unsetOpt(lastX+1, lastY-2);
		unsetOpt(lastX+2, lastY+1);
		unsetOpt(lastX+2, lastY-1);
		unsetOpt(lastX-1, lastY+2);
		unsetOpt(lastX-1, lastY-2);
		unsetOpt(lastX-2, lastY+1);
		unsetOpt(lastX-2, lastY-1);
	}
}

function getBonus (x, y) {
	if (board[x][y] == 2) {
		bonus++;
		document.getElementById("bonusind").innerHTML = bonus;
	};
}

function checkUseBonus () {
	if (nbOptions == 0) {
		bonus--;		
		document.getElementById("bonusind").innerHTML = bonus;
	};
}

function selectCell (x, y) {
	checkUseBonus();
	getBonus(x, y);
	board[x][y] = 1;
	var c = document.getElementById("c"+x+y);
	c.style.background = "green";
	c.innerHTML = "<img alt='' src='knight.svg'>";
	setMoves();
	if (typeof lastX != "undefined") {
		c = document.getElementById("c"+lastX+lastY);
		c.style.background = "lightgray";
		c.style.boxShadow = "";
	};
	unsetOldOptions(x, y);
	lastX = x;
	lastY = y;

	setOptions(x, y);	
}

function initBoard () {
	var f = false;
	while (!f) {
		lastX = Math.floor((Math.random() * 8));
		lastY = Math.floor((Math.random() * 8));
		if (!isVisited(lastX, lastY)) {
			f = true;
			selectCell(lastX, lastY);
		}
	}	
}

function visitCell(x, y) {
	if (isValid(x, y)) {
		selectCell(x, y);
	};
}

function paintIndicators() {
	document.getElementById("lifes").innerHTML = level;
}

function play () {
	createBoard();
	initVals();
	paintIndicators();
	paintLevel();

	initBoard();

	resetTime();
    startTime();
}
play();


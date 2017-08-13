var crono, seconds = 10;

function resetTime () {
    var m = document.getElementById("min");
	var s = document.getElementById("sec");
	m.innerHTML = "00";
	s.innerHTML = "00";
	seconds = 0;
	clearInterval(crono);
}
function setTime() {
    var m = document.getElementById("min");
	var s = document.getElementById("sec");
	s.innerHTML = ("0" + seconds%60).slice(-2);
	m.innerHTML = ("0" + Math.floor(seconds/60)).slice(-2);
	seconds++;
} 

function startTime () {
	crono = setInterval(setTime, 1000);
}
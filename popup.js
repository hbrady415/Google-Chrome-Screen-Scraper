function checkTime(i) {
	if (i < 10) {
	  i = "0" + i;
	}
	return i;
}

var today = new Date();
var h = today.getHours();
var m = today.getMinutes();
var seconds = today.getSeconds();
m = checkTime(m);
seconds = checkTime(seconds);
document.getElementById("pagetitle").innerHTML = "Time: " + h + ":" +  m + ":" + seconds;
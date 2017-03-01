//
// main.js
// TEDxBahcesehir - 2017
//

function _ext_links() {
	var anchors = document.querySelectorAll("A");
	for(var i=0;i<anchors.length;i++) {
		if(anchors[i].attributes.href.value.substring(0,2) === "//" || anchors[i].attributes.href.value.substring(0,4) === "http") {
			anchors[i].target = "_blank";
		}
		continue;
	};
	return;
}

function start() {
	_ext_links();
	fix_images();
	_menus();
	return;
}

var firstTime = true;
window.onhashchange = (function(e) {
	//console.log(this,e,window.location);
	if(window.location.hash.length > 1 && window.location.hash[1] === '!') {
		document.getElementById("main").style.opacity = "0";
		document.getElementById("loader").style.visibility = "";
		var toload = window.location.hash.substring(2) + ".htm";
		var req = new XMLHttpRequest();
		req.responseType = "text";
		req.onload = (function(e) {
			if(this.status !== 200)
				return;
			//console.log(this,e);
			document.getElementById("main").innerHTML = this.response;
			window.scrollTo(0,0);
			if(!firstTime) {
				menuToggle();
			} else {
				firstTime = false;
			}
			document.body.style.overflow = "auto";
			document.children[0].style.overflow = "auto";
			start();
			setTimeout(function(e) {
				document.getElementById("loader").style.visibility = "hidden";
				document.getElementById("main").style.opacity = "";
				return;
			}, 99);
			return;
		});
		req.open("GET", toload, true);
		req.send(null);
		start();
		return false;
	}
	return true;
});

window.onscroll = (function(e) {
//	if(navigator.userAgent.toLowerCase().indexOf("chrome") < 0)
	document.getElementsByTagName("nav")[0].style.backgroundPosition = "0 -" + (window.scrollY) + "px";
		return;
	document
		.getElementById("main")
		//.getElementsByClassName("container")[0]
		.getElementsByTagName("h1")[0]
		.style.filter = "blur(" + Math.min((window.scrollY/25),10) + "px)";
	return;
});

function menuToggle() {
	var nav = document.getElementsByTagName("nav")[0];
	var main = document.getElementById("main");
	document.body.style.overflow = (nav.style.left == 0)?"hidden":null;
	document.children[0].style.overflow = (nav.style.left == 0)?"hidden":null;
	nav.style.width = ((nav.style.width) == 0)?"280px":null;
	nav.style.left = (!nav.style.left)?"0px":null;
//	main.style.marginLeft = ((main.style.marginLeft) == 0)?"280px":null;
//	var menu = document.getElementsByTagName("nav")[1];
//	menu.style.left = (menu.style.left == 0)?"216px":null;
	return;
}

window.addEventListener("touchstart", function(t) {
	this["tStart"] = [
		t.touches[0].pageX,
		t.touches[0].pageY,
	];
	return;
});

let c = 25;
let m = 80;
window.addEventListener("touchmove", function(t) {
	if(!this.tStart || this.lock) {
		return;
	}
	console.log(this.tStart, t.touches[0].pageX, t.touches[0].pageY);
	if( Math.round(this.tStart[1]/c) == Math.round(t.touches[0].pageY/c) ) {
		if( Math.abs(this.tStart[0] - t.touches[0].pageX) > m ) {
			this["lock"] = true;
			menuToggle();
		}
	}
	return;
});

window.addEventListener("touchend", function(t) {
	this["lock"] = false;
	return;
});

//
// main.js
// TEDxBahcesehir - 2017
//

function _ext_links() {
	var anchors = document.querySelectorAll("A");
	for(var i=0;i<anchors.length;i++) {
		if(anchors[i].attributes.href.value.substring(0,2) === "//") {
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

window.onhashchange = (function(e) {
	//console.log(this,e,window.location);
	if(window.location.hash.length > 1 && window.location.hash[1] === '!') {
		var toload = window.location.hash.substring(2) + ".htm";
		var req = new XMLHttpRequest();
		req.responseType = "text";
		req.onload = (function(e) {
			if(this.status !== 200)
				return;
			//console.log(this,e);
			document.getElementById("main").innerHTML = this.response;
			start();
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
	if(navigator.userAgent.toLowerCase().indexOf("chrome") < 0)
		return;
	document
		.getElementById("main")
		//.getElementsByClassName("container")[0]
		.getElementsByTagName("h1")[0]
		.style.filter = "blur(" + Math.min((window.scrollY/25),10) + "px)";
	return;
});

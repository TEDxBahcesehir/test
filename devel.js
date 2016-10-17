var last = {};

function refresh(url) {
	var xhr = new XMLHttpRequest();
	xhr.onloadend = function(e) {
		if(this.status != 200)
			return;
		clenstr = this.getResponseHeader("content-length");
		clen = parseInt(clenstr);
		if(last[url] === undefined)
			last[url] = clen;
		else if(last[url] === 0)
			last[url] = clen;
		else if(clen !== last[url])
			window.location.reload();
		return;
	}
	xhr.open("HEAD",url,true);
	xhr.send(null);
	return;
}

window.onload = function() {
	if(window.location.hostname == "localhost") {
		[
			window.location.toString(),
			"style.css",
			"devel.js",
			"main.js",
		].forEach(function(elem,index,orig) {
			setInterval("refresh('" + elem + "')",100);
			return;
		});
	}
	return;
};

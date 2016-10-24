var last = {};

function refresh(url) {
	var xhr = new XMLHttpRequest();
	xhr.onloadend = function(e) {
		if(this.status != 200)
			return;
		clenstr = this.getResponseHeader("content-length");
		clen = parseInt(clenstr);
		chinfo = this.getResponseHeader("etag");
		if(last[url] === undefined)
			last[url] = { "size": clen, "tag": chinfo, };
		else if(last[url].size === 0)
			last[url].size = clen;
		else if(clen !== last[url].size || chinfo !== last[url].tag)
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
			"home.htm",
			"team.htm",
		].forEach(function(elem,index,orig) {
			setInterval("refresh('" + elem + "')",999);
			return;
		});
	}
	if(window.location.hash.length > 0)
		window.onhashchange(null);
	else
		window.location.hash = "!home";
	return;
};

//
// main.js
// TEDxBahcesehir - 2017
//

function _menus() {
	var __elements = document.querySelectorAll("[collapsed]");
	for (var i=0;i<__elements.length;i++) {
		__elements[i].onclick = (function(e) {
			if(e.target != this)
				return;
			if(this.attributes.getNamedItem("collapsed"))
				this.removeAttribute("collapsed");
			else
				this.setAttribute("collapsed","");
			return;
		});
	}
};
_menus();

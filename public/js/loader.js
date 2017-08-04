var height = window.innerHeight;
var width = window.innerWidth;


(function() {
	
	var loader = document.getElementById("loader");
	loader.style.width = width+"px";
	loader.style.height = height+"px";
})();

var hide = function(){
	console.log("ij");
	var ids = document.getElementById('loader');
	ids.style.visibility = 'hidden';
	ids = document.getElementById('main');
	ids.style.visibility = 'visible	';
}
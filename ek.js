var imageFilenames = [];

imageFilenames [1] = "img/AY.jpg";
imageFilenames [2] = "img/c88.jpg";
imageFilenames [3] = "img/CA1.jpg";
imageFilenames [4] = "img/GB1.jpg";
imageFilenames [5] = "img/GB2.jpg";
imageFilenames [6] = "img/KY.jpg";
imageFilenames [7] = "img/LI.jpg";
imageFilenames [8] = "img/MW.jpg";
imageFilenames [9] = "img/NM.jpg";
imageFilenames [10] = "img/OS.jpg";
imageFilenames [11] = "img/TM.jpg";

var drawInReverse = [];

Event.observe(window, "load", init, false);

// smooth scroll to a div (event handler)
var handleScrollToId = function(e) {
	Event.stop(e);
	this.blur();
	this.onlick = function() { return false; };
	var scrolltoEl = $(this.scrolltoId);
}

function init() {
	// replace all links to named anchors, with a smooth scroll to the div that has id equal to specified name

	$$("a").each(function(el) {
		if( el.href && el.href.indexOf("#") > -1 ) {
			el.scrollToId = el.href.split("#")[1];
			el.observe("click", handleScrollToId.bind(el));
		}
	}); 

	// Display the divs from bottom to top so the document stays scrolled to the bottom as it grows,
	// and load the images from bottom to top so the bottom ones load first.
	// This is done as recursive function so there can be a delay between each call via setTimeout,
	// so that the browser's page display appears progressive and so that the JavaScript is non-blocking.
	drawInReverse = $$("div.drawinreverse");
	displayDiv(drawInReverse.length - 1);
}

function displayDiv(i, keepDistanceToBottom, scrollTop) {
	if (keepDistanceToBottom == undefined) keepDistanceToBottom = 0;
	var el = drawInReverse[i];
	// Load images in this div, also in reverse order within the div
	el.getElementsBySelector("img.drawinreverse").reverse().each(function(img) {
		img.src = "img/" + imageFilenames[parseInt(img.id.substr(5))];
		Event.observe(img, "click");
	});
	// Display this div
	el.setStyle({display: "block"});
	// Scroll to the bottom unless the user scrolls to somewhere other than where the 
	// previous call of this function scrolled to
	if ((scrollTop != undefined) && (scrollTop != document.body.scrollTop)) {
		keepDistanceToBottom = document.body.scrollHeight - document.body.scrollTop;
	}
	window.scrollTo(0, document.body.scrollHeight - keepDistanceToBottom);
	scrollTop = document.body.scrollTop;
	// Do the previous div
	if (i > 0) setTimeout(function() { displayDiv(i - 1, keepDistanceToBottom, scrollTop); }, 1);
	// Or display the navigation if we're done
	else {
		$$(".col-md-1").each(function(nav) { nav.setStyle({display: "block"}); });
	}
}




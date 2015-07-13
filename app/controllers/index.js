$.win.open();
if(Ti.Platform.osname != "android"){ 
	Alloy.Globals.navMenu = $.navMenu;
}

//define menu title and controller
var menu = [{id: 0, title: "Homepage", controller: 's_home'}, {id: 1, title: "Category", controller: 's_category'}, {id: 2, title: "Search", controller: 's_search'}];

///////////function////////////
//function for slide to the page
function goSlide(event){
	var index = event.source.mod;	
	var arrViews = $.scrollableView.getViews();
	
	moveHoverTo(index);
	setTitle(index);
	
	$.scrollableView.scrollToView(arrViews[index]);
}

//update title when move to next slide
function setTitle(index){
	$.title.text = menu[index]['title'];
}

//move Hover pointer
function changeTabColor(seed){
	var child = $.menu.children;
	var first = child[Math.floor(seed)];
	
	if((seed - Math.floor(seed)) == 0){
		for(var a = 0; a < child.length; a++){
			if(a == Math.floor(seed)){
				child[a].setBackgroundColor(rgbaToHex(255, 0, 0, 1));
			}else{
				child[a].setBackgroundColor(rgbaToHex(255, 0, 0, 0));
			}
		}
	}else{
		var second = child[Math.ceil(seed)];
		for(var a = 0; a < child.length; a++){
			if(a == Math.floor(seed) || a == Math.ceil(seed)){
				first.setBackgroundColor(rgbaToHex(255, 0, 0, Math.ceil(seed) - seed));
				second.setBackgroundColor(rgbaToHex(255, 0, 0, seed - Math.floor(seed)));
			}else{
				child[a].setBackgroundColor(rgbaToHex(255, 0, 0, 0));
			}
		}
	}
}

function rgbaToHex(r, g, b, a) {
    var toHex = function(n) {
        return ('00' + (n | 0).toString(16)).slice(-2);
    };
    return '#' + toHex(((a * 100) / 100) * 255) + toHex(r) + toHex(g) + toHex (b);
}

//move Hover pointer
function moveHoverTo(left){
	$.hover.left = (left*80)+'dp';
}

//when scrollend event fire, move the hover to correct place. 
function scrollend(event){
	moveHoverTo(event.currentPage);
	if(event.currentPage == 0){
		Ti.App.fireEvent('Ti:table_refresh');
	}
}

//when scrollend event fire, move the hover to correct place. 
function scroll(event){
	if(typeof event.currentPageAsFloat == "undefined"){
		return ;
	}
	moveHoverTo(event.currentPageAsFloat);
	changeTabColor(event.currentPageAsFloat);
	if(event.currentPage == 0){
		//Ti.App.fireEvent('Ti:table_refresh');
	}
}
//////////////eventListener///////////
$.scrollableView.addEventListener("scroll", scroll);

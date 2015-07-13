function open_scrollable_flip(){
	var win = Alloy.createController("scrollable_flip").getView(); 
	if(Ti.Platform.osname == "android"){ 
		console.log("noway");
		win.open(); 
	}else{
		Alloy.Globals.navMenu.openWindow(win,{animated:true});
	}
}
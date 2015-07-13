var args = arguments[0] || {};

function setAvatar(){
	var url = "http://www.appcelerator.com";
	 var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	 onload : function(e) {
	     Ti.API.info("Received text: " + this.responseText);
	 alert('success');
	 },
	 // function called when an error occurs, including a timeout
	 onerror : function(e) {
	     Ti.API.debug(e.error);
	     alert('error');
	 },
	 timeout : 5000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("POST", url);
	 // Send the request.
	 client.send();
	Titanium.Media.openPhotoGallery({
		success:function(event) {
			// called when media returned from the camera
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				var mod = require('bencoding.blur');
				
				var imageView = Ti.UI.createImageView({
					width: 100,
					height: 100,
					left: 20,
					borderRadius: 50,
					borderColor: "#ffffff",
					borderWidth: 5,
					image:event.media,
					zIndex: 12,
				});
	
				var bgView = Ti.UI.createView({
				    height:Ti.UI.FILL, width:Ti.UI.FILL,
				    backgroundImage: event.media,
				});
				
				if(Ti.Platform.osname == "android"){
					var imgblurredImage = mod.applyBlurTo({
						image: event.media,
						blurRadius: 40
					});
					var blurView = Ti.UI.createImageView({
						width:Ti.UI.FILL, height:Ti.UI.FILL,
						image:imgblurredImage
					});
				}else{
					var blurView = mod.createView({
					    height:Ti.UI.FILL,
					    width:Ti.UI.FILL,
					    blurLevel: 10, blurCroppedToRect:false,
					    backgroundView:bgView
					});
				}
				
				var bgTintView = Ti.UI.createView({
				    height:Ti.UI.FILL, width:Ti.UI.FILL,
				    backgroundColor: rgbaToHex(0,0,0,200),
				    zIndex: 10,
				});
				
				$.avatar_view.add(bgTintView);
				$.avatar_view.add(blurView);
				$.avatar_view.add(imageView);
				
				//$.avatar_view.add(backgroundImage);
			} else {
				alert("got the wrong type back ="+event.mediaType);
			}
		},
		cancel:function() {
			// called when user cancels taking a picture
		},
		error:function(error) {
			// called when there's an error
		},
	});
}

function rgbaToHex(r, g, b, a) {
    var toHex = function(n) {
        return ('00' + (n | 0).toString(16)).slice(-2);
    };
    return '#' + toHex(((a * 100) / 100) * 255) + toHex(r) + toHex(g) + toHex (b);
}

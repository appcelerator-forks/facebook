// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
var Cloud = require('ti.cloud');
Cloud.Users.create({
    email: 'test@mycompany.com',
    first_name: 'test_firstname',
    last_name: 'test_lastname',
    password: 'test_password',
    password_confirmation: 'test_password'
}, function (e) {
    if (e.success) {
        var user = e.users[0];
        alert('Success:\n' +
            'id: ' + user.id + '\n' +
            'sessionId: ' + Cloud.sessionId + '\n' +
            'first name: ' + user.first_name + '\n' +
            'last name: ' + user.last_name);
            cloud_login();
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});

function cloud_login(){
	Cloud.Users.login({
	    login: 'test@mycompany.com',
	    password: 'test_password'
	}, function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        alert('Success:\n' +
	            'id: ' + user.id + '\n' +
	            'sessionId: ' + Cloud.sessionId + '\n' +
	            'first name: ' + user.first_name + '\n' +
	            'last name: ' + user.last_name);
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

var XHR = require("lib/xhr");
var xhr = new XHR();

// Delete all expired documents (this method should be called at least once in your app)
xhr.clean();

// Delete all cached documents (expired or not, be very careful using this method)
//xhr.purge();
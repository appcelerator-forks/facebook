function cloud_login() {
    Cloud.Users.login({
        login: "test@mycompany.com",
        password: "test_password"
    }, function(e) {
        if (e.success) {
            var user = e.users[0];
            alert("Success:\nid: " + user.id + "\nsessionId: " + Cloud.sessionId + "\nfirst name: " + user.first_name + "\nlast name: " + user.last_name);
        } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var Cloud = require("ti.cloud");

Cloud.Users.create({
    email: "test@mycompany.com",
    first_name: "test_firstname",
    last_name: "test_lastname",
    password: "test_password",
    password_confirmation: "test_password"
}, function(e) {
    if (e.success) {
        var user = e.users[0];
        alert("Success:\nid: " + user.id + "\nsessionId: " + Cloud.sessionId + "\nfirst name: " + user.first_name + "\nlast name: " + user.last_name);
        cloud_login();
    } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
});

var XHR = require("lib/xhr");

var xhr = new XHR();

xhr.clean();

Alloy.createController("index");
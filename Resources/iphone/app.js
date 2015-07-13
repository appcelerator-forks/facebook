var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var XHR = require("lib/xhr");

var xhr = new XHR();

xhr.clean();

Alloy.createController("index");
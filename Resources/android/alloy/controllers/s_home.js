function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "s_home";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.homepage = Ti.UI.createView({
        id: "homepage",
        backgroundColor: "#eee"
    });
    $.__views.homepage && $.addTopLevelView($.__views.homepage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var CAL = require("calendar");
    var calendar = CAL.getCalendar();
    $.homepage.add(calendar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
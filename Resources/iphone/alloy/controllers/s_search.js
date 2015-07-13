function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function open_scrollable_flip() {
        var win = Alloy.createController("scrollable_flip").getView();
        if ("android" == Ti.Platform.osname) {
            console.log("noway");
            win.open();
        } else Alloy.Globals.navMenu.openWindow(win, {
            animated: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "s_search";
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
    var __defers = {};
    $.__views.search = Ti.UI.createView({
        id: "search",
        backgroundColor: "#ddd"
    });
    $.__views.search && $.addTopLevelView($.__views.search);
    $.__views.__alloyId8 = Ti.UI.createButton({
        title: "Scrollable Flip",
        width: "80%",
        height: "20",
        id: "__alloyId8"
    });
    $.__views.search.add($.__views.__alloyId8);
    open_scrollable_flip ? $.__views.__alloyId8.addEventListener("click", open_scrollable_flip) : __defers["$.__views.__alloyId8!click!open_scrollable_flip"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId8!click!open_scrollable_flip"] && $.__views.__alloyId8.addEventListener("click", open_scrollable_flip);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
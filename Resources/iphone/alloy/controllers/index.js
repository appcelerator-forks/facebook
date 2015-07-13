function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function goSlide(event) {
        var index = event.source.mod;
        var arrViews = $.scrollableView.getViews();
        moveHoverTo(index);
        setTitle(index);
        $.scrollableView.scrollToView(arrViews[index]);
    }
    function setTitle(index) {
        $.title.text = menu[index]["title"];
    }
    function changeTabColor(seed) {
        var child = $.menu.children;
        var first = child[Math.floor(seed)];
        if (seed - Math.floor(seed) == 0) for (var a = 0; a < child.length; a++) child[a].setBackgroundColor(a == Math.floor(seed) ? rgbaToHex(255, 0, 0, 1) : rgbaToHex(255, 0, 0, 0)); else {
            var second = child[Math.ceil(seed)];
            for (var a = 0; a < child.length; a++) if (a == Math.floor(seed) || a == Math.ceil(seed)) {
                first.setBackgroundColor(rgbaToHex(255, 0, 0, Math.ceil(seed) - seed));
                second.setBackgroundColor(rgbaToHex(255, 0, 0, seed - Math.floor(seed)));
            } else child[a].setBackgroundColor(rgbaToHex(255, 0, 0, 0));
        }
    }
    function rgbaToHex(r, g, b, a) {
        var toHex = function(n) {
            return ("00" + (0 | n).toString(16)).slice(-2);
        };
        return "#" + toHex(100 * a / 100 * 255) + toHex(r) + toHex(g) + toHex(b);
    }
    function moveHoverTo(left) {
        $.hover.left = 80 * left + "dp";
    }
    function scroll(event) {
        if ("undefined" == typeof event.currentPageAsFloat) return;
        moveHoverTo(event.currentPageAsFloat);
        changeTabColor(event.currentPageAsFloat);
        0 == event.currentPage;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        id: "win"
    });
    $.__views.titleContainer = Ti.UI.createView({
        backgroundColor: "#4c66a4",
        height: Ti.UI.SIZE,
        id: "titleContainer"
    });
    $.__views.win.add($.__views.titleContainer);
    $.__views.title = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: "18dp",
            fontFamily: "Helvetica Neue"
        },
        height: "42dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        left: "10dp",
        text: "Homepage",
        id: "title"
    });
    $.__views.titleContainer.add($.__views.title);
    $.__views.menu = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "#ccc",
        layout: "horizontal",
        id: "menu"
    });
    $.__views.win.add($.__views.menu);
    $.__views.__alloyId0 = Ti.UI.createImageView({
        height: Ti.UI.SIZE,
        width: "70dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "5dp",
        right: "5dp",
        backgroundColor: "rgba(255,0,0,255)",
        mod: "0",
        image: "/icons1.png",
        id: "__alloyId0"
    });
    $.__views.menu.add($.__views.__alloyId0);
    goSlide ? $.__views.__alloyId0.addEventListener("touchend", goSlide) : __defers["$.__views.__alloyId0!touchend!goSlide"] = true;
    $.__views.__alloyId1 = Ti.UI.createImageView({
        height: Ti.UI.SIZE,
        width: "70dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "5dp",
        right: "5dp",
        mod: "1",
        image: "/icons1.png",
        id: "__alloyId1"
    });
    $.__views.menu.add($.__views.__alloyId1);
    goSlide ? $.__views.__alloyId1.addEventListener("touchend", goSlide) : __defers["$.__views.__alloyId1!touchend!goSlide"] = true;
    $.__views.__alloyId2 = Ti.UI.createImageView({
        height: Ti.UI.SIZE,
        width: "70dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "5dp",
        right: "5dp",
        mod: "2",
        image: "/icons1.png",
        id: "__alloyId2"
    });
    $.__views.menu.add($.__views.__alloyId2);
    goSlide ? $.__views.__alloyId2.addEventListener("touchend", goSlide) : __defers["$.__views.__alloyId2!touchend!goSlide"] = true;
    $.__views.hover = Ti.UI.createView({
        backgroundColor: "#4c66a4",
        width: "80dp",
        height: "2dp",
        bottom: "0dp",
        left: "0dp",
        layout: "composite",
        id: "hover"
    });
    $.__views.win.add($.__views.hover);
    var __alloyId3 = [];
    $.__views.__alloyId4 = Alloy.createController("s_home", {
        id: "__alloyId4"
    });
    __alloyId3.push($.__views.__alloyId4.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId5 = Alloy.createController("s_category", {
        id: "__alloyId5"
    });
    __alloyId3.push($.__views.__alloyId5.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId6 = Alloy.createController("s_search", {
        id: "__alloyId6"
    });
    __alloyId3.push($.__views.__alloyId6.getViewEx({
        recurse: true
    }));
    $.__views.scrollableView = Ti.UI.createScrollableView({
        views: __alloyId3,
        id: "scrollableView",
        disableBounce: "true",
        showPagingControl: "false"
    });
    $.__views.win.add($.__views.scrollableView);
    $.__views.navMenu = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.win,
        id: "navMenu"
    });
    $.__views.navMenu && $.addTopLevelView($.__views.navMenu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.win.open();
    "android" != Ti.Platform.osname && (Alloy.Globals.navMenu = $.navMenu);
    var menu = [ {
        id: 0,
        title: "Homepage",
        controller: "s_home"
    }, {
        id: 1,
        title: "Category",
        controller: "s_category"
    }, {
        id: 2,
        title: "Search",
        controller: "s_search"
    } ];
    $.scrollableView.addEventListener("scroll", scroll);
    __defers["$.__views.__alloyId0!touchend!goSlide"] && $.__views.__alloyId0.addEventListener("touchend", goSlide);
    __defers["$.__views.__alloyId1!touchend!goSlide"] && $.__views.__alloyId1.addEventListener("touchend", goSlide);
    __defers["$.__views.__alloyId2!touchend!goSlide"] && $.__views.__alloyId2.addEventListener("touchend", goSlide);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
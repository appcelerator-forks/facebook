function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setAvatar() {
        Titanium.Media.openPhotoGallery({
            success: function(event) {
                Ti.API.debug("Our type was: " + event.mediaType);
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    var mod = require("bencoding.blur");
                    var imageView = Ti.UI.createImageView({
                        width: 100,
                        height: 100,
                        left: 20,
                        borderRadius: 50,
                        borderColor: "#ffffff",
                        borderWidth: 5,
                        image: event.media,
                        zIndex: 12
                    });
                    var bgView = Ti.UI.createView({
                        height: Ti.UI.FILL,
                        width: Ti.UI.FILL,
                        backgroundImage: event.media
                    });
                    if ("android" == Ti.Platform.osname) {
                        var imgblurredImage = mod.applyBlurTo({
                            image: event.media,
                            blurRadius: 40
                        });
                        var blurView = Ti.UI.createImageView({
                            width: Ti.UI.FILL,
                            height: Ti.UI.FILL,
                            image: imgblurredImage
                        });
                    } else var blurView = mod.createView({
                        height: Ti.UI.FILL,
                        width: Ti.UI.FILL,
                        blurLevel: 10,
                        blurCroppedToRect: false,
                        backgroundView: bgView
                    });
                    var bgTintView = Ti.UI.createView({
                        height: Ti.UI.FILL,
                        width: Ti.UI.FILL,
                        backgroundColor: rgbaToHex(0, 0, 0, 200),
                        zIndex: 10
                    });
                    $.avatar_view.add(bgTintView);
                    $.avatar_view.add(blurView);
                    $.avatar_view.add(imageView);
                } else alert("got the wrong type back =" + event.mediaType);
            },
            cancel: function() {},
            error: function() {}
        });
    }
    function rgbaToHex(r, g, b, a) {
        var toHex = function(n) {
            return ("00" + (0 | n).toString(16)).slice(-2);
        };
        return "#" + toHex(100 * a / 100 * 255) + toHex(r) + toHex(g) + toHex(b);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "s_category";
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
    $.__views.category = Ti.UI.createScrollView({
        backgroundColor: "#ededed",
        id: "category",
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE
    });
    $.__views.category && $.addTopLevelView($.__views.category);
    $.__views.avatar_view = Ti.UI.createView({
        id: "avatar_view",
        width: Ti.UI.FILL,
        height: "150"
    });
    $.__views.category.add($.__views.avatar_view);
    $.__views.__alloyId7 = Ti.UI.createButton({
        title: "Avatar",
        width: "80%",
        height: "40",
        id: "__alloyId7"
    });
    $.__views.category.add($.__views.__alloyId7);
    setAvatar ? $.__views.__alloyId7.addEventListener("click", setAvatar) : __defers["$.__views.__alloyId7!click!setAvatar"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId7!click!setAvatar"] && $.__views.__alloyId7.addEventListener("click", setAvatar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
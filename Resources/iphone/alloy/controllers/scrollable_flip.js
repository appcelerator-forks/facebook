function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addCard(num) {
        for (var i = 0; num > i; i++) {
            cards.push(Ti.UI.createView(cardTemplate));
            cardContent.push(Ti.UI.createView(cardContentTemplate));
            cards[cards.length - 1].left = panelWidth * (cards.length - 1) + (panelWidth - cards[cards.length - 1].width) / 2;
            cards[cards.length - 1].add(cardContent[cards.length - 1]);
            scrollView.add(cards[cards.length - 1]);
            cards[cards.length - 1].animate({
                opacity: 1,
                duration: 500
            });
        }
        scrollView.width = panelWidth * cards.length;
    }
    function revealCard(i) {
        if (!cards[i].revealed) {
            cardContent[i].backgroundColor = "blue";
            cards[i].revealed = true;
        }
    }
    function scrollTo(i) {
        if (cards[i]) {
            if (!cards[i].revealed) {
                cards[i].animate("android" == Ti.Platform.osname ? {
                    view: cardContent[i],
                    duration: 400
                } : {
                    view: cardContent[i],
                    transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT,
                    duration: 400
                });
                revealCard(i);
            }
            scrollView.animate(a.x(-1 * i * panelWidth + leftPadding, 300, 0));
            index = i;
            return true;
        }
        scrollTo(index);
        return false;
    }
    function nextCard() {
        cards[index + 2] || addCard(1);
        scrollTo(index + 1);
    }
    function prevCard() {
        scrollTo(index - 1);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "scrollable_flip";
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
    $.__views.win = Ti.UI.createWindow({
        id: "win",
        navBarHidden: "false",
        title: "Scrollable Flip",
        backButtonTitle: "",
        tabBarHidden: "false"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.search = Ti.UI.createView({
        id: "search",
        backgroundColor: "#ddd"
    });
    $.__views.win.add($.__views.search);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        color: "#000",
        font: {
            fontSize: "14dp",
            fontFamily: "Helvetica Neue"
        },
        text: "Scrollable Flip",
        id: "__alloyId9"
    });
    $.__views.search.add($.__views.__alloyId9);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.win.open();
    var panelWidth = 240;
    var leftPadding = (320 - panelWidth) / 2;
    Titanium.UI.createButton({
        systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    var a = {
        move: function(x, y, curve, duration, delay) {
            return Ti.UI.createAnimation({
                left: x,
                top: y,
                curve: curve,
                duration: duration,
                delay: delay
            });
        },
        x: function(x, duration, delay) {
            return Ti.UI.createAnimation({
                left: x,
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
                duration: duration,
                delay: delay
            });
        }
    };
    arguments[0] || {};
    var index = 0;
    var scrollView = Ti.UI.createView({
        left: leftPadding,
        top: 0
    });
    var cardTemplate = {
        width: 200,
        height: 300,
        opacity: 0,
        revealed: false
    };
    var cardContentTemplate = {
        backgroundColor: "orange"
    };
    var cards = [];
    var cardContent = [];
    addCard(2);
    $.search.add(scrollView);
    var scrollViewDrag = Ti.UI.createView({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    });
    $.search.add(scrollViewDrag);
    var x = 0;
    var dragStartTime = 0;
    scrollViewDrag.addEventListener("touchstart", function(e) {
        x = e.x;
        dragStartTime = new Date().getTime();
    });
    scrollViewDrag.addEventListener("touchmove", function(e) {
        scrollView.left = -1 * index * panelWidth + leftPadding + e.x - x;
    });
    scrollViewDrag.addEventListener("touchend", function(e) {
        var dragEndTime = new Date().getTime();
        200 > dragEndTime - dragStartTime && e.x < x - 20 ? nextCard() : 200 > dragEndTime - dragStartTime && e.x > x + 20 ? prevCard() : e.x < x - cards[index].width / 2 ? nextCard() : e.x > x + cards[index].width / 2 ? prevCard() : scrollTo(index);
    });
    scrollView.addEventListener("touchCancel", function() {
        scrollTo(index);
    });
    splash = Ti.UI.createView({
        backgroundColor: "orange"
    });
    $.search.add(splash);
    splash.addEventListener("click", function() {
        splash.animate({
            width: 200,
            height: 300,
            duration: 500
        }, function() {
            splash.hide();
            scrollTo(index);
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
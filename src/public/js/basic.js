$(document).ready(function () {
    Nav.initiate();
});

var Nav = {
    $toggle: $("#nav-menu-toggle"),
    $menu: $("#nav-menu-outer"),
    $menuMask: $("#nav-menu-mask"),
    initiate: function () {
        this.initiateNav();
        this.initiateNavToggle();
        this.initiateTitle();
    },
    initiateNavToggle: function () {
        var self = this;
        self.$toggle.click(function () {
            if (self.menuShown()) {
                self.hideMenu();
            }
            else {
                self.showMenu();
            }
        });
    },
    initiateNav: function () {
        $("#nav-" + PAGE).children("a").addClass("active");
    },
    initiateTitle: function () {
        if (PAGE != "index") {
            var name = PAGE.substring(0, 1).toUpperCase() + PAGE.substring(1);
            $("title").html($("title").html() + " - " + name);
        }
    },
    menuShown: function () {
        return this.$menu.hasClass("active");
    },
    showMenu: function () {
        this.$menu.addClass("active");
        this.$menuMask.fadeIn("fast");
    },
    hideMenu: function () {
        this.$menu.removeClass("active");
        this.$menuMask.fadeOut("fast");
    }
}

function ajax(options) {
    $.ajax({
        url: options["url"],
        type: options["type"],
        data: options["data"],
        success: function (result) {
            var data = JSON.parse(result);
            if (data["error_code"] == 0) {
                options["success"](data["content"]);
            }
            else if (options["error"]) {
                options["error"](data["error_code"], data["error_log"], data["content"]);
            }
            else {
                alert("Error " + data["error_code"] + ": " + data["error_log"]);
            }
        },
        error: function () {
            if (options["error"]) {
                options["error"](0, "Server connection failed");
            }
            else {
                alert("Error: Server connection failed");
            }
        }
    })
}

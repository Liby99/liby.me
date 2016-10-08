var Nav = {
    $toggle: $("#nav-menu-toggle"),
    $menu: $("#nav-menu-outer"),
    initiate: function () {
        this.initiateNav();
        this.initiateNavToggle();
        this.initiateTitle();
    },
    initiateNavToggle: function () {
        var self = this;
        self.$toggle.click(function () {
            if (self.$menu.hasClass("active")) {
                self.$menu.removeClass("active");
            }
            else {
                self.$menu.addClass("active");
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
    }
}

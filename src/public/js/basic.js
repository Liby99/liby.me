var Nav = {
    $toggle: $("#nav-menu-toggle"),
    $menu: $("#nav-menu-outer"),
    initiate: function () {
        this.initiateNav();
        this.initiateNavToggle();
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
    }
}

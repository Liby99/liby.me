var Nav = {
    $toggle: $("#nav-menu-toggle"),
    $menu: $("#nav-menu-outer"),
    initiate: function () {
        var self = this;
        self.$toggle.click(function () {
            if (self.$menu.hasClass("active")) {
                self.$menu.removeClass("active");
            }
            else {
                self.$menu.addClass("active");
            }
        });
    }
}

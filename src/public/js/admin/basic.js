$(function () {
    Page.initiate();
});

var Page = {
    initiate: function () {
        this.initiateSidebar();
    },
    initiateSidebar: function () {
        var file = location.pathname.substring(1);
        $("#href-" + PAGE).addClass("active");
    }
}

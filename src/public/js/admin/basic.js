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

var User = {
    logout: function () {
        $.ajax({
            url: "/ajax/admin?action=logout",
            type: "get",
            success: function (result) {
                var data = JSON.parse(result);
                if (data["error_code"] == 0) {
                    window.location.href = "/admin/login.html";
                }
                else {
                    alert(data["error_log"]);
                }
            }
        });
    },
    changePassword: function (original, password) {
        $.ajax({
            url: "/ajax/admin?action=change_password",
            type: "post",
            data: { "original": original, "new": password },
            success: function (result) {
                var data = JSON.parse(result);
                if (data["error_code"] == 0) {
                    alert("Successfully Changed Password");
                    window.location.reload();
                }
                else {
                    alert(data["error_log"])
                }
            }
        })
    }
}

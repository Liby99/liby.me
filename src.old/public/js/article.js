$(function () {
    Article.initiate();
    Comment.initiate();
});

var Article = {
    AUID: undefined,
    initiate: function () {
        this.checkParams();
    },
    checkParams: function () {
        var params = Utility.getQueryParams();
        this.AUID = params["a"];
    }
}

var Comment = {
    initiate: function () {
        this.initiateSubmit();
    },
    initiateSubmit: function () {
        var self = this;
        var $form = $("#comment-form");
        $form.submit(function () {
            var username = $("#comment-form-username").val();
            var email = $("#comment-form-email").val();
            var content = $("#comment-form-content").val();
            if (username != "" && email != "" && content != "") {
                ajax({
                    url: "/ajax/article?action=submit_comment",
                    type: "post",
                    data: {
                        "article": Article.AUID,
                        "username": username,
                        "email": email,
                        "content": content
                    },
                    success: function (data) {
                        alert("Successfully submitted comment");
                        window.location.reload();
                    }
                });
            }
            else {
                alert("Please insert all the required fields");
            }
            return false;
        });
    }
}

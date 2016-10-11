$(function () {
    Skill.initiate();
    Friend.initiate();
    Message.initiate();
});

var Skill = {
    currSkill: 0,
    schedule: undefined,
    interval: 8 * 1000,
    $skillHeaders: $(".skill-header"),
    $skills: $(".skill"),
    initiate: function () {
        this.initiateHeaderHover();
        this.initiateHover();
        this.initiateScheduler();
        this.initiateSkillTree();
    },
    initiateHover: function () {
        var self = this;
        $("#skill-section").hover(function () {
            self.stopScheduler();
        }, function () {
            self.runScheduler();
        });
    },
    initiateHeaderHover: function () {
        var self = this;
        $(".skill-header").hover(function () {
            var id = $(this).attr("data-id");
            self.open(id);
        });
    },
    initiateScheduler: function () {
        this.runScheduler();
    },
    initiateSkillTree: function () {
        var self = this;
        $(".skill-tree-item").each(function () {
            var percentage = parseFloat($(this).attr("data-percent")) * 100;
            $(this).children(".progress-outer").children(".progress-bar").css("width", percentage + "%");
        });
    },
    runScheduler: function () {
        var self = this;
        self.stopScheduler();
        self.schedule = setInterval(function () {
            if (self.currSkill == 3) {
                self.currSkill = 0;
            }
            else {
                self.currSkill++;
            }
            self.open(self.currSkill);
        }, self.interval);
    },
    stopScheduler: function () {
        clearInterval(this.schedule);
        this.schedule = undefined;
    },
    open: function (id) {
        this.currSkill = id;
        this.$skillHeaders.eq(id).addClass("active").siblings().removeClass("active");
        this.$skills.eq(id).addClass("active").siblings().removeClass("active").find(".progress-bar").addClass("hidden");
        this.$skills.eq(id).find(".progress-bar").removeClass("hidden");
    }
}

var Friend = {
    $list: $("#friend-list"),
    initiate: function () {
        this.initiateSize();
    },
    initiateSize: function () {
        var friends = this.$list.children();
        if (friends.eq(0).width() == 160) {
            var width = 0;
            for (var i = 0; i < friends.length; i++) {
                width += friends.eq(i).width();
            }
            this.$list.width(width);
        }
        else {
            this.$list.css("width", "auto");
        }
    },
    initiateResize: function () {
        var self = this;
        $(window).resize(function () {
            self.initiateSize;
        })
    }
}

var Message = {
    $form: $("#message-form"),
    $inputUsername: $("#message-username"),
    $inputEmail: $("#message-email"),
    $inputContent: $("#message-content"),
    initiate: function () {
        this.initiateSubmit();
    },
    initiateSubmit: function () {
        var self = this;
        self.$form.submit(function () {
            var username = self.$inputUsername.val();
            var email = self.$inputEmail.val();
            var content = self.$inputContent.val();
            $.ajax({
                url: "/ajax/message?action=submit_message",
                type: "post",
                data: {
                    "username": username,
                    "email": email,
                    "content": content
                },
                success: function (result) {
                    var data = JSON.parse(result);
                    if (data["error_code"] == 0) {
                        alert("Message sent!");
                        window.location.reload();
                    }
                    else {
                        alert(data["error_log"]);
                    }
                },
                error: function () {
                    alert("Server connection error");
                }
            });
            return false;
        });
    },
    clearMessage: function () {
        this.$inputName.val("");
        this.$inputEmail.val("");
        this.$inputContent.val("");
    }
}

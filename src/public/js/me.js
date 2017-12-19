$(function () {
    Skill.initiate();
    Friend.initiate();
    Message.initiate();
});

var Skill = {
    currSkill: 0,
    targetSkill: 0,
    schedule: undefined,
    interval: 8 * 1000,
    threshold: 0.1,
    $skillHeaders: $(".skill-header"),
    $skillHolder: $("#skill-list-holder"),
    $skills: $(".skill"),
    initiate: function () {
        this.initiateHeaderHover();
        this.initiateHover();
        this.initiateScheduler();
        this.initiateSkillTree();
        this.initiateResize();
        
        this.runAnimation();
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
            $(this).find(".progress-bar").css({ "width": percentage + "%" });
        });
    },
    initiateResize: function () {
        var self = this;
        $(window).resize(function () {
            self.refreshSize();
        });
        self.refreshSize();
    },
    refreshSize: function () {
        this.$skills.width($(window).width());
    },
    runScheduler: function () {
        var self = this;
        self.stopScheduler();
        self.schedule = setInterval(function () {
            if (self.targetSkill == 3) {
                self.targetSkill = 0;
            }
            else {
                self.targetSkill++;
            }
            self.open(self.targetSkill);
        }, self.interval);
    },
    runAnimation: function () {
        var self = this;
        self.animation = setInterval(function () {
            var curr = self.$skillHolder.scrollLeft();
            var target = self.targetSkill * $(window).width();
            var diff = curr - target;
            if (Math.abs(diff * 0.1) <= self.threshold) {
                self.$skillHolder.scrollLeft(target);
                self.currSkill = self.targetSkill;
            }
            else {
                var nv = curr - diff * 0.1;
                self.$skillHolder.scrollLeft(diff > 0 ? Math.floor(nv) : Math.ceil(nv));
            }
        }, 20);
    },
    stopScheduler: function () {
        clearInterval(this.schedule);
        this.schedule = undefined;
    },
    open: function (id) {
        this.targetSkill = id;
        this.$skillHeaders.eq(id).addClass("active").siblings().removeClass("active");
        this.$skills.eq(id).addClass("active").siblings().removeClass("active");
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
            ajax({
                url: "/ajax/message?action=submit_message",
                type: "post",
                data: {
                    "username": username,
                    "email": email,
                    "content": content
                },
                success: function (result) {
                    alert("Message sent!");
                    window.location.reload();
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

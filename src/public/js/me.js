$(function () {
    Skill.initiate();
});

var Skill = {
    currSkill: 0,
    schedule: undefined,
    interval: 5 * 1000,
    $skillHeaders: $(".skill-header"),
    $skills: $(".skill"),
    initiate: function () {
        //this.initiateHover();
        this.initiateHeaderClick();
        //this.initiateScheduler();
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
    initiateHeaderClick: function () {
        var self = this;
        $(".skill-header").click(function () {
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
        this.$skills.eq(id).addClass("active").siblings().removeClass("active");
    }
}

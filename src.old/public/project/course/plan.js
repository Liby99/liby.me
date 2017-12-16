$(function () {
    Planner.initiate();
})

var Planner = {
    year: [2016, 2017, 2018, 2019, 2020],
    quarter: ["Fall", "Winter", "Spring"],
    initiate: function () {
        this.initiatePlan();
        this.initiateButton();
    },
    initiatePlan: function () {
        var html = "";
        for (var i = 0; i < 12; i++) {
            html += "<section data-quarter=\"" + i + "\">"
                        + "<div>"
                            + "<i class=\"fa fa-angle-right\"></i>"
                            + "<span>" + this.quarter[(i + 2) % 3] + " " + this.year[Math.floor((i + 2) / 3)] + "</span>"
                        + "</div>"
                        + "<ul></ul>"
                    + "</section>";
        }
        $("#four-year-plan").html(html);
    },
    initiateButton: function () {
        
    },
    addToQuarter: function (quarter, id) {
        var course = network.getCourse(id);
        if (course) {
            var html = "<li><span>" + course.getNumber() + "</span><span>" + course.unit + " Units</span></li>";
            var $quarter = $("#four-year-plan section[data-quarter=" + quarter + "] ul");
            $quarter.append(html);
            return $quarter.children().length;
        }
    },
    moveToNextQuarter: function () {
        quarter++;
        setlvl(quarter);
    }
}

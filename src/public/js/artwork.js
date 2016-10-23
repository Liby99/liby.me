$(function () {
    Artwork.initiate();
});

var Artwork = {
    YEAR_BUTTON_WIDTH: 480,
    $section: $("#artwork-list-section"),
    $holder: $("#hovering-board"),
    $board: $("#hovering-board-inner"),
    $content: $("#artwork-year-content"),
    $buttons: $("#prev-year-button, #next-year-button"),
    $artwork: $("#artwork-section"),
    $artworkSource: $("#artwork-source"),
    $artworkThumbnail: $("#artwork-thumbnail"),
    $artworkTitle: $("#artwork-title"),
    $artworkSubtitle: $("#artwork-subtitle"),
    $artworkDateTime: $("#artwork-date-time"),
    $artworkType: $("#artwork-type"),
    $artworkSoftwares: $("#artwork-software-list"),
    $artworkTags: $("#artwork-tag-list"),
    $artworkDescription: $("#artwork-description"),
    hoverBoard: undefined,
    params: undefined,
    initiate: function () {
        this.params = Utility.getQueryParams();
        
        this.initiateIframe();
        
        var mobile = isMobile();
        
        this.YEAR_BUTTON_WIDTH = mobile ? 240 : 480;
        
        if (this.initiateSize(this.YEAR_BUTTON_WIDTH) && !mobile) {
            this.initiateHoveringBoard();
        }
        
        if (mobile) {
            this.initiateMobileBoard();
        }
    },
    initiateSize: function (yearButtonWidth) {
        var windowWidth = $(window).width();
        this.$buttons.css("height", this.$board.innerHeight() + "px");
        if (yearButtonWidth + this.$content.outerWidth() > windowWidth) {
            this.$board.width(yearButtonWidth + this.$content.outerWidth());
            return true;
        }
        else {
            this.$content.width(windowWidth - yearButtonWidth);
            return false;
        }
    },
    initiateMobileBoard: function () {
        $("body").addClass("mobile");
        this.$holder.addClass("mobile");
        var ox = (this.$holder.innerWidth() - this.$board.outerWidth()) / 2;
        this.$board.scrollLeft(ox);
    },
    initiateHoveringBoard: function () {
        this.hoverBoard = new HoveringBoard(this.$holder, this.$board);
    },
    initiateIframe: function () {
        var iframe = this.$artworkSource.children("iframe");
        iframe.attr("height", iframe.innerWidth() * 9 / 16);
    },
    openArtwork: function () {
        this.$section.addClass("collapsed");
        this.$artwork.addClass("active");
        this.initiateSize(this.YEAR_BUTTON_WIDTH);
        if (this.hoverBoard) {
            this.hoverBoard.refresh();
        }
    },
    openList: function () {
        this.$section.removeClass("collapsed");
        this.$artwork.removeClass("active");
        this.initiateSize(this.YEAR_BUTTON_WIDTH);
        if (this.hoverBoard) {
            this.hoverBoard.refresh();
        }
    },
    load: function (artwork) {
        var self = this;
        ajax({
            url: "/ajax/artwork?action=get_artwork_data",
            type: "post",
            data: { "artwork": artwork },
            success: function (data) {
                self.loadArtworkThumbnail(data["AUID"]);
                self.loadArtworkTitle(data["title"]);
                self.loadArtworkSubtitle(data["subtitle"]);
                self.loadArtworkDateTime(data["date_time"]);
                self.loadArtworkType(data["type"]);
                self.loadArtworkSoftwares(data["softwares"]);
                self.loadArtworkTags(data["tags"]);
                self.loadArtworkDescription(data["description"]);
                self.pushState(data["AUID"]);
                self.openArtwork();
                self.loadArtworkCover(data["source_type"], data["source_url"], data["AUID"]);
            }
        });
        return false;
    },
    loadArtworkCover: function (sourceType, sourceUrl, AUID) {
        if (sourceType == 2) {
            var url = sourceUrl.replace("https://", "https://player.").replace("com", "com/video");
            this.$artworkSource.html("<iframe src=\"" + url + "?api=1&player_id=vimeo_player\"></iframe>");
            this.initiateIframe();
        }
        else {
            this.$artworkSource.html("<img src=\"img/artwork/cover/" + AUID + ".jpg\" />");
        }
    },
    loadArtworkThumbnail: function (AUID) {
        this.$artworkThumbnail.children("img").attr("src", "img/artwork/thumbnail/" + AUID + ".jpg");
    },
    loadArtworkTitle: function (title) {
        this.$artworkTitle.text(title);
    },
    loadArtworkSubtitle: function (subtitle) {
        this.$artworkSubtitle.text(subtitle);
    },
    loadArtworkDateTime: function (dateTime) {
        this.$artworkDateTime.text(dateTime);
    },
    loadArtworkType: function (type) {
        this.$artworkType.text(type);
    },
    loadArtworkTags: function (tags) {
        var html = "";
        tags = tags.split(", ");
        for (var i = 0; i < tags.length; i++) {
            html += "<span class=\"tag\">" + tags[i] + "</span>";
        }
        this.$artworkTags.html(html);
    },
    loadArtworkSoftwares: function (softwares) {
        var html = "";
        softwares = softwares.split(", ");
        for (var i = 0; i < softwares.length; i++) {
            html += "<li class=\"software\">" + softwares[i] + "</li>";
        }
        this.$artworkSoftwares.html(html);
    },
    loadArtworkDescription: function (description) {
        this.$artworkDescription.html(description);
    },
    pushState: function (AUID) {
        history.pushState({
            "AUID": AUID
        }, "", "artwork.html?y=" + this.params["y"] + "&a=" + AUID);
    }
}

function isMobile() {
    var check = false;
    (function (a) {
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function HoveringBoard(holder, board) {
        
    this.mx = 0;
    this.my = 0;
    this.bx = 0;
    this.by = 0;
    this.ox = 0;
    this.oy = 0;
    this.isInside = false; //Boolean of whether mouse is inside the holder
    this.interval = 0; //Integer of the interval
    
    this.holder = holder;
    this.board = board;
    
    this.initiateOffset();
    this.initiateCenter();
    this.resizeListen();
    this.hoverListen();
    this.mouseListen();
    this.startAnimation();
};

HoveringBoard.prototype.ANIMATION_DELAY = 10;

HoveringBoard.prototype.ANIMATION_SPEED = 1 / 25;

HoveringBoard.prototype.RESET_DELAY = 1000;

HoveringBoard.prototype.START_DELAY = 3000;

HoveringBoard.prototype.initiateOffset = function () {
    this.ox = (this.holder.innerWidth() - this.board.outerWidth()) / 2;
    this.oy = (this.holder.innerHeight() - this.board.outerHeight()) / 2;
}

HoveringBoard.prototype.initiateCenter = function () {
    this.setMousePosition(this.ox, this.oy);
    this.setBoardPosition(this.ox, this.oy);
}

HoveringBoard.prototype.setMousePosition = function (x, y) {
    this.mx = x;
    this.my = y;
}

HoveringBoard.prototype.setBoardPosition = function (x, y) {
    this.bx = x;
    this.by = y;
    this.refreshBoardPosition(x, y);
}

HoveringBoard.prototype.refreshBoardPosition = function (x, y) {
    this.board.css("margin-left", x + "px");
}

HoveringBoard.prototype.startAnimation = function () {
    var self = this;
    setInterval(function () {
        self.bx += (self.mx - self.bx) * self.ANIMATION_SPEED;
        self.by += (self.my - self.by) * self.ANIMATION_SPEED;
        
        //Set the position of the board
        if (Math.pow(self.mx - self.bx, 2) + Math.pow(self.my - self.by, 2) > 1) {
            self.setBoardPosition(self.bx, self.by);
        }
    }, self.ANIMATION_DELAY);
}

HoveringBoard.prototype.resizeListen = function () {
    var self = this;
    $(window).resize(function () {
        self.initiateOffset();
        self.setMousePosition(self.ox, self.oy);
    });
}

HoveringBoard.prototype.refresh = function () {
    this.initiateOffset();
}

HoveringBoard.prototype.mouseListen = function () {
    var self = this;
    this.holder.mousemove(function (event) {
        self.mx = self.ox * event.pageX / (self.holder.innerWidth() / 2);
        self.my = self.oy * (event.pageY - self.holder.offset().top) / (self.holder.innerHeight() / 2);
    });
}

HoveringBoard.prototype.hoverListen = function () {
    var self = this;
    this.holder.hover(function (event) {
        self.isInside = true;
        clearInterval(self.interval);
    }, function (event) {
        if (self.holder.attr("data-tracking") === "1") {
            self.isInside = false;
            self.interval = setInterval(function () {
                if (self.isInside == false) {
                    self.mx = ox;
                    self.my = oy;
                }
                clearInterval(self.interval);
            }, self.RESET_DELAY);
        }
    });
}

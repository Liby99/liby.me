var Artwork = require("../api/artwork");

module.exports = function (req, res, callback) {
    if (req.query["y"] && isYear(req.query["y"])) {
        Artwork.getArtworksOfYear(req.query["y"], function (artworks) {
            artworks.forEach(function (artwork) {
                artwork["short_month"] = getShortMonth(getDate(artwork["date_time"]).getMonth());
            });
            Artwork.hasArtworksOfYear(parseInt(req.query["y"]) - 1, function (hasPrev) {
                Artwork.hasArtworksOfYear(parseInt(req.query["y"]) + 1, function (hasNext) {
                    Artwork.getArtworkData(req.query["a"], function (artwork) {
                        
                        var obj = {
                            "year": parseInt(req.query["y"]),
                            "has_prev_year": hasPrev,
                            "has_next_year": hasNext,
                            "artworks": artworks,
                            "artwork": undefined
                        }
                        
                        if (artwork) {
                            Artwork.view(req.query["a"], function () {});
                            obj.artwork = artwork;
                            obj.artwork.url = getSourceUrl(artwork["source_type"], artwork["source_url"], artwork["cover"]);
                        }
                        
                        callback(obj);
                    }, (err) => {
                        res.error(500, err);
                    });
                }, (err) => {
                    res.error(500, err);
                });
            }, (err) => {
                res.error(500, err);
            });
        }, (err) => {
            res.error(500, err);
        });
    }
    else {
        res.redirect("artwork.html?y=" + (new Date()).getFullYear());
    }
}

function isYear(year) {
    return year.match(/\d{4}/) != null;
}

function getDate(str) {
    return new Date(Date.parse(str));
}

function getShortMonth(month) {
    switch (month) {
        case 0: return "JANUARY";
        case 1: return "FEBUARY";
        case 2: return "MARCH";
        case 3: return "APRIL";
        case 4: return "MAY";
        case 5: return "JUNE";
        case 6: return "JULY";
        case 7: return "AUGUST";
        case 8: return "SEPTEMBER";
        case 9: return "OCTOBER";
        case 10: return "NOVEMBER";
        case 11: return "DECEMBER";
    }
}

function getSourceUrl(sourceType, sourceUrl, cover) {
    if (sourceType == 2) {
        return "<iframe src=\"" + sourceUrl.replace("https://", "https://player.").replace("com", "com/video") + "?api=1&player_id=vimeo_player\"></iframe>";
    }
    else {
        return "<img src=\"" + cover + "\" />";
    }
}

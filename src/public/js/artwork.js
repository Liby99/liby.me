var Artwork = require("../api/artwork.js");

module.exports = function (req, res, callback) {
    if (req.body["y"] && isYear(req.body["y"])) {
        Artwork.getArtworkOfYear(req.body["y"], function (artworks) {
            artworks.forEach(function (artwork) {
                artwork["short_month"] =
            });
            callback({
                "artworks": artworks
            });
        });
    }
    else {
        res.redirect("artwork.html?y=" + (new Date()).getFullYear());
    }
}

function isYear(year) {
    return year.match(/\d{4}/) != null;
}

function getShortMonth(month) {
    switch (month) {
        case 0: return "JAN";
        case 1: return "FEB";
        case 2: return "MAR";
        case 3: return "APR";
        case 4: return "MAY";
        case 5: return "JUN";
        case 6: return "JUL";
        case 7: return "AUG";
        case 8: return "SEP";
        case 9: return "OCT";
        case 10: return "NOV";
        case 11: return "DEC";
    }
}

var Artwork = require("../api/artwork.js");

module.exports = function (req, res, callback) {
    if (req.query["a"]) {
        Artwork.getArtworkData(req.query["a"], function (data) {
            Artwork.getArtworksAroundArtwork(req.query["a"], function (artworks) {
                if (data) {
                    callback({
                        "artworks": artworks,
                        "data": data
                    })
                }
                else {
                    res.redirect("error.html?err=500");
                }
            });
        });
    }
    else {
        res.redirect("artwork.html");
    }
}

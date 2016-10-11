var Artwork = require("../api/artwork.js");

module.exports = function (req, res, callback) {
    Artwork.getLatestArtworks(function (artworks) {
        if (artworks) {
            callback({
                "artworks": artworks
            });
        }
        else {
            res.redirect("error.html?err=500");
        }
    })
}

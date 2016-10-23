var Artwork = require("../api/artwork.js");

module.exports = {
    get_artwork_data: function (req, res) {
        if (req.body["artwork"]) {
            Artwork.getArtworkData(req.body["artwork"], function (artwork) {
                if (artwork) {
                    Artwork.view(req.body["artwork"], function (callback) {
                        res.success(artwork);
                    });
                }
                else {
                    res.error(2, "No such artwork");
                }
            });
        }
        else {
            res.error(1, "Artwork is required to get the data");
        }
    }
}

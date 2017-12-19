var Artwork = require("../api/artwork.js");

module.exports = {
    get_artwork_data: function (req, res) {
        if (req.body["artwork"]) {
            Artwork.getArtworkData(req.body["artwork"], function (artwork) {
                if (artwork) {
                    Artwork.view(req.body["artwork"], function () {
                        res.success(artwork);
                    }, (err) => {
                        res.error(500, err);
                    });
                }
                else {
                    res.error(2, "No such artwork");
                }
            }, (err) => {
                res.error(500, err);
            });
        }
        else {
            res.error(1, "Artwork is required to get the data");
        }
    }
}

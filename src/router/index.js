var Artwork = require("../api/artwork");
var Article = require("../api/article");

module.exports = function (req, res, callback) {
    Artwork.getLatestArtworks(function (artworks) {
        Article.getLatestArticles(function (articles) {
            callback({
                "artworks": artworks,
                "articles": articles
            });
        }, (err) => {
            res.error(500, err);
        });
    }, (err) => {
        res.error(500, err);
    });
}

var Artwork = require("../api/artwork.js");
var Article = require("../api/article.js");

module.exports = function (req, res, callback) {
    Artwork.getLatestArtworks(function (artworks) {
        if (artworks) {
            Article.getLatestArticles(function (articles) {
                if (articles) {
                    callback({
                        "artworks": artworks,
                        "articles": articles
                    });
                }
                else {
                    res.error(500, "Internal server error");
                }
            });
        }
        else {
            res.error(500, "Internal server error");
        }
    });
}

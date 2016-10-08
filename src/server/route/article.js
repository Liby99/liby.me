var Article = require("../api/article.js");

module.exports = function (req, res, callback) {
    Article.getArticles(function (articles) {
        callback({
            "articles": articles
        });
    });
}

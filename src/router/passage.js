var Article = require("../api/article.js");

module.exports = function (req, res, callback) {
    if (req.query["a"]) {
        Article.exists(req.query["a"], function (exists) {
            if (exists) {
                Article.getArticle(req.query["a"], function (article) {
                    if (article) {
                        Article.read(req.query["a"], function (success) {
                            Article.getComments(req.query["a"], function (comments) {
                                if (comments) {
                                    Article.getPreviousArticle(req.query["a"], function (prev) {
                                        Article.getNextArticle(req.query["a"], function (next) {
                                            callback({
                                                "article": article,
                                                "comments": comments,
                                                "prev_article": prev,
                                                "next_article": next
                                            });
                                        });
                                    });
                                }
                                else {
                                    res.error(500, "Get comments error");
                                }
                            });
                        });
                    }
                    else {
                        res.error(404, "This article does not exists");
                    }
                });
            }
            else {
                res.error(404, "This article does not exists");
            }
        });
    }
    else {
        res.error(404, "Please specify article id");
    }
}

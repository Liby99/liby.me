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
                                    res.redirect("error.html?err=500");
                                }
                            });
                        });
                    }
                    else {
                        res.redirect("error.html?err=500");
                    }
                });
            }
            else {
                res.redirect("error.html?err=404&log=Article%20not%20found");
            }
        });
    }
    else {
        res.redirect("error.html?err=502");
    }
}

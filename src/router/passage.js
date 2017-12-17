var Article = require("../api/article.js");

module.exports = function (req, res, callback) {
    if (req.query["a"]) {
        Article.getArticle(req.query["a"], function (article) {
            if (article) {
                Article.read(req.query["a"], function (success) {
                    Article.getPreviousArticle(req.query["a"], article["date_time"], function (prev) {
                        Article.getNextArticle(req.query["a"], article["date_time"], function (next) {
                            
                            console.log(prev);
                            console.log(next);
                            
                            callback({
                                "article": article,
                                "prev_article": prev,
                                "next_article": next
                            });
                        }, (err) => {
                            res.error(500, err);
                        });
                    }, (err) => {
                        res.error(500, err);
                    });
                }, (err) => {
                    res.error(500, err);
                });
            }
            else {
                res.error(404, "This article does not exists");
            }
        }, (err) => {
            res.error(500, err);
        });
    }
    else {
        res.error(404, "Please specify article id");
    }
}

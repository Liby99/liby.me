var Admin = require("../../api/admin.js");
var Article = require("../../api/article.js");

module.exports = function (req, res, callback) {
    Admin.verify(req, res, function () {
        if (req.query["a"]) {
            Article.getAdminArticles(function (articles) {
                Article.getAdminComments(req.query["a"], function (comments) {
                    callback({
                        "id": req.query["a"],
                        "articles": articles,
                        "comments": comments,
                    });
                }, function (err) {
                    res.error(500, err);
                });
            }, function (err) {
                res.error(500, err);
            });
        }
        else {
            Article.getAdminArticles(function (articles) {
                if (articles.length > 0) {
                    res.redirect("article_comment.html?a=" + articles[0]["_id"]);
                }
                else {
                    res.redirect("article_manage.html");
                }
            }, function (err) {
                res.error(500, err);
            });
        }
    });
}

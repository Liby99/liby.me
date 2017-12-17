var Admin = require("../../api/admin.js");
var Article = require("../../api/article.js");

module.exports = function (req, res, callback) {
    Admin.verify(req, res, function () {
        if (req.query["a"]) {
            Article.getAdminArticles(function (articles) {
                Article.getAdminComments(req.query["a"], function (comments) {
                    callback({
                        "auid": req.query["a"],
                        "articles": articles,
                        "comments": comments,
                    });
                });
            });
        }
        else {
            Article.getAdminArticles(function (articles) {
                res.redirect("article_comment.html?a=" + articles[0]["AUID"]);
            });
        }
    });
}

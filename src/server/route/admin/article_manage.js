var admin = require("../../api/admin.js");
var Article = require("../../api/article.js");

module.exports = function (req, res) {
    admin.verify(req, res, function () {
        Article.getAdminArticles(function (result) {
            if (result) {
                res.render("admin/article_manage", {
                    articles: result
                });
            }
            else {
                res.render("admin/article_manage", {
                    "error": "Database Error"
                });
            }
        });
    });
}

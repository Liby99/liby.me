var Admin = require("../../api/admin.js");
var Article = require("../../api/article.js");

module.exports = function (req, res, callback) {
    Admin.verify(req, res, function () {
        Article.getAdminArticles(function (result) {
            if (result) {
                callback({
                    articles: result
                });
            }
            else {
                callback({
                    "error": "Database Error"
                });
            }
        });
    });
}

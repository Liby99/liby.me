var Admin = require("../../api/admin.js");
var Article = require("../../api/article.js");

module.exports = function (req, res, callback) {
    Admin.verify(req, res, function () {
        Article.getAdminArticles(function (result) {
            callback({
                articles: result
            });
        }, (err) => {
            res.error(500, err);
        });
    }, (err) => {
        res.error(500, err);
    });
}

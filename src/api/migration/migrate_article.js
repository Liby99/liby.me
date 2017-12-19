const ArticleOld = require("../old/article.old");
const Article = require("../article");
const Promise = require("../lib/promise");
const fs = require("fs");
const path = require("path");

module.exports = function (req, res, callback) {
    ArticleOld.getAdminArticles(function (articles) {
        Promise.all(articles, (article, i, c, e) => {
            var cover = getCover(article["AUID"]);
            Article.newArticle(article["title"], article["subtitle"], article["tags"],
                article["status"], article["date_time"], cover, article["content"], c, e);
        }, () => {
            res.send("success");
        }, (err) => {
            res.error(500, err);
            throw err;
        });
    });
}

function getCover (auid) {
    var filename = path.join(__dirname, "../../public/img/article/" + auid + ".jpg");
    return getImage(filename);
}

function getImage (filename) {
    return "data:image/jpeg;base64," + fs.readFileSync(filename, "base64");
}

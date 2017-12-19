var Article = require("../api/article");

module.exports = function (req, res, callback) {
    if (req.query["p"]) {
        Article.getArticleAmount(function (amount) {
            if (amount > 0) {
                var page = parseInt(req.query["p"]);
                var maxPage = Math.ceil(amount / 5.0);
                var left = page <= 3;
                var middle = page > 3 && page < maxPage - 2;
                var right = page >= maxPage - 2;
                var start = left ? 1 : middle ? page - 2 : maxPage - 4;
                if (!isNaN(page) && page > 0 && page <= maxPage) {
                    console.log(page);
                    Article.getArticles((page - 1) * 5, function (articles) {
                        if (articles) {
                            callback({
                                "page": page,
                                "max_page": maxPage,
                                "left": left,
                                "middle": middle,
                                "right": right,
                                "start": start,
                                "amount": amount,
                                "articles": articles
                            });
                        }
                        else {
                            res.error(500, "Get articles error");
                        }
                    });
                }
                else {
                    res.error(500, "Invalid page number");
                }
            }
            else {
                res.error(500, "No articles right now");
            }
        });
    }
    else {
        res.redirect("article.html?p=1");
    }
}

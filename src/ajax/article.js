var Article = require("../api/article.js");
var UserUtil = require("../api/lib/userutil.js");

module.exports = {
    submit_comment: function (req, res) {
        if (req.body["username"] && req.body["email"] && req.body["content"]) {
            if (UserUtil.isUsername(req.body["username"])) {
                if (UserUtil.isEmail(req.body["email"])) {
                    Article.exists(req.body["article"], function (exists) {
                        if (exists) {
                            Article.newComment(req.body["article"], req.body["username"], req.body["email"], req.body["content"], function (success) {
                                if (success) {
                                    res.success({});
                                }
                                else {
                                    res.error(5, "Database error");
                                }
                            });
                        }
                        else {
                            res.error(4, "No such article");
                        }
                    })
                }
                else {
                    res.error(3, "Your email is not valid");
                }
            }
            else {
                res.error(2, "Your username is not valid");
            }
        }
        else {
            res.error(1, "Not enough data. Send message failed");
        }
    }
}

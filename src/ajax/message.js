var Message = require("../api/message.js");
var UserUtil = require("../api/lib/userutil.js");

module.exports = {
    submit_message: function (req, res) {
        if (req.body["username"] && req.body["email"] && req.body["content"]) {
            if (UserUtil.isUsername(req.body["username"])) {
                if (UserUtil.isEmail(req.body["email"])) {
                    Message.newMessage(req.body["username"], req.body["email"], req.body["content"], function () {
                        res.success({});
                    }, (err) => {
                        res.error(4, "Database error: " + err);
                    });
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

var Message = require("../api/message.js");

module.exports = {
    submit_message: function (req, res) {
        if (req.body["name"] && req.body["email"] && req.body["content"]) {
            Message.newMessage(req.body["name"], req.body["email"], req.body["content"], function (success) {
                if (success) {
                    res.success({});
                }
                else {
                    res.error(2, "Database error");
                }
            });
        }
        else {
            res.error(1, "Not enough data. Send message failed");
        }
    }
}

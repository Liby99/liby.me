var Admin = require("../../api/admin.js");
var Message = require("../../api/message.js");

module.exports = function (req, res, callback) {
    Admin.verify(req, res, function () {
        Message.getMessages(function (messages) {
            callback({
                "messages": messages
            });
        });
    });
}

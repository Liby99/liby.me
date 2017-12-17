var mysql = require("keeling-js/lib/mysql.js");

module.exports = {
    getMessages: function (callback) {
        mysql.query("SELECT `username`, `email`, `date_time`, `content`  FROM `message` ORDER BY `date_time` DESC", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    newMessage: function (username, email, content, callback) {
        mysql.query("INSERT INTO `message` SET `MUID` = UUID(), `date_time` = NOW(), `read` = 0, ?", {
            "username": username,
            "email": email,
            "content": content
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    }
}

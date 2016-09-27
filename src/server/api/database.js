/**
 *
 */

var mysql = require("../module/mysql.js");

module.exports = {
    /**
     * [get_top_10_artworks description]
     * @param {Function} callback
     * @return {[type]}
     */
    getTop10Artworks: function (callback) {
        
    },
    getArtworkOfYear: function (year, callback) {
        
    },
    getMessages: function (callback) {
        mysql.query("SELECT `username`, `email`, `date_time`, `content`  FROM `message` ORDER BY `date_time` DESC", {}, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(result);
            }
        });
    },
    addMessage: function (username, email, content, callback) {
        mysql.query("INSERT INTO `message` SET `date_time` = NOW(), `read` = 0, ?", {
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

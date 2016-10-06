var mysql = require("../module/mysql.js");

module.exports = {
    getAdminArtworks: function (callback) {
        mysql.query("SELECT * FROM `artwork` ORDER BY `date_time` DESC", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        })
    }
}

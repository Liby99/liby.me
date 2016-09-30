var Admin = require("../../api/admin.js");

module.exports = function (req, res, callback) {
    Admin.verify(req, res, function () {
        callback({});
    });
}

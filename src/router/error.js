var config = require("../data/config.json");

module.exports = function (req, res, callback) {
    switch (req.query["err"]) {
        case "404":
            callback({
                "error_code": 404,
                "error_log": req.query["log"] ? req.query["log"] : config["404_message"]
            });
            break;
        case "500":
            callback({
                "error_code": 500,
                "error_log": req.query["log"] ? req.query["log"] : config["500_message"]
            });
            break;
        default:
            callback({
                "error_code": 502,
                "error_log": "Bad Gateway."
            });
            break;
    }
}

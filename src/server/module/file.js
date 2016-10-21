var fs = require("fs");

module.exports = {
    saveImage: function (name, data, callback) {
        fs.writeFile("../../public/img/" + name, data, function (err) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    }
}

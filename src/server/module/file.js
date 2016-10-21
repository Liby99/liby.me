var fs = require("fs");

module.exports = {
    saveImage: function (name, data, callback) {
        fs.writeFile("../../public/img/" + name, decodeBase64Image(data);, function (err) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    }
}

function decodeBase64Image(data) {
    var matches = data.match(regex);
    if (matches.length !== 3) {
        throw new Error('Invalid input string');
    }
    return new Buffer(matches[2], 'base64');
}

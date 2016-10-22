var fs = require("fs");
var path = require("path");

var regex = /^data:([A-Za-z-+\/]+);base64,(.+)$/;

module.exports = {
    imageDir: path.resolve(__dirname + "/../../public/img/"),
    saveImage: function (name, data, callback) {
        try {
            var decoded = decodeBase64Image(data);
            fs.writeFile(this.imageDir + name, decoded, function (err) {
                if (err) {
                    console.log(err);
                    callback(false);
                }
                else {
                    callback(true);
                }
            });
        }
        catch (ex) {
            console.log(ex);
            callback(false);
        }
    },
    removeImage: function (name) {
        fs.unlinkSync(this.imageDir + name);
    }
}

function decodeBase64Image(data) {
    var matches = data.match(regex);
    if (matches.length !== 3) {
        throw new Error('Invalid input string');
    }
    return new Buffer(matches[2], 'base64');
}

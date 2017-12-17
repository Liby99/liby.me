var AWS = require("aws-sdk");
var s3 = new AWS.S3();

module.exports = {
    saveImage (filename, data, callback, error) {
        s3.upload({
            Bucket: "liby.me",
            Key: filename,
            Body: data,
            ACL: "public-read"
        }, function (err, data) {
            if (err) {
                error(err);
            }
            else {
                callback(data["Location"]);
            }
        });
    }
}

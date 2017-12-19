const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const BUCKET = "liby.me";
const BASE = "https://s3.us-east-2.amazonaws.com/";

function generateUrl (filename) {
    return BASE + BUCKET + "/" + filename;
}

module.exports = {
    saveImage (filename, data, callback, error) {
        s3.upload({
            Bucket: BUCKET,
            Key: filename,
            Body: data,
            ACL: "public-read"
        }, function(err, data) {
            if (err) {
                error(err);
            } else {
                callback(data["Location"]);
            }
        });
    },
    removeFolder (directory, callback, error) {
        s3.listObjects({
            Bucket: BUCKET,
            Prefix: directory
        }, (err, data) => {
            if (err) {
                error(err);
            }
            else {
                if (data.Contents.length == 0) {
                    callback();
                }
                else {
                    params = {
                        Bucket: BUCKET,
                        Delete: {
                            Objects: data.Contents.map((content) => {
                                return { Key: content.Key };
                            })
                        }
                    };
                    s3.deleteObjects(params, (err, data) => {
                        if (err) {
                            error(err);
                        }
                        else {
                            callback();
                        }
                    });
                }
            }
        });
    },
    removeImage (file, callback, error) {
        s3.deleteObject({
            Bucket: BUCKET,
            Key: file
        }, (err) => {
            if (err) {
                error(err);
            }
            else {
                callback();
            }
        });
    },
    removeImages (files, callback, error) {
        s3.deleteObjects({
            Bucket: BUCKET,
            Delete: {
                Objects: files.map((file) => {
                    return { Key: file };
                })
            }
        }, (err, data) => {
            if (err) {
                error(err);
            }
            else {
                callback();
            }
        });
    },
    listObjects (directory, callback, error) {
        s3.listObjects({
            Bucket: BUCKET,
            Prefix: directory
        }, (err, data) => {
            if (err) {
                error(err);
            }
            else {
                callback(data.Contents.map((content) => {
                    return {
                        url: generateUrl(content.Key),
                        key: content.Key
                    };
                }));
            }
        });
    }
}

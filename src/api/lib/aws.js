var AWS = require('aws-sdk');

var s3 = new AWS.S3();

var url = "https://s3.us-east-2.amazonaws.com/liby.me/a.jpg"

var params = {
    Bucket: "liby.me",
    Key: "a.jpg",
    Body: "Hello World!"
};

s3.putObject(params, function(err, data) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Successfully uploaded data to " + params.Bucket + "/" + params.Key);
    }
});

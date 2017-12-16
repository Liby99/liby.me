var fs = require("fs");
var mysql = require("../module/mysql.js");

var regex = /^data:([A-Za-z-+\/]+);base64,(.+)$/;

function main() {
    saveArtworkImage();
    saveArticleImage();
    saveProjectImage();
}

function saveArtworkImage() {
    mysql.query("SELECT `AUID`, `cover`, `thumbnail` FROM `artwork`", function (err, result) {
        for (var i = 0; i < result.length; i++) {
            saveArtworkThumbnail(result[i]["AUID"], result[i]["thumbnail"]);
            saveArtworkCover(result[i]["AUID"], result[i]["cover"]);
        }
    });
}

function saveArtworkThumbnail(AUID, data) {
    var decoded = decodeBase64Image(data);
    saveFile("../../public/img/artwork/thumbnail/" + AUID + ".jpg", decoded);
}

function saveArtworkCover(AUID, data) {
    var decoded = decodeBase64Image(data);
    saveFile("../../public/img/artwork/cover/" + AUID + ".jpg", decoded);
}

function saveArticleImage() {
    mysql.query("SELECT `AUID`, `cover` FROM `article`", function (err, result) {
        for (var i = 0; i < result.length; i++) {
            var decoded = decodeBase64Image(result[i]["cover"]);
            saveFile("../../public/img/article/" + result[i]["AUID"] + ".jpg", decoded);
        }
    });
}

function saveProjectImage() {
    mysql.query("SELECT `PUID`, `cover` FROM `project`", function (err, result) {
        for (var i = 0; i < result.length; i++) {
            var decoded = decodeBase64Image(result[i]["cover"]);
            saveFile("../../public/img/project/" + result[i]["PUID"] + ".jpg", decoded);
        }
    });
}

function saveFile(name, data) {
    fs.writeFile(name, data, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("save file " + name + " successfully!");
        }
    });
}

function decodeBase64Image(data) {
    var matches = data.match(regex);
    if (matches.length !== 3) {
        throw new Error('Invalid input string');
    }
    return new Buffer(matches[2], 'base64');
}

main();

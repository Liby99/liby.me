var AWS = require("./lib/aws");
var Promise = require("./lib/promise");
var ObjectId = require("./lib/object_id");

var Mongo = require("keeling-js/lib/mongo");
var Debug = require("keeling-js/lib/debug");
var Cheerio = require("cheerio");

var Articles = Mongo.db.collection("article");

module.exports = {
    adminExists (articleId, callback, error) {
        Articles.find({ "_id": articleId }).count((err, count) => {
            if (err) {
                error(err);
            }
            else {
                callback(count != 0);
            }
        });
    },
    
    exists (articleId, callback, error) {
        Articles.find({ "_id": articleId, "status": 1 }).count((err, count) => {
            if (err) {
                error(err);
            }
            else {
                callback(count != 0);
            }
        });
    },
    
    getAdminArticles (callback, error) {
        Articles.find({}, {
            "username": 1,
            "date_time": 1,
            "title": 1,
            "subtitle": 1,
            "tags": 1,
            "view": 1,
            "comment": 1,
        }, {
            sort: {
                "date_time": -1
            }
        }).toArray((err, articles) => {
            if (err) {
                error(err);
            }
            else {
                callback(articles);
            }
        });
    },
    
    getArticles (start, callback, error) {
        Articles.find({
            "status": 1
        }, {
            sort: {
                "date_time": -1
            }
        }).limit(start, start + 5).toArray((err, articles) => {
            if (err) {
                error(err);
            }
            else {
                callback(articles.map((article) => {
                    var $ = Cheerio.load("<div>" + article["content"] + "</div>");
                    article["content"] = $.text().substring(0, 150);
                    return article;
                }));
            }
        });
    },
    
    getLatestArticles (callback, error) {
        Articles.find({
            "status": 1
        }, {
            "title": 1,
            "subtitle": 1
        }, {
            sort: {
                "date_time": -1
            }
        }).limit(3).toArray((err, articles) => {
            if (err) {
                error(err);
            }
            else {
                callback(articles);
            }
        });
    },
    
    getArticleAmount (callback, error) {
        Articles.find({
            "status": 1
        }).count((err, count) => {
            if (err) {
                error(err);
            }
            else {
                callback(count);
            }
        });
    },
    
    getAdminArticle (articleId, callback, error) {
        Articles.findOne({
            "_id": articleId,
        }, (err, article) => {
            if (err) {
                error(err);
            }
            else {
                callback(article);
            }
        });
    },
    
    getArticle (articleId, callback, error) {
        Articles.findOne({
            "id": articleId,
            "status": 1
        }, (err, article) => {
            if (err) {
                error(err);
            }
            else {
                callback(article);
            }
        });
    },
    
    newArticle (title, subtitle, tags, status, dateTime, cover, content, callback, error) {
        Articles.insertOne({
            "title": title,
            "subtitle": subtitle,
            "tags": tags,
            "status": status,
            "date_time": dateTime
        }, function (err, result) {
            if (err) {
                error(err);
            }
            else {
                
                // Get the insert id we just got
                var articleId = result["insertedId"];
                
                // Upload the cover image
                var coverBuf = decodeBase64Image(cover);
                var coverName = "article/" + articleId + "/cover.jpg";
                AWS.saveImage(coverName, coverBuf, function (location) {
                    
                    // Then process the content and upload all the images within
                    var $ = Cheerio.load("<body>" + content + "</body>");
                    Promise.all($("img"), (elem, i, c, e) => {
                        
                        var buf = decodeBase64Image($(elem).attr("src"));
                        var name = "article/" + articleId + "/" + i + ".jpg";
                        AWS.saveImage(name, buf, function (location) {
                            $(elem).attr("src", location);
                            c();
                        }, (err) => {
                            e(err);
                        });
                    }, () => {
                        Articles.updateOne({ "_id": ObjectId(articleId) }, {
                            $set: {
                                "cover": coverName,
                                "content": $("body").html()
                            }
                        }, function (err, result) {
                            if (err) {
                                error(err);
                            }
                            else {
                                callback();
                            }
                        });
                    }, error);
                }, (err) => {
                    error(err);
                });
            }
        });
    }
}

const BASE_64_REGEX = /^data:([A-Za-z-+\/]+);base64,(.+)$/;

function decodeBase64Image(data) {
    var matches = data.match(BASE_64_REGEX);
    if (matches.length !== 3) {
        throw new Error('Invalid input string');
    }
    return new Buffer(matches[2], 'base64');
}

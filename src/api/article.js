const AWS = require("./lib/aws");
const Promise = require("./lib/promise");
const ObjectId = require("./lib/object_id");

const Mongo = require("keeling-js/lib/mongo");
const Debug = require("keeling-js/lib/debug");
const Image = require("keeling-js/lib/image");

const Cheerio = require("cheerio");

const Articles = Mongo.db.collection("article");

module.exports = {
    adminExists (articleId, callback, error) {
        Articles.find({
            "_id": ObjectId(articleId)
        }).count((err, count) => {
            if (err) {
                error(err);
            }
            else {
                console.log(count);
                callback(count != 0);
            }
        });
    },
    
    exists (articleId, callback, error) {
        Articles.find({
            "_id": ObjectId(articleId),
            "status": 1
        }).count((err, count) => {
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
            "status": 1,
            "comments": 1
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
    
    deleteArticle (articleId, callback, error) {
        Articles.deleteOne({ _id: ObjectId(articleId) }, function (err) {
            if (err) {
                error(err);
            }
            else {
                callback();
            }
        });
    },
    
    getLatestArticles (callback, error) {
        Articles.find({
            "status": 1
        }, {
            "title": 1,
            "subtitle": 1,
            "cover": 1
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
            "_id": ObjectId(articleId)
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
            "_id": ObjectId(articleId),
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
    
    getNextArticle (currArticleId, currArticleDateTime, callback, error) {
        Articles.find({
            "status": 1,
            "date_time": {
                $gt: currArticleDateTime
            }
        }, {
            "title": 1,
            "cover": 1
        }).sort({
            "date_time": 1
        }).limit(1).toArray((err, articles) => {
            if (err) {
                error(err);
            }
            else {
                callback(articles[0]);
            }
        });
    },
    
    getPreviousArticle (currArticleId, currArticleDateTime, callback, error) {
        Articles.find({
            "status": 1,
            "date_time": {
                $lt: currArticleDateTime
            }
        }, {
            "title": 1,
            "cover": 1
        }).sort({
            "date_time": -1
        }).limit(1).toArray((err, articles) => {
            if (err) {
                error(err);
            }
            else {
                callback(articles[0]);
            }
        });
    },
    
    updateArticle (articleId, title, subtitle, tags, status, dateTime, cover, content, callback, error) {
        AWS.listObjects("article/" + articleId + "/", (files) => {
            
            var $ = Cheerio.load("<body>" + content + "</body>");
            var maxImageId = 0;
            
            // First remove all the deleted images
            Promise.all(files.filter((file) => {
                return file.key.indexOf("cover") == -1;
            }), (file, i, c, e) => {
                if ($("img[src='" + file.url + "']").length == 0) {
                    AWS.removeImage(file.key, c, e);
                }
                else {
                    c();
                }
            }, () => {
                
                function next(coverLocation) {
                    
                    // Then upload all new uploaded images
                    var $imgs = $("img:not([data-aws])");
                    Promise.all($imgs, (elem, i, c, e) => {
                        try {
                            var buf = Image.decodeBase64($(elem).attr("src"));
                        }
                        catch (err) {
                            $(elem).attr("data-aws", "0");
                            c();
                            return;
                        }
                        
                        var name = "article/" + articleId + "/" + i + ".jpg";
                        AWS.saveImage(name, buf, function (location) {
                            $(elem).attr("src", location).attr("data-aws", "1");
                            c();
                        }, (err) => {
                            e(err);
                        });
                    }, () => {
                        Articles.updateOne({ "_id": ObjectId(articleId) }, {
                            $set: {
                                "title": title,
                                "subtitle": subtitle,
                                "tags": tags,
                                "status": parseInt(status),
                                "date_time": new Date(Date.parse(dateTime)),
                                "cover": coverLocation,
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
                }
                
                // First upload cover
                try {
                    var coverBuf = Image.decodeBase64(cover);
                    var coverName = "article/" + articleId + "/cover.jpg";
                    AWS.saveImage(coverName, coverBuf, function (location) {
                        var coverLocation = location;
                        next(coverLocation);
                    }, error);
                }
                catch (err) {
                    next(cover);
                }
            }, error);
        }, error);
    },
    
    newArticle (title, subtitle, tags, status, dateTime, cover, content, callback, error) {
        Articles.insertOne({
            "username": "Liby99",
            "title": title,
            "subtitle": subtitle,
            "tags": tags,
            "status": parseInt(status),
            "view": 0,
            "date_time": new Date(Date.parse(dateTime)),
            "update_date_time": new Date(),
            "comments": []
        }, function (err, result) {
            if (err) {
                error(err);
            }
            else {
                
                // Get the insert id we just got
                var articleId = result["insertedId"];
                
                // Upload the cover image
                var coverBuf = Image.decodeBase64(cover);
                var coverName = "article/" + articleId + "/cover.jpg";
                AWS.saveImage(coverName, coverBuf, function (location) {
                
                    // Then process the content and upload all the images within
                    var $ = Cheerio.load("<body>" + content + "</body>");
                    Promise.all($("img"), (elem, i, c, e) => {
                
                        try {
                            var buf = Image.decodeBase64($(elem).attr("src"));
                        }
                        catch (err) {
                            $(elem).attr("data-aws", "0");
                            c();
                            return;
                        }
                
                        var name = "article/" + articleId + "/" + i + ".jpg";
                        AWS.saveImage(name, buf, function (location) {
                            $(elem).attr("src", location);
                            $(elem).attr("data-aws", "1");
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
    },
    
    changeStatus (articleId, status, callback, error) {
        Articles.updateOne({
            "_id": ObjectId(articleId)
        }, {
            $set: {
                "status": parseInt(status)
            }
        }, (err) => {
            if (err) {
                error(err);
            }
            else {
                callback(err);
            }
        })
    },
    
    read (articleId, callback, error) {
        Articles.updateOne({
            "_id": ObjectId(articleId)
        }, {
            $inc: {
                "view": 1
            }
        }, (err) => {
            if (err) {
                error(err);
            }
            else {
                callback();
            }
        });
    },
    
    getAdminComments (articleId, callback, error) {
        Articles.aggregate([{
            $match: {
                "_id": ObjectId(articleId)
            }
        }, {
            $unwind: "$comments"
        }, {
            $replaceRoot: {
                newRoot: "$comments"
            }
        }]).toArray((err, comments) => {
            if (err) {
                error(err);
            }
            else {
                callback(comments);
            }
        });
    },
    
    newComment (articleId, username, email, content, callback) {
        Articles.updateOne({
            "_id": ObjectId(articleId)
        }, {
            $push: {
                "comments": {
                    "_id": ObjectId(),
                    "username": username,
                    "email": email,
                    "content": content,
                    "date_time": new Date(),
                    "deleted": false
                }
            }
        }, (err, result) => {
            if (err) {
                error(err);
            }
            else {
                callback();
            }
        });
    },
    
    getComments (articleId, callback, error) {
        Articles.aggregate([{
            $match: {
                "_id": ObjectId(articleId)
            }
        }, {
            $unwind: "$comments"
        }, {
            $replaceRoot: {
                newRoot: "$comments"
            }
        }, {
            $match: {
                "deleted": false
            }
        }]).toArray((err, comments) => {
            if (err) {
                error(err);
            }
            else {
                callback(comments);
            }
        });
    },
    
    deleteComment (articleId, commentId, callback, error) {
        Articles.updateOne({
            "_id": articleId,
            "comments._id": ObjectId(commentId)
        }, {
            $set: {
                "comments.$.deleted": true
            }
        }, (err) => {
            if (err) {
                error(err);
            }
            else {
                callback();
            }
        });
    },
    
    undeleteComment (articleId, commentId, callback, error) {
        Articles.updateOne({
            "_id": articleId,
            "comments._id": ObjectId(commentId)
        }, {
            $set: {
                "comments.$.deleted": false
            }
        }, (err) => {
            if (err) {
                error(err);
            }
            else {
                callback();
            }
        });
    }
}

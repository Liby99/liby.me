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
            },
            skip: start,
            limit: 5
        }).toArray((err, articles) => {
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
        uploadCover(articleId, cover, (coverUrl, coverUploaded) => {
            uploadContentImage(articleId, content, (html) => {
                Articles.updateOne({
                    "_id": ObjectId(articleId)
                }, {
                    $set: {
                        "title": title,
                        "subtitle": subtitle,
                        "tags": tags,
                        "status": parseInt(status),
                        "date_time": new Date(Date.parse(dateTime)),
                        "update_date_time": new Date(),
                        "cover": coverUrl,
                        "content": html,
                    }
                }, (err, result) => {
                    if (err) {
                        error(err);
                    }
                    else {
                        callback();
                    }
                });
            }, error);
        }, error);
    },
    
    newArticle (title, subtitle, tags, status, dateTime, cover, content, callback, error) {
        var articleId = ObjectId();
        uploadCover(articleId, cover, (coverUrl, coverUploaded) => {
            uploadContentImage(articleId, content, (html) => {
                Articles.insertOne({
                    "_id": articleId,
                    "username": "Liby99",
                    "title": title,
                    "subtitle": subtitle,
                    "tags": tags,
                    "status": parseInt(status),
                    "view": 0,
                    "date_time": new Date(Date.parse(dateTime)),
                    "update_date_time": new Date(),
                    "cover": coverUrl,
                    "content": html,
                    "comments": []
                }, (err, result) => {
                    if (err) {
                        error(err);
                    }
                    else {
                        callback();
                    }
                });
            }, error);
        }, error);
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

function findNextGap (arr) {
    arr = arr.sort();
    for (var i = 0; i < arr.length; i++)
        if (i != arr[i])
            return i;
    return arr.length;
}

const IMAGE_REGEX = /\/(\d+).jpg$/;

function uploadContentImage (articleId, content, callback, error) {
    var $ = Cheerio.load("<body>" + content + "</body>");
    removeUnusedImage(articleId, $, (files) => {
        var ids = files.filter((f) => !f.removed).map((f) => parseInt(f.key.match(IMAGE_REGEX)[1]));
        Promise.all($("img:not([data-aws])"), (elem, i, c, e) => {
            var id = findNextGap(ids);
            ids.push(id);
            var name = "article/" + articleId + "/" + id + ".jpg";
            var img = $(elem).attr("src");
            uploadImage(name, img, (location, uploaded) => {
                $(elem).attr("src", location).attr("data-aws", uploaded ? 1 : 0);
                c();
            }, e);
        }, () => {
            callback($("body").html());
        }, error);
    }, error);
}

function removeUnusedImage (articleId, $, callback, error) {
    AWS.listObjects("article/" + articleId + "/", (files) => {
        contentFiles = files.filter((file) => file.key.indexOf("cover") == -1 && file.key.indexOf("thumb") == -1);
        Promise.all(contentFiles, (file, i, c, e) => {
            if ($("img[src='" + file.url + "']").length == 0) {
                file.removed = true;
                AWS.removeImage(file.key, c, e);
            }
            else {
                c();
            }
        }, () => {
            callback(contentFiles);
        }, error);
    }, error);
}

function uploadCover (articleId, cover, callback, error) {
    uploadImage("article/" + articleId + "/cover.jpg", cover, callback, error);
}

function uploadImage (name, img, callback, error) {
    try {
        var buf = Image.decodeBase64(img);
        AWS.saveImage(name, buf, (location) => {
            callback(location, true);
        }, error);
    }
    catch (err) {
        callback(img, false);
    }
}

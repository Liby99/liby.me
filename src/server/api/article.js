var mysql = require("../module/mysql.js");

module.exports = {
    exists: function (article, callback) {
        mysql.query("SELECT `id` FROM `article` WHERE ?", {
            "AUID": article
        }, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                if (result.length > 0) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            }
        });
    },
    getAdminArticles: function (callback) {
        mysql.query("SELECT * FROM `article` ORDER BY `date_time` DESC", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    getArticles: function (callback) {
        mysql.query("SELECT `AUID`, `username`, `date_time`, `cover`, `title`, `subtitle`, `tags`, SUBSTRING(`content`, 1, 200) AS `content`, `view`, `comment` FROM `article` WHERE `status` = 1 ORDER BY `date_time` DESC", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    getAdminArticle: function (article, callback) {
        mysql.query("SELECT * FROM `article` WHERE ?", {
            "AUID": article
        }, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    getArticle: function (article, callback) {
        this.getAdminArticle(article, function (result) {
            if (result) {
                if (result["status"] == 1) {
                    delete result.status;
                    callback(result);
                }
                else {
                    callback(undefined);
                }
            }
            else {
                callback(undefined);
            }
        });
    },
    updateArticle: function (AUID, title, subtitle, tags, status, cover, content, callback) {
        mysql.query("UPDATE `article` SET `update_date_time` = NOW(), `title` = ?, `subtitle` = ?, `tags` = ?, `status` = ?, `cover` = ?, `content` = ? WHERE `AUID` = ?", [
            title,
            subtitle,
            tags,
            status,
            cover,
            content,
            AUID
        ], function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                console.log("Article " + title + " got updated. ");
                callback(true);
            }
        });
    },
    newArticle: function (title, subtitle, tags, status, cover, content, callback) {
        mysql.query("INSERT INTO `article` SET `AUID` = UUID(), `date_time` = NOW(), `update_date_time` = NOW(), ?", {
            "title": title,
            "subtitle": subtitle,
            "tags": tags,
            "status": status,
            "cover": cover,
            "content": content
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                console.log("New article " + title + " created. ");
                callback(true);
            }
        });
    },
    changeStatus: function (article, status, callback) {
        mysql.query("UPDATE `article` SET `status` = ? WHERE `AUID` = ?", [
            status,
            article
        ], function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    },
    read: function (article, callback) {
        mysql.query("UPDATE `article` SET `view` = `view` + 1 WHERE ?", {
            "AUID": article
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    },
    getAdminComments: function (article, callback) {
        mysql.query("SELECT * FROM `comment` WHERE ? ORDER BY `date_time` DESC", {
            "AUID": article
        }, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    newComment: function (article, username, email, isPrivate, content, callback) {
        mysql.query("INSERT INTO `comment` SET `CUID` = UUID(), `date_time` = NOW(), ?", {
            "AUID": article,
            "username": username,
            "email": email,
            "private": isPrivate ? 1 : 0,
            "content": content
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                console.log("New comment is written by " + username + " on " + (new Date()).toString());
                callback(true);
            }
        });
    },
    getComments: function (article, callback) {
        mysql.query("SELECT * FROM `comment` WHERE `private` = 0 AND `deleted` = 0 AND ? ORDER BY `date_time` DESC", {
            "AUID": article
        }, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    deleteComment: function (comment, callback) {
        mysql.query("UPDATE `comment` SET `deleted` = 1 WHERE ?", {
            "CUID": comment
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    },
    undeleteComment: function (comment, callback) {
        mysql.query("UPDATE `comment` SET `deleted` = 0 WHERE ?", {
            "CUID": comment
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        })
    }
}

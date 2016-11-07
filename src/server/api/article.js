var mysql = require("../module/mysql.js");
var file = require("../module/file.js");

module.exports = {
    PAGE_ARTICLE_AMOUNT: 5,
    adminExists: function (article, callback) {
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
    exists: function (article, callback) {
        mysql.query("SELECT `id` FROM `article` WHERE `status` = 1 AND ?", {
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
    getArticles: function (start, callback) {
        mysql.query("SELECT `AUID`, `username`, `date_time`, `title`, `subtitle`, `tags`, SUBSTRING(REPLACE(`content`, '/\<[^\>]*\>/g', ''), 1, 200) AS `content`, `view`, `comment` "
                  + "FROM `article` WHERE `status` = 1 "
                  + "ORDER BY `date_time` DESC "
                  + "LIMIT " + start + ", " + this.PAGE_ARTICLE_AMOUNT, {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    deleteArticle: function (article, callback) {
        mysql.query("DELETE FROM `article` WHERE ?", {
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
    getLatestArticles: function (callback) {
        mysql.query("SELECT `AUID`, `title`, `subtitle` FROM `article` WHERE `status` = 1 ORDER BY `date_time` DESC LIMIT 3", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    getArticleAmount: function (callback) {
        mysql.query("SELECT COUNT(`id`) AS `count` FROM `article` WHERE `status` = 1", {}, function (err, result) {
            if (err) {
                callback(-1);
            }
            else {
                callback(result[0]["count"]);
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
                callback(result[0]);
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
    getNextArticle: function (article, callback) {
        mysql.query("SELECT `AUID`, `title` FROM `article` WHERE `date_time` > (SELECT `date_time` FROM `article` WHERE ?) AND `status` = 1 ORDER BY `date_time` ASC LIMIT 1", {
            "AUID": article
        }, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                if (result.length > 0) {
                    callback(result[0]);
                }
                else {
                    callback(undefined);
                }
            }
        });
    },
    getPreviousArticle: function (article, callback) {
        mysql.query("SELECT `AUID`, `title` FROM `article` WHERE `date_time` < (SELECT `date_time` FROM `article` WHERE ?) AND `status` = 1 ORDER BY `date_time` DESC LIMIT 1", {
            "AUID": article
        }, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                if (result.length > 0) {
                    callback(result[0]);
                }
                else {
                    callback(undefined);
                }
            }
        });
    },
    updateArticle: function (AUID, title, subtitle, tags, status, dateTime, cover, content, callback) {
        var self = this;
        mysql.query("UPDATE `article` SET `update_date_time` = NOW(), `title` = ?, `subtitle` = ?, `tags` = ?, `status` = ?, `date_time` = ?, `content` = ? WHERE `AUID` = ?", [
            title,
            subtitle,
            tags,
            status,
            dateTime,
            content,
            AUID
        ], function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                self.saveCover(AUID, cover, function (err) {
                    console.log("Article " + title + " got updated. ");
                    callback(true);
                });
            }
        });
    },
    newArticle: function (title, subtitle, tags, status, dateTime, cover, content, callback) {
        var self = this;
        mysql.query("INSERT INTO `article` SET `AUID` = UUID(), `update_date_time` = NOW(), ?", {
            "title": title,
            "subtitle": subtitle,
            "tags": tags,
            "status": status,
            "date_time": dateTime,
            "content": content
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                mysql.query("SELECT `AUID` FROM `article` WHERE `id` = LAST_INSERT_ID()", {}, function (err, result) {
                    if (err) {
                        callback(false);
                    }
                    else {
                        if (result.length == 0) {
                            callback(false);
                        }
                        else {
                            self.saveCover(result[0]["AUID"], cover, function (err) {
                                if (err) {
                                    callback(false);
                                }
                                else {
                                    console.log("New article " + title + " created. ");
                                    callback(true);
                                }
                            })
                        }
                    }
                });
            }
        }, false);
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
    comment: function (article, callback) {
        mysql.query("UPDATE `article` SET `comment` = `comment` + 1 WHERE ?", {
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
    newComment: function (article, username, email, content, callback) {
        this.comment(article, function (success) {
            if (success) {
                mysql.query("INSERT INTO `comment` SET `CUID` = UUID(), `date_time` = NOW(), ?", {
                    "AUID": article,
                    "username": username,
                    "email": email,
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
            }
            else {
                callback(false);
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
            if (result.affectedRows > 0) {
                mysql.query("UPDATE `article` SET `comment` = `comment` - 1 WHERE `AUID` = (SELECT `AUID` FROM `comment` WHERE ?)", {
                    "CUID": comment
                }, function (err, result) {
                    if (err) {
                        callback(false);
                    }
                    else {
                        callback(true);
                    }
                });
            }
            else {
                callback(false);
            }
        });
    },
    undeleteComment: function (comment, callback) {
        mysql.query("UPDATE `comment` SET `deleted` = 0 WHERE ?", {
            "CUID": comment
        }, function (err, result) {
            if (result.affectedRows > 0) {
                mysql.query("UPDATE `article` SET `comment` = `comment` + 1 WHERE `AUID` = (SELECT `AUID` FROM `comment` WHERE ?)", {
                    "CUID": comment
                }, function (err, result) {
                    if (err) {
                        callback(false);
                    }
                    else {
                        callback(true);
                    }
                });
            }
            else {
                callback(false);
            }
        });
    },
    saveCover: function (AUID, data, callback) {
        file.saveImage("/article/" + AUID + ".jpg", data, function (err) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    },
    removeCover: function (AUID) {
        file.removeImage("/article/" + AUID + ".jpg");
    }
}

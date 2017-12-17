var mysql = require("keeling-js/lib/mysql.js");
var file = require("./lib/file.js");

module.exports = {
    getAdminProjects: function (callback) {
        mysql.query("SELECT * FROM `project` ORDER BY `date_time` DESC", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    getThreeProjects: function (callback) {
        mysql.query("SELECT `PUID`, `name`, `author`, `url` FROM `project` WHERE `status` = 1 ORDER BY `date_time` DESC LIMIT 3", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    getProjects: function (callback) {
        mysql.query("SELECT `PUID`, `name`, `author`, `url` FROM `project` WHERE `status` = 1 ORDER BY `date_time` DESC", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    getAdminProjectData: function (project, callback) {
        mysql.query("SELECT * FROM `project` WHERE ?", {
            "PUID": project
        }, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result[0]);
            }
        });
    },
    getProjectData: function (project, callback) {
        this.getAdminProjectData(project, function (data) {
            if (data == undefined) {
                callback(undefined);
            }
            else {
                delete data.status;
                delete data.PUID;
                delete data.id;
                callback(data);
            }
        });
    },
    updateProject: function (PUID, name, author, url, status, dateTime, cover, callback) {
        var self = this;
        mysql.query("UPDATE `project` SET `name` = ?, `author` = ?, `url` = ?, `status` = ?, `date_time` = ? WHERE `PUID` = ?", [
            name,
            author,
            url,
            status,
            dateTime,
            PUID
        ], function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                self.saveCover(PUID, cover, function (err) {
                    callback(true);
                });
            }
        })
    },
    newProject: function (name, author, url, status, dateTime, cover, callback) {
        var self = this;
        mysql.query("INSERT INTO `project` SET `PUID` = UUID(), ?", {
            "name": name,
            "author": author,
            "url": url,
            "status": status,
            "date_time": dateTime
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                mysql.query("SELECT `PUID` FROM `project` WHERE `id` = LAST_INSERT_ID()", {}, function (err, result) {
                    if (err) {
                        callback(false);
                    }
                    else {
                        if (result.length == 0) {
                            callback(false);
                        }
                        else {
                            self.saveCover(result[0]["PUID"], cover, function (err) {
                                if (err) {
                                    self.removeProject(result[0]["PUID"], function () {
                                        callback(false);
                                    });
                                }
                                else {
                                    callback(true);
                                }
                            });
                        }
                    }
                });
            }
        }, false);
    },
    removeProject: function (PUID, callback) {
        mysql.query("DELETE FROM `project` WHERE ?", {
            "PUID": PUID
        }, function (err, result) {
            callback();
        });
    },
    changeStatus: function (project, status, callback) {
        mysql.query("UPDATE `project` SET `status` = ? WHERE `PUID` = ?", [
            status,
            project
        ], function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    },
    saveCover: function (PUID, data, callback) {
        file.saveImage("/project/" + PUID + ".jpg", data, function (err) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    }
}

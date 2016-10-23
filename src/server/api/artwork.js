var mysql = require("../module/mysql.js");
var file = require("../module/file.js");

module.exports = {
    getAdminArtworks: function (callback) {
        mysql.query("SELECT * FROM `artwork` ORDER BY `date_time` DESC", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    getLatestArtworks: function (callback) {
        mysql.query("SELECT `AUID`, `title`, `subtitle`, `type`, `source_type`, `source_url`, `date_time` FROM `artwork` WHERE `status` = 1 ORDER BY `date_time` DESC LIMIT 12", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    getArtworksOfYear: function (year, callback) {
        mysql.query("SELECT `AUID`, `date_time` FROM `artwork` WHERE `status` = 1 AND YEAR(`date_time`) = ? ORDER BY `date_time` ASC", [
            year
        ], function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
            }
        });
    },
    hasArtworksOfYear: function (year, callback) {
        mysql.query("SELECT COUNT(`id`) AS `count` FROM `artwork` WHERE `status` = 1 AND YEAR(`date_time`) = ?", [
            year
        ], function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                if (result[0]["count"] == 0) {
                    callback(false);
                }
                else {
                    callback(true);
                }
            }
        });
    },
    getAdminArtworkData: function (artwork, callback) {
        mysql.query("SELECT * FROM `artwork` WHERE ?", {
            "AUID": artwork
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
    getArtworkData: function (artwork, callback) {
        var self = this;
        this.getAdminArtworkData(artwork, function (result) {
            if (result) {
                if (result.status == 1) {
                    delete result.status;
                    var dt = (new Date(Date.parse(result["date_time"])));
                    result["type"] = self.getTypeString(result["type"]);
                    result["date_time"] = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                    callback(result);
                }
                else {
                    callback(undefined);
                }
            }
            else {
                callback(undefined);
            }
        })
    },
    newArtwork: function (title, subtitle, status, dateTime, type, sourceType, sourceUrl, softwares, tags, cover, thumbnail, description, callback) {
        var self = this;
        mysql.query("INSERT INTO `artwork` SET `AUID` = UUID(), ?", {
            "title": title,
            "subtitle": subtitle,
            "status": status,
            "date_time": dateTime,
            "type": type,
            "source_type": sourceType,
            "source_url": sourceUrl,
            "softwares": softwares,
            "tags": tags,
            "description": description
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                mysql.query("SELECT `AUID` FROM `artwork` WHERE `id` = LAST_INSERT_ID()", {}, function (err, result) {
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
                                    self.removeArtwork(result[0]["AUID"], function (success) {
                                        callback(false);
                                    });
                                }
                                else {
                                    self.saveThumbnail(result[0]["AUID"], thumbnail, function (err) {
                                        if (err) {
                                            self.removeArtwork(result[0]["AUID"], function (success) {
                                                self.removeCover(result[0]["AUID"]);
                                                callback(false);
                                            });
                                        }
                                        else {
                                            callback(true);
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }, false);
    },
    updateArtwork: function (AUID, title, subtitle, status, dateTime, type, sourceType, sourceUrl, softwares, tags, cover, thumbnail, description, callback) {
        var self = this;
        mysql.query("UPDATE `artwork` SET `title` = ?, `subtitle` = ?, `status` = ?, `date_time` = ?, `type` = ?, `source_type` = ?, `source_url` = ?, `softwares` = ?, `tags` = ?, `description` = ? WHERE `AUID` = ?", [
            title,
            subtitle,
            status,
            dateTime,
            type,
            sourceType,
            sourceUrl,
            softwares,
            tags,
            description,
            AUID
        ], function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                self.saveCover(AUID, cover, function (err) {
                    self.saveThumbnail(AUID, thumbnail, function (err) {
                        callback(true);
                    });
                });
            }
        });
    },
    changeArtworkStatus: function (artwork, status, callback) {
        mysql.query("UPDATE `artwork` SET `status` = ? WHERE `AUID` = ?", [
            status,
            artwork
        ], function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    },
    removeArtwork: function (artwork, callback) {
        mysql.query("DELETE FROM `artwork` WHERE ?", {
            "AUID": artwork
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                this.removeCover(artwork);
                this.removeThumbnail(artwork);
                callback(true);
            }
        });
    },
    getTypeString: function (type) {
        switch (type) {
            case 0: return "3D Rendering";
            case 1: return "Special Effects";
            case 2: return "Video Clips";
            case 3: return "Photography";
            case 4: return "Graphics Design";
            case 5: return "3D Model";
            case 6: return "Instrument";
            case 7: return "Music Sheet";
            case 8: return "Development";
            case 9: return "Illustration";
        }
    },
    saveCover: function (AUID, data, callback) {
        file.saveImage("/artwork/cover/" + AUID + ".jpg", data, function (err) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    },
    saveThumbnail: function (AUID, data, callback) {
        file.saveImage("/artwork/thumbnail/" + AUID + ".jpg", data, function (err) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    },
    removeCover: function (AUID) {
        file.removeImage("/artwork/cover/" + AUID + ".jpg");
    },
    removeThumbnail: function (AUID) {
        file.removeImage("/artwork/thumbnail/" + AUID + ".jpg");
    }
}

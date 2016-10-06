var mysql = require("../module/mysql.js");

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
        mysql.query("SELECT TOP 10 `AUID`, `title`, `subtitle`, `type`, `source_type`, `source_url`, `cover` FROM `artwork` WHERE `status` = 1", {}, function (err, result) {
            if (err) {
                callback(undefined);
            }
            else {
                callback(result);
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
    newArtwork: function (title, subtitle, status, type, sourceType, sourceUrl, softwares, tags, cover, thumbnail, description, callback) {
        mysql.query("INSERT INTO `artwork` SET `AUID` = UUID(), `date_time` = NOW(), ?", {
            "title": title,
            "subtitle": subtitle,
            "status": status,
            "type": type,
            "source_type": sourceType,
            "source_url": sourceUrl,
            "softwares": softwares,
            "tags": tags,
            "cover": cover,
            "thumbnail": thumbnail,
            "description": description
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    },
    updateArtwork: function (artwork, title, subtitle, status, type, sourceType, sourceUrl, softwares, tags, cover, thumbnail, description, callback) {
        mysql.query("UPDATE `artwork` SET `title` = ?, `subtitle` = ?, `status` = ?, `type` = ?, `source_type` = ?, `source_url` = ?, `softwares` = ?, `tags` = ?, `cover` = ?, `thumbnail` = ?, `description` = ? WHERE `AUID` = ?", [
            title,
            subtitle,
            status,
            type,
            sourceType,
            sourceUrl,
            softwares,
            tags,
            cover,
            thumbnail,
            description
        ], function (err, result) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
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
    deleteArtwork: function (artwork, callback) {
        mysql.query("DELETE FROM `artwork` WHERE ?", {
            "AUID": artwork
        }, function (err, result) {
            if (err) {
                callback(false);
            }
            else {
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
        }
    }
}

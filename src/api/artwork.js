const Mongo = require("keeling-js/lib/mongo");
const Image = require("keeling-js/lib/image");
const ObjectId = require("./lib/object_id");
const Promise = require("./lib/promise");
const AWS = require("./lib/aws");
const Artworks = Mongo.db.collection("artwork");
const Cheerio = require("cheerio");

module.exports = {
    getAdminArtworks (callback, error) {
        Artworks.find({}).sort({
            "date_time": -1
        }).toArray((err, artworks) => {
            if (err) {
                error(err);
            }
            else {
                callback(artworks);
            }
        });
    },
    getLatestArtworks (callback, error)  {
        Artworks.find({
            "status": 1
        }, {
            "description": 0
        }).sort({
            "date_time": -1
        }).limit(12).toArray((err, artworks) => {
            if (err) {
                error(err);
            }
            else {
                callback(artworks);
            }
        });
    },
    getArtworksOfYear (year, callback, error) {
        Artworks.find({
            $where: "this.date_time.getFullYear() == " + year,
            status: 1
        }, {
            "thumb": 1,
            "date_time": 1
        }).sort({
            date_time: 1
        }).toArray((err, artworks) => {
            if (err) {
                error(err);
            }
            else {
                callback(artworks);
            }
        });
    },
    hasArtworksOfYear (year, callback, error) {
        Artworks.find({
            $where: "this.date_time.getFullYear() == " + year,
            status: 1
        }).count((err, count) => {
            if (err) {
                error(err);
            }
            else {
                callback(count > 0);
            }
        });
    },
    getAdminArtworkData (artworkId, callback, error) {
        Artworks.findOne({
            "_id": ObjectId(artworkId)
        }, (err, artwork) => {
            if (err) {
                error(err);
            }
            else {
                callback(artwork);
            }
        });
    },
    getArtworkData (artworkId, callback, error) {
        Artworks.findOne({
            "_id": ObjectId(artworkId),
            "status": 1
        }, (err, artwork) => {
            if (err) {
                error(err);
            }
            else {
                callback(artwork);
            }
        });
    },
    view (artworkId, callback, error) {
        Artworks.updateOne({
            "_id": ObjectId(artworkId)
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
        })
    },
    newArtwork (title, subtitle, status, dateTime, type, sourceType, sourceUrl, softwares, tags, cover, thumb, description, callback, error) {
        var artworkId = ObjectId();
        uploadThumbnail(artworkId, thumb, (thumbUrl, thumbUploaded) => {
            uploadCover(artworkId, cover, (coverUrl, coverUploaded) => {
                uploadContentImage(artworkId, description, (html) => {
                    Artworks.insertOne({
                        "_id": artworkId,
                        "username": "Liby99",
                        "title": title,
                        "subtitle": subtitle,
                        "status": parseInt(status),
                        "type": parseInt(type),
                        "source_type": parseInt(sourceType),
                        "source_url": sourceUrl,
                        "date_time": new Date(Date.parse(dateTime)),
                        "softwares": softwares,
                        "tags": tags,
                        "cover": coverUrl,
                        "thumb": thumbUrl,
                        "description": html,
                        "view": 0
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
        }, error);
    },
    updateArtwork (artworkId, title, subtitle, status, dateTime, type, sourceType, sourceUrl, softwares, tags, cover, thumb, description, callback, error) {
        uploadThumbnail(artworkId, thumb, (thumbUrl, thumbUploaded) => {
            uploadCover(artworkId, cover, (coverUrl, coverUploaded) => {
                uploadContentImage(artworkId, description, (html) => {
                    Artworks.updateOne({
                        "_id": ObjectId(artworkId)
                    }, {
                        $set: {
                            "title": title,
                            "subtitle": subtitle,
                            "status": parseInt(status),
                            "type": parseInt(type),
                            "source_type": parseInt(sourceType),
                            "source_url": parseInt(sourceUrl),
                            "date_time": new Date(Date.parse(dateTime)),
                            "softwares": softwares,
                            "tags": tags,
                            "cover": coverUrl,
                            "thumb": thumbUrl,
                            "description": html
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
        }, error);
    },
    changeArtworkStatus (artworkId, status, callback, error) {
        Artworks.updateOne({
            "_id": ObjectId(artworkId)
        }, {
            $set: {
                "status": parseInt(status)
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
    getTypeString (type) {
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

function uploadContentImage (artworkId, description, callback, error) {
    var $ = Cheerio.load("<body>" + description + "</body>");
    removeUnusedImage(artworkId, $, (files) => {
        var ids = files.filter((f) => !f.removed).map((f) => parseInt(f.key.match(IMAGE_REGEX)[1]));
        Promise.all($("img:not([data-aws])"), (elem, i, c, e) => {
            var id = findNextGap(ids);
            ids.push(id);
            var name = "artwork/" + artworkId + "/" + id + ".jpg";
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

function removeUnusedImage (artworkId, $, callback, error) {
    AWS.listObjects("artwork/" + artworkId + "/", (files) => {
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

function uploadThumbnail (artworkId, thumbnail, callback, error) {
    uploadImage("artwork/" + artworkId + "/thumb.jpg", thumbnail, callback, error);
}

function uploadCover (artworkId, cover, callback, error) {
    uploadImage("artwork/" + artworkId + "/cover.jpg", cover, callback, error);
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

const ArtworkOld = require("../api/artwork.old");
const Artwork = require("../api/artwork");
const Promise = require("../api/lib/promise");
const fs = require("fs");
const path = require("path");

module.exports = function (req, res, callback) {
    ArtworkOld.getAdminArtworks(function (artworks) {
        Promise.all(artworks, (artwork, i, c, e) => {
            var cover = getCover(artwork["AUID"]);
            var thumb = getThumbnail(artwork["AUID"]);
            Artwork.newArtwork(artwork["title"], artwork["subtitle"], artwork["status"],
                artwork["date_time"], artwork["type"], artwork["source_type"], artwork["source_url"],
                artwork["softwares"], artwork["tags"], cover, thumb, artwork["description"], c, e);
        }, () => {
            res.send("success");
        }, (err) => {
            res.error(500, err);
            throw err;
        });
    });
}

function getCover (auid) {
    var filename = path.join(__dirname, "../public/img/artwork/cover/" + auid) + ".jpg";
    return getImage(filename);
}

function getThumbnail (auid) {
    var filename = path.join(__dirname, "../public/img/artwork/thumbnail/" + auid) + ".jpg";
    return getImage(filename);
}

function getImage (filename) {
    return "data:image/jpeg;base64," + fs.readFileSync(filename, "base64");
}

var Admin = require("../../api/admin.js");
var Artwork = require("../../api/artwork.js");

module.exports = function (req, res, callback) {
    Admin.verify(req, res, function () {
        Artwork.getAdminArtworks(function (artworks) {
            
            //Modify the type to type string
            for (var i = 0; i < artworks.length; i++) {
                artworks[i]["type"] = Artwork.getTypeString(artworks[i]["type"]);
            }
            
            //Callback the data
            callback({
                "artworks": artworks
            });
        });
    });
}

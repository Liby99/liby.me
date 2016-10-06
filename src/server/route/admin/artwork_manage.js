var Admin = require("../../api/admin.js");
var Artwork = require("../../api/artwork.js");

module.exports = function (req, res, callback) {
    Admin.verify(req, res, function () {
        Artwork.getAdminArtworks(function (artworks) {
            
            //Modify the type to type string
            for (var artwork in artworks) {
                artwork["type"] = getTypeString(artwork["type"]);
            }
            
            //Callback the data
            callback({
                "artworks": artworks
            });
        });
    });
}

function getTypeString(type) {
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

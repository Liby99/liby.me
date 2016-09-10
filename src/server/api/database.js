/**
 *
 */

module.exports = {
    
    /**
     * Get the top 10 artwork for the home page
     * callback: an array of artwork information
     */
    get_top_10_artworks: function (callback) {
        mysql.query("SELECT TOP 10 ", {}, function (err, result) {
            if (err) {
                console.log(err);
                callback(undefined);
            }
            else {
                
            }
        });
    }
}

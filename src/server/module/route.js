/**
 *
 */

module.exports = function (server) {
    server.get("/*.html", process);
}

function process(req, res) {
    
    var requestFile = req.query[0]
    
    //Check if there's a
    try {
        var route = require("../route/" + requestFile + ".js");
        
    }
    catch (ex) {
        
        //Check if the static file exists
        try {
            
        }
        catch {
            res.sendFile("./public/404.html");
        }
    }
}

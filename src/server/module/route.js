/**
 *
 */
 
var path = require("path");
var config = require("../data/config.json");
var debug = false;

exports.set = function (server) {
    
    /**
     * Regular File router
     */
    server.get(/\.html(\?(.\=.\&)+)?$/, process);
    server.post(/\.html(\?(.\=.\&)+)?$/, process);
}

function process(req, res) {
    var file = req.path.substring(1, req.path.indexOf(".html"));
    try {
        
        //Check if there's a route written
        var route = require("../route/" + file + ".js");
        log("Router " + file + " handling request");
        route(req, res, /*function (data) {
            res.render(data);
        }*/);
    }
    catch (err) {
        
        //Check if the module exists
        if (err.code === "MODULE_NOT_FOUND") {
            
            //First load the option
            var options = {
                root: path.resolve(__dirname + "/../../public/"),
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            }
            
            //Try send the static file
            res.sendFile(file + ".html", options, function (err) {
                
                //Check if there's an error rendering the static file.s
                if (err) {
                    
                    //Then Log the error
                    console.log(err);
                    
                    if (file === "404") {
                        
                        //To avoid 404 recursively requested, if there's an error sending 404 page then directly send the error message
                        log("Directly sent static html " + file);
                        res.status(404).send(config["404_message"]);
                    }
                    else {
                        
                        //If the request err is not 404, then directly send the 404 file.
                        res.redirect("/404.html");
                    }
                }
                else {
                    log("Directly sent static html " + file);
                }
            });
        }
        else {
            
            console.log("Router Error: ");
            console.log(err);
            res.status(500).send(config["500_message"]);
        }
    }
}

function log(text) {
    if (debug) {
        console.log(text);
    }
}

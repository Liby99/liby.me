/**
 * liby.me.js
 */

var express = require("express");
var config = require("./server/data/config.json");

function setDateTime() {
    require("./server/module/datetime.js")();
}

function setCache(server) {
    server.enable('view cache');
}

function setCookie(server) {
    var cookieParser = require("cookie-parser");
    server.use(cookieParser());
}

function setRenderEngine(server) {
    server.set("views", __dirname + "/public");
    server.engine(".html", require("ejs").__express);
    server.set('view engine', "html");
}

function setRoute(server) {
    setDefaultPage(server);
    setStaticField(server);
    setPageHandler(server);
}

function setDefaultPage(server) {
    
    server.get("/", function (req, res) {
        res.redirect("/" + config["default_page"]);
    });
    
    server.get("/admin/", function (req, res) {
        res.redirect("/" + config["admin_default_page"]);
    });
}

function setStaticField(server) {
    config["static_field"].forEach(function (obj, number) {
        server.use(obj, express.static(__dirname + "/public/" + obj));
    });
}

function setPageHandler(server) {
    require("./server/module/route.js").set(server);
}

function setAjax(server) {
    require("./server/module/ajax.js").set(server);
}

function setUpload(server) {
    require("./server/module/upload.js").set(server);
}

(function () {
    var server = express();
    
    setDateTime();
    setCache();
    setCookie(server);
    setRenderEngine(server);
    setRoute(server);
    setAjax(server);
    setUpload(server);
    
    server.listen(config['port'], function () {
        console.log(config['name'] + ' Server Now Listening to Port ' + config['port']);
    });
})();

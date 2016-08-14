/**
 * index.js
 */

var express = require("express");
var config = require("./server/data/config.js");

function setDateTime() {
    require("./server/module/datetime.js")();
}

function setCookie(server) {
    server.use(require("cookie-parser")());
    server.use(require("./server/handler/cookie.js"));
}

function setRoute(server) {
    setDefaultPage(server);
    setPageHandler(server);
    setStaticField(server);
}

function setDefaultPage(server) {
    server.get("/", function (req, res) {
        res.redirect("/" + config["default_page"]);
    });
}

function setPageHandler(server) {
    require("./server/module/route.js").set(server);
}

function setStaticField(server) {
    var fields = ["/css", "/js", "/fonts", "/img", "/view"];
    fields.forEach(function (obj, number) {
        server.use(obj, express.static(require("path").resolve("./public/" + obj)));
    });
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
    setCookie(server);
    setRoute(server);
    setAjax(server);
    setUpload(server);
    
    server.listen(config['port'], function () {
        console.log(config['name'] + ' Server Now Listening to Port ' + config['port']);
    });
})();

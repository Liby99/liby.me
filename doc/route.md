# Route

The routing module is divided into four parts:

1. Default Page

    the default page will be recognized as `/` request. The program will read the `default_page` attribute in the config file, and redirect the request
    
2. `.html` request
    
    The router will recognize all the request that contains `.html` string.
    
    It will first search in the `/server/route/` directory and see if there is such a router that has the same name as the html file (e.g. `index.html` will correspond to `/server/route/index.js`, `/admin/login.html` will be corresponded to `/server/route/admin/login.js`), and deliver the request and response to that router. Every router is a method that requires `req` and `res` objects.
    
    If there's no such router, it will directly send the static file to the user
    
    If there's no such file, it will send the 404.html to the user
    
    If there's even no `404.html`, it will just send a string contains 404 status
    
3. ajax requests

    The AJAX requests will have the format `/ajax/[handler]?action=[action]`. The handler file will be named as `handler.js` in `/server/handler` directory. All the handler will be an object, and each of its member will be an object named using the `action` name.
    
4. static requests

    The static requests will be handled statically. All the requests start with static field specified in the `static_field` in `config.json` will be handled statically.

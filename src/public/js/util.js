var Utility = {
    setCookie: function (entry, value) {
        var date = new Date();
        date.setDate(date.getDate() + 365);
        document.cookie = entry + "=" + value + ";expires=" + date.toLocaleDateString();
    },
    getCookie: function (entry) {
        if (document.cookie.length > 0) {
            start = document.cookie.indexOf(entry + "=")
            if (start != -1) {
                start += entry.length + 1 ;
                end = document.cookie.indexOf(";", start);
                if (end == -1) {
                    end = document.cookie.length;
                }
                return document.cookie.substring(start, end);
            }
        }
        return "";
    },
    pad: function (num) {
        if (num < 10) {
            return "00" + num;
        }
        else if (num < 100) {
            return "0" + num;
        }
        else {
            return num;
        }
    },
    getQueryParams: function () {
        var search = document.location.search.split('+').join(' ');
        var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
        while (tokens = re.exec(search)) params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        return params;
    }
}

module.exports = {
    usernameRegex: /^[\w\d]{4,16}$/,
    emailRegex: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|me|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/,
    isUsername: function (username) {
        if (username.toLowerCase().indexOf("liby") == -1) {
            if (username.match(this.usernameRegex)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },
    isEmail: function (email) {
        return email.match(this.emailRegex) != null;
    }
}

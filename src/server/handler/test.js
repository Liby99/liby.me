

module.exports = {
    get: {
        requirement: {
            body: {
                "email": "email",
                "username": "username",
                "password": "password"
            }
        },
        handle: function (context) {
            context.response.success("All Requirement Fulfilled");
        }
    }
}

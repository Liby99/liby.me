

module.exports = {
    get: {
        requirement: {
            body: {
                "email": "email",
                "username": "username",
                "password": "password"
            },
            cookies: {
                "UUID": "UUID"
            }
        },
        handle: function (context) {
            context.response.success("All Requirement Fulfilled");
        }
    }
}

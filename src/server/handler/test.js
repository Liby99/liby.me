

module.exports = {
    get_manga_list: {
        requirement: {
            cookies: {
                "UUID": "UUID"
            },
            body: {
                "username": "username",
                "password": "password"
            },
            query {
                "id": "4_digit_number"
            }
        },
        handle: function (context) {
            
        }
    }
}

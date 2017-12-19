const Mongo = require("keeling-js/lib/mongo");
const Messages = Mongo.db.collection("message");

module.exports = {
    getMessages (callback, error) {
        Messages.find({}).sort({
            "date_time": -1
        }).toArray((err, messages) => {
            if (err) {
                error(err);
            }
            else {
                callback(messages);
            }
        });
    },
    newMessage (username, email, content, callback, error) {
        Messages.insertOne({
            "date_time": new Date(),
            "read": false,
            "username": username,
            "email": email,
            "content": content
        }, (err, result) => {
            if (err) {
                error(err);
            }
            else {
                callback();
            }
        });
    }
}

const ObjectID = require('mongodb').ObjectID;
module.exports = function (id) {
    try {
        return (id instanceof ObjectID) ? id : ObjectID(id);
    }
    catch (err) {
        return undefined;
    }
}

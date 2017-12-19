const Mongo = require("keeling-js/lib/mongo");
const Image = require("keeling-js/lib/image");
const ObjectId = require("./lib/object_id");
const AWS = require("./lib/aws");
const Projects = Mongo.db.collection("project");

module.exports = {
    getAdminProjects (callback, error) {
        Projects.find({}).sort({
            "date_time": -1
        }).toArray((err, projects) => {
            if (err) {
                error(err);
            }
            else {
                callback(projects);
            }
        });
    },
    
    getThreeProjects (callback, error) {
        Projects.find({
            "status": 1
        }).sort({
            "date_time": -1
        }).limit(3).toArray((err, projects) => {
            if (err) {
                error(err);
            }
            else {
                callback(projects);
            }
        });
    },
    
    getProjects (callback, error) {
        Projects.find({
            "status": 1
        }).sort({
            "date_time": -1
        }).toArray((err, projects) => {
            if (err) {
                error(err);
            }
            else {
                callback(projects);
            }
        });
    },
    
    getAdminProjectData (projectId, callback, error) {
        Projects.findOne({
            "_id": ObjectId(projectId)
        }, (err, project) => {
            if (err) {
                error(err);
            }
            else {
                callback(project);
            }
        });
    },
    
    getProjectData (projectId, callback, error) {
        Projects.findOne({
            "_id": ObjectId(projectId),
            "status": 1
        }, (err, project) => {
            if (err) {
                error(err);
            }
            else {
                callback(project);
            }
        });
    },
    
    updateProject (projectId, name, author, url, status, dateTime, cover, callback, error) {
        uploadCover(projectId, cover, (coverUrl, coverUploaded) => {
            Projects.updateOne({
                "_id": ObjectId(projectId)
            }, {
                $set: {
                    name: name,
                    author: author,
                    url: url,
                    status: parseInt(status),
                    date_time: new Date(Date.parse(dateTime)),
                    cover: coverUrl
                }
            }, (err, result) => {
                if (err) {
                    error(err);
                }
                else if (!result["modifiedCount"]) {
                    error(new Error("No modified project"));
                }
                else {
                    callback();
                }
            });
        }, error);
    },
    
    newProject (name, author, url, status, dateTime, cover, callback, error) {
        var projectId = ObjectId();
        uploadCover(projectId, cover, (coverUrl, coverUploaded) => {
            Projects.insertOne({
                "_id": ObjectId(projectId),
                name: name,
                author: author,
                url: url,
                status: status,
                date_time: new Date(Date.parse(dateTime)),
                cover: coverUrl
            }, (err, result) => {
                if (err) {
                    error(err);
                }
                else {
                    callback();
                }
            });
        }, error);
    },
    
    changeStatus (projectId, status, callback, error) {
        Projects.updateOne({
            "_id": ObjectId(projectId)
        }, {
            $set: {
                "status": parseInt(status)
            }
        }, (err, result) => {
            if (err) {
                error(err);
            }
            else {
                callback();
            }
        })
    }
}

function uploadCover (projectId, cover, callback, error) {
    uploadImage("project/" + projectId + ".jpg", cover, callback, error);
}

function uploadImage (name, img, callback, error) {
    try {
        var buf = Image.decodeBase64(img);
        AWS.saveImage(name, buf, (location) => {
            callback(location, true);
        }, error);
    }
    catch (err) {
        callback(img, false);
    }
}

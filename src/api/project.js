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
        }).limit(3).toArray((err, projects) => {
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
        
        function next (coverUrl) {
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
        }
        
        try {
            var coverBuf = Image.decodeBase64(cover);
            var coverName = "project/" + projectId + ".jpg";
            AWS.saveImage(coverName, coverBuf, (location) => {
                next(location);
            }, error);
        }
        catch (err) {
            next(cover);
        }
    },
    
    newProject (name, author, url, status, dateTime, cover, callback, error) {
        
        var projectId = ObjectId();
        
        function next (coverUrl) {
            Projects.insertOne({
                "_id": ObjectId(projectId),
                name: name,
                author: author,
                url: url,
                status: status,
                date_time: new Date(Date.parse(dateTime)),
                cover: coverUrl
            }, (err, result) => {
                console.log(result);
                if (err) {
                    error(err);
                }
                else {
                    callback();
                }
            });
        }
        
        try {
            var coverBuf = Image.decodeBase64(cover);
            var coverName = "project/" + projectId + ".jpg";
            AWS.saveImage(coverName, coverBuf, (location) => {
                next(location);
            }, error);
        }
        catch (err) {
            next(cover);
        }
    },
    
    changeStatus (projectId, status, callback, error) {
        Projects.updateOne({
            "_id": ObjectId(projectId)
        }, {
            "status": status
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

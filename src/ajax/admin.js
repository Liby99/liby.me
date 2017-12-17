var Admin = require("../api/admin.js");
var Article = require("../api/article.js");
var Project = require("../api/project.js");
var Artwork = require("../api/artwork.js");

module.exports = {
    login: function (req, res) {
        Admin.match(req.body["username"], req.body["password"], function (result) {
            if (result == 0) {
                Admin.login(req.body["username"], res, function (logged) {
                    if (logged) {
                        console.log("User " + req.body["username"] + " now logged in the admin system. ");
                        res.success({});
                    }
                    else {
                        res.error(4, "Session Log Error");
                    }
                });
            }
            else if (result == 1) {
                res.error(1, "No Such User");
            }
            else if (result == 2) {
                res.error(2, "Incorrect Password");
            }
            else {
                res.error(3, "System Error");
            }
        });
    },
    logout: function (req, res) {
        Admin.logout(res);
        res.success({});
    },
    change_password: function (req, res) {
        if (Admin.isPassword(req.body["new"])) {
            Admin.loggedIn(req, function (logged) {
                if (logged) {
                    Admin.checkPasswordWithSession(req.cookies["session"], req.body["original"], function (correct) {
                        if (correct) {
                            Admin.changePassword(req.cookies["session"], req.body["new"], function (result) {
                                if (result) {
                                    res.success({});
                                }
                                else {
                                    res.error(4, "Database Error");
                                }
                            });
                        }
                        else {
                            res.error(3, "Your Password Is Incorrect");
                        }
                    });
                }
                else {
                    res.error(2, "You Have Not Logged In Yet!");
                }
            });
        }
        else {
            res.error(1, "The Password Does Not Satisfy the Requirement");
        }
    },
    get_article: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["article"] && req.body["article"] != "") {
                    Article.getAdminArticle(req.body["article"], function (result) {
                        if (result) {
                            res.success(result);
                        }
                        else {
                            res.error(2, "Database Error");
                        }
                    });
                }
                else {
                    res.error(1, "Article Id Required");
                }
            }
            else {
                res.error(1000, "Please Login First");
            }
        });
    },
    change_article_status: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["article"] && req.body["article"] != "") {
                    Article.adminExists(req.body["article"], function (exists) {
                        if (exists) {
                            switch (req.body["status"]) {
                                case "0": case "1": case "2":
                                    Article.changeStatus(req.body["article"], parseInt(req.body["status"]), function (success) {
                                        if (success) {
                                            res.success({});
                                        }
                                        else {
                                            res.error(3, "Database Error");
                                        }
                                    });
                                    break;
                                default:
                                    res.error(2, "The Status Is Not Valid");
                                    break;
                            }
                        }
                        else {
                            res.error(1, "This Article Does Not Exist");
                        }
                    });
                }
            }
        });
    },
    submit_article: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["AUID"] == "") {
                    Article.newArticle(req.body["title"], req.body["subtitle"], req.body["tags"], req.body["status"], req.body["date_time"], req.body["cover"], req.body["content"], function (success) {
                        res.success({});
                    }, function (err) {
                        console.log(err);
                        res.error(500, err);
                    });
                }
                else {
                    Article.adminExists(req.body["AUID"], function (exists) {
                        if (exists != undefined) {
                            if (exists) {
                                Article.updateArticle(req.body["AUID"], req.body["title"], req.body["subtitle"], req.body["tags"], req.body["status"], req.body["date_time"], req.body["cover"], req.body["content"], function (success) {
                                    if (success) {
                                        res.success({});
                                    }
                                    else {
                                        res.error(1, "Database Error");
                                    }
                                });
                            }
                            else {
                                res.error(2, "No Such Article Exists");
                            }
                        }
                        else {
                            res.error(1, "Database Error");
                        }
                    });
                }
            }
            else {
                res.error(1000, "please Login First");
            }
        });
    },
    get_article_comment: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["article"] && req.body["article"] != "") {
                    Article.adminExists(req.body["article"], function (exists) {
                        if (exists) {
                            Article.getAdminComments(req.body["article"], function (comments) {
                                if (comments != undefined) {
                                    res.success(comments);
                                }
                                else {
                                    res.error(3, "Database error");
                                }
                            });
                        }
                        else {
                            res.error(2, "Such article does not exist");
                        }
                    });
                }
                else {
                    res.error(1, "Article parameter is required");
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        });
    },
    delete_comment: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["CUID"] && req.body["CUID"] != "") {
                    Article.deleteComment(req.body["CUID"], function (success) {
                        if (success) {
                            res.success({});
                        }
                        else {
                            res.error(2, "Database Error");
                        }
                    });
                }
                else {
                    res.error(1, "CUID is required");
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        });
    },
    undelete_comment: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["CUID"] && req.body["CUID"] != "") {
                    Article.undeleteComment(req.body["CUID"], function (success) {
                        if (success) {
                            res.success({});
                        }
                        else {
                            res.error(2, "Database Error");
                        }
                    });
                }
                else {
                    res.error(1, "CUID is required");
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        });
    },
    get_project: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["project"] && req.body["project"] != "") {
                    Project.getAdminProjectData(req.body["project"], function (project) {
                        if (project) {
                            res.success(project);
                        }
                        else {
                            res.error(2, "Database error");
                        }
                    })
                }
                else {
                    res.error(1, "project parameter is required");
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        });
    },
    submit_project: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["PUID"] != "") {
                    Project.updateProject(req.body["PUID"], req.body["name"], req.body["author"], req.body["url"], req.body["status"], req.body["date_time"], req.body["cover"], function (success) {
                        if (success) {
                            console.log("Updated project " + req.body["name"]);
                            res.success({});
                        }
                        else {
                            res.error(1, "Error when updating project " + req.body["name"]);
                        }
                    });
                }
                else {
                    Project.newProject(req.body["name"], req.body["author"], req.body["url"], req.body["status"], req.body["date_time"], req.body["cover"], function (success) {
                        if (success) {
                            console.log("Inserted new project " + req.body["name"]);
                            res.success({});
                        }
                        else {
                            res.error(1, "Error when inserting new project");
                        }
                    });
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        });
    },
    change_project_status: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["project"] && req.body["project"] != "") {
                    if (req.body["status"] && req.body["status"] >= 0 && req.body["status"] <= 2) {
                        Project.changeStatus(req.body["project"], req.body["status"], function (success) {
                            if (success) {
                                res.success({});
                            }
                            else {
                                res.error(3, "Database error");
                            }
                        });
                    }
                    else {
                        res.error(2, "Status parameter not valid");
                    }
                }
                else {
                    res.error(1, "Parameter project is required");
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        });
    },
    get_artwork: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["artwork"]) {
                    Artwork.getAdminArtworkData(req.body["artwork"], function (data) {
                        if (data) {
                            res.success(data);
                        }
                        else {
                            res.error(2, "Database error or no such artwork");
                        }
                    });
                }
                else {
                    res.error(1, "Artwork Id is required to get the data");
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        });
    },
    submit_artwork: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["AUID"] != "") {
                    Artwork.updateArtwork(req.body["AUID"],
                                          req.body["title"],
                                          req.body["subtitle"],
                                          req.body["status"],
                                          req.body["date_time"],
                                          req.body["type"],
                                          req.body["source_type"],
                                          req.body["source_url"],
                                          req.body["softwares"],
                                          req.body["tags"],
                                          req.body["cover"],
                                          req.body["thumbnail"],
                                          req.body["description"], function (success) {
                        if (success) {
                            console.log("Updating artwork " + req.body["title"] + " successed!");
                            res.success({});
                        }
                        else {
                            res.error(3, "Database error");
                        }
                    })
                }
                else {
                    Artwork.newArtwork(req.body["title"],
                                       req.body["subtitle"],
                                       req.body["status"],
                                       req.body["date_time"],
                                       req.body["type"],
                                       req.body["source_type"],
                                       req.body["source_url"],
                                       req.body["softwares"],
                                       req.body["tags"],
                                       req.body["cover"],
                                       req.body["thumbnail"],
                                       req.body["description"], function (success) {
                        if (success) {
                            console.log("Inserted new artwork " + req.body["title"]);
                            res.success({});
                        }
                        else {
                            res.error(3, "Database error");
                        }
                    });
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        });
    },
    change_artwork_status: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["artwork"] && req.body["artwork"] != "") {
                    if (req.body["status"] && req.body["status"] >= 0 && req.body["status"] <= 2) {
                        Artwork.changeArtworkStatus(req.body["artwork"], req.body["status"], function (success) {
                            if (success) {
                                res.success({});
                            }
                            else {
                                res.error(3, "Database Error");
                            }
                        });
                    }
                    else {
                        res.error(2, "status is required here");
                    }
                }
                else {
                    res.error(1, "Artwork id is required here");
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        });
    },
    delete_artwork: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["artwork"] && req.body["artwork"] != "") {
                    Artwork.removeArtwork(req.body["artwork"], function (success) {
                        if (success) {
                            res.success({});
                        }
                        else {
                            res.error(2, "Database error");
                        }
                    });
                }
                else {
                    res.error(1, "Artwork id is required here");
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        });
    }
}

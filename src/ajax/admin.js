var Admin = require("../api/admin.js");
var Article = require("../api/article.js");
var Project = require("../api/project.js");
var Artwork = require("../api/artwork.js");

module.exports = {
    login: function (req, res) {
        Admin.match(req.body["username"], req.body["password"], function (result) {
            if (result == 0) {
                Admin.login(req.body["username"], res, function (logged) {
                    console.log("User " + req.body["username"] + " now logged in the admin system. ");
                    res.success({});
                }, (err) => {
                    res.error(4, "Session Log Error");
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
        }, (err) => {
            res.error(500, err);
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
                                res.success({});
                            }, (err) => {
                                res.error(500, err);
                            });
                        }
                        else {
                            res.error(3, "Your Password Is Incorrect");
                        }
                    }, (err) => {
                        res.error(500, err);
                    });
                }
                else {
                    res.error(2, "You Have Not Logged In Yet!");
                }
            }, (err) => {
                res.error(500, err);
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
                    Article.getAdminArticle(req.body["article"], (article) => {
                        res.success(article);
                    }, (err) => {
                        res.error(500, err);
                    });
                }
                else {
                    res.error(1, "Article Id Required");
                }
            }
            else {
                res.error(1000, "Please Login First");
            }
        }, (err) => {
            res.error(500, err);
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
                                    Article.changeStatus(req.body["article"], req.body["status"], function () {
                                        res.success({});
                                    }, (err) => {
                                        res.error(500, err);
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
        }, (err) => {
            res.error(500, err);
        });
    },
    submit_article: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["id"] == "") {
                    Article.newArticle(req.body["title"], req.body["subtitle"], req.body["tags"], req.body["status"], req.body["date_time"], req.body["cover"], req.body["content"], function (success) {
                        res.success({});
                    }, (err) => {
                        console.log(err);
                        res.error(500, err);
                    });
                }
                else {
                    Article.adminExists(req.body["id"], function (exists) {
                        if (exists) {
                            Article.updateArticle(req.body["id"], req.body["title"], req.body["subtitle"], req.body["tags"], req.body["status"], req.body["date_time"], req.body["cover"], req.body["content"], function (success) {
                                res.success({});
                            }, (err) => {
                                res.error(1, err);
                            });
                        }
                        else {
                            res.error(500, "Article " + req.body["id"] + " does not exist");
                        }
                    }, (err) => {
                        res.error(500, err);
                    });
                }
            }
            else {
                res.error(1000, "please Login First");
            }
        }, (err) => {
            res.error(500, err);
        });
    },
    // get_article_comment: function (req, res) {
    //     Admin.loggedIn(req, function (logged) {
    //         if (logged) {
    //             if (req.body["article"] && req.body["article"] != "") {
    //                 Article.adminExists(req.body["article"], function (exists) {
    //                     if (exists) {
    //                         Article.getAdminComments(req.body["article"], function (comments) {
    //                             if (comments != undefined) {
    //                                 res.success(comments);
    //                             }
    //                             else {
    //                                 res.error(3, "Database error");
    //                             }
    //                         });
    //                     }
    //                     else {
    //                         res.error(2, "Such article does not exist");
    //                     }
    //                 });
    //             }
    //             else {
    //                 res.error(1, "Article parameter is required");
    //             }
    //         }
    //         else {
    //             res.error(1000, "Please login first");
    //         }
    //     }, (err) => {
    //         res.error(500, err);
    //     });
    // },
    delete_comment: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["article"] && req.body["article"] != "" && req.body["comment"] && req.body["comment"] != "") {
                    Article.deleteComment(req.body["article"], req.body["comment"], function () {
                        res.success({});
                    }, (err) => {
                        res.error(500, err);
                    });
                }
                else {
                    res.error(403, "article and comment id are required");
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        }, (err) => {
            res.error(500, err);
        });
    },
    undelete_comment: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["article"] && req.body["article"] != "" && req.body["comment"] && req.body["comment"] != "") {
                    Article.undeleteComment(req.body["article"], req.body["comment"], function () {
                        res.success({});
                    }, (err) => {
                        res.error(500, err);
                    });
                }
                else {
                    res.error(403, "article and comment id are required");
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        }, (err) => {
            res.error(500, err);
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
                            res.error(2, "project not found");
                        }
                    }, (err) => {
                        res.error(500, err);
                    });
                }
                else {
                    res.error(1, "project parameter is required");
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        }, (err) => {
            res.error(500, err);
        });
    },
    submit_project: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["id"] != "") {
                    Project.updateProject(req.body["id"], req.body["name"], req.body["author"], req.body["url"], req.body["status"], req.body["date_time"], req.body["cover"], function (success) {
                        console.log("Updated project " + req.body["name"]);
                        res.success({});
                    }, (err) => {
                        res.error(1, "Error when updating project " + req.body["name"]);
                    });
                }
                else {
                    Project.newProject(req.body["name"], req.body["author"], req.body["url"], req.body["status"], req.body["date_time"], req.body["cover"], function (success) {
                        console.log("Inserted new project " + req.body["name"]);
                        res.success({});
                    }, (err) => {
                        res.error(1, "Error when inserting new project");
                    });
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        }, (err) => {
            res.error(500, err);
        });
    },
    change_project_status: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["project"] && req.body["project"] != "") {
                    if (req.body["status"] && req.body["status"] >= 0 && req.body["status"] <= 2) {
                        Project.changeStatus(req.body["project"], req.body["status"], function (success) {
                            res.success({});
                        }, (err) => {
                            res.error(500, err);
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
        }, (err) => {
            res.error(500, err);
        });
    },
    get_artwork: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["artwork"]) {
                    Artwork.getAdminArtworkData(req.body["artwork"], function (data) {
                        res.success(data);
                    }, (err) => {
                        res.error(2, err);
                    });
                }
                else {
                    res.error(1, "Artwork Id is required to get the data");
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        }, (err) => {
            res.error(500, err);
        });
    },
    submit_artwork: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["id"] != "") {
                    Artwork.updateArtwork(req.body["id"], req.body["title"], req.body["subtitle"], req.body["status"], req.body["date_time"], req.body["type"], req.body["source_type"],
                    req.body["source_url"], req.body["softwares"], req.body["tags"], req.body["cover"], req.body["thumbnail"], req.body["description"], (success) => {
                        console.log("Updating artwork " + req.body["title"] + " successed!");
                        res.success({});
                    }, (err) => {
                        res.error(3, "Database error");
                    });
                }
                else {
                    Artwork.newArtwork(req.body["title"], req.body["subtitle"], req.body["status"], req.body["date_time"], req.body["type"], req.body["source_type"],
                    req.body["source_url"], req.body["softwares"], req.body["tags"], req.body["cover"], req.body["thumbnail"], req.body["description"], function () {
                        console.log("Inserted new artwork " + req.body["title"]);
                        res.success({});
                    }, (err) => {
                        res.error(3, "Database error");
                    });
                }
            }
            else {
                res.error(1000, "Please login first");
            }
        }, (err) => {
            res.error(500, err);
        });
    },
    change_artwork_status: function (req, res) {
        Admin.loggedIn(req, function (logged) {
            if (logged) {
                if (req.body["artwork"] && req.body["artwork"] != "") {
                    if (req.body["status"] && req.body["status"] >= 0 && req.body["status"] <= 2) {
                        Artwork.changeArtworkStatus(req.body["artwork"], req.body["status"], function () {
                            res.success({});
                        }, (err) => {
                            res.error(500, err);
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
        }, (err) => {
            res.error(500, err);
        });
    }
    // delete_artwork: function (req, res) {
    //     Admin.loggedIn(req, function (logged) {
    //         if (logged) {
    //             if (req.body["artwork"] && req.body["artwork"] != "") {
    //                 Artwork.removeArtwork(req.body["artwork"], function (success) {
    //                     if (success) {
    //                         res.success({});
    //                     }
    //                     else {
    //                         res.error(2, "Database error");
    //                     }
    //                 });
    //             }
    //             else {
    //                 res.error(1, "Artwork id is required here");
    //             }
    //         }
    //         else {
    //             res.error(1000, "Please login first");
    //         }
    //     }, (err) => {
    //         res.error(500, err);
    //     });
    // }
}

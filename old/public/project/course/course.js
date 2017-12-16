
/**
 * The whole network
 * @param {object} data, including course and relation lists
 */
function Network(data) {
    
    //Initiate course and relation data
    this.courses = data.courses;
    this.relations = data.relations;
    
    //Initiate the network
    this.initiate();
}

Network.prototype.initiate = function () {
    
    //First give a next course list for every course
    for (var i = 0; i < this.courses.length; i++) {
        this.courses[i].next = new Array();
    }
    
    //Then give every course a next list
    for (var i = 0; i < this.courses.length; i++) {
        var curr = this.courses[i];
        if (curr.prerequisites) {
            for (var j = 0; j < curr.prerequisites.length; j++) {
                if (curr.prerequisites[j]["course"] != undefined) {
                    this.courses[curr.prerequisites[j]["course"]].next.push(i);
                }
                else {
                    var relation = this.relations[curr.prerequisites[j]["relation"]];
                    for (var k = 0; k < relation.courses.length; k++) {
                        this.courses[relation.courses[k]].next.push(i);
                    }
                }
            }
        }
    }
    
    //Finall change all the entries in course and relation to nested Course and Relation instances
    for (var i = 0; i < this.courses.length; i++) {
        this.courses[i] = new Course(this, this.courses[i]);
    }
    for (var i = 0; i < this.relations.length; i++) {
        this.relations[i] = new Relation(this, this.relations[i]);
    }
}

Network.prototype.getD3Json = function () {
    
    //Initiate the json to be returned
    var json = {
        "nodes": [],
        "links": []
    };
    
    //Initiate the nodes
    for (var i = 0; i < this.courses.length; i++) {
        json.nodes.push({
            "id": this.courses[i]["id"],
            "name": this.courses[i]["subject"] + " " + this.courses[i]["number"],
            "level": -1,
            "next": this.courses[i].next,
            "quarter": this.courses[i].quarter,
            "status": "hidden",
            "coreq": this.courses[i].corequisites,
            "prereq": this.courses[i].prerequisites,
            "equi": this.courses[i].equivalence,
            "info": this.courses[i].des
        });
        for (var j = 0; j < this.courses[i].next.length; j++) {
            json.links.push({
                "source": this.courses[i]["id"],
                "target": this.courses[i].next[j],
                "status": "hidden"
            });
        }
    }
    
    return json;
}

Network.prototype.getCourse = function (id) {
    return this.courses[id];
}

Network.prototype.getRelation = function (id) {
    return this.relations[id];
}

Network.prototype.getSuggestion = function (targetId, outerMostIds) {
    // check if target changes
    var self = this;
    if (self.targetId != targetId) {
        self.targetId = targetId;

        self.courses.forEach((course) => { course.dist = null});

        // start BFS
        var target = self.courses[targetId];
        target.dist = 0;
        var queue = [target];

        while (queue.length != 0) {
            // pop
            var tmpCourse = queue[0];
            queue.shift();

            var currentDist = tmpCourse.dist;
            var currentId = tmpCourse.id;

            if (!tmpCourse.prerequisites)
                continue;

            tmpCourse.prerequisites.forEach((relation) => {
                if (!relation.course) {
                    self.relations[relation.relation].courses.forEach((id) => {
                        var next = self.courses[id];
                        if (!next.dist) {
                            next.dist = currentDist + 1;
                            next.prevId = tmpCourse.id;
                            queue.push(next);
                        }
                    });
                }
                else {
                    var next = self.courses[relation.course];
                    if (!next.dist) {
                        next.dist = currentDist + 1;
                        next.prevId = tmpCourse.id;
                        queue.push(next);
                    }
                }
            });
        }
    }

    // find closest nodes
    var nearest = outerMostIds.reduce((prev, id) => {
        if (!prev[0]) {
            prev = [id];
        }
        else if (prev[0] == self.courses[id].dist) {
            prev.push[id];
        }
        else if (prev[0] > self.course[id].dist) {
            prev = [id];
        }
    }, [])

    return nearest.arr;
}

function Course(network, obj) {
    
    //The whole network reference
    this.network = network;
    
    //The id number in the network course field
    this.id = obj.id;
    
    //The course information
    var identifier = obj.name.split(" ");
    this.subject = identifier[0];
    this.number = identifier[1];
    this.title = obj.title;
    this.unit = obj.unit;
    this.quarter = obj.quarter;
    this.description = obj.des;
    
    //The course relations
    this.prerequisites = obj.prerequisites;
    this.corequisites = obj.corequisites;
    this.equivalence = obj.equivalence;
    this.next = obj.next;
    
    //The course taken
    this.take = false;
}

Course.prototype.take = function () {
    this.take = true;
}

Course.prototype.untake = function () {
    this.take = false;
}

Course.prototype.getPrerequisites = function () {
    return this.prerequisites;
}

Course.prototype.getCorequisites = function () {
    return this.corequisites;
}

Course.prototype.getNextCourses = function (finishedCourses) {
    return this.next;
}

Course.prototype.canTake = function (finishedCourses) {
    
    //If no prereq, then can take
    if (!this.prerequisites) {
        return true;
    }
    
    var finished = 0;
    for (var i = 0; i < this.prerequisites.length; i++) {
        if (this.prerequisites[i]["course"] != undefined) {
            if (finishedCourses.includes(this.prerequisites[i]["course"])) {
                finished++;
            }
        }
        else {
            var relation = this.network.getRelation(this.prerequisites[i]["relation"]);
            if (relation.satisfied(finishedCourses)) {
                finished++;
            }
        }
    }
    return finished == this.prerequisites.length;
}

Course.prototype.getNumber = function () {
    return this.subject + " " + this.number;
}

Course.prototype.getInfo = function () {
    return {
        "number": this.getNumber(),
        "title": this.title,
        "unit": this.unit + " Units",
        "description": this.description,
        "prerequisites": this.prerequisites ? this.prerequisites.map((element) => ((element.course != undefined) ? this.network.getCourse(element.course).getNumber() : this.network.getRelation(element.relation).name)) : [],
        "corequisites": this.corequisites ? this.corequisites.map((element) => ((element.course != undefined) ? this.network.getCourse(element.course).getNumber() : this.network.getRelation(element.relation).name)) : []
    }
}

function Relation(network, obj) {
    
    //The whole network reference
    this.network = network;
    
    //The id number in the network course field
    this.id = obj.id;
    this.name = obj.name;
    
    //The relation information
    this.type = obj.type;
    this.select = obj.select;
    this.courses = obj.courses;
}

Relation.prototype.satisfied = function (finishedCourses) {
    switch (this.type) {
        case "OR": return this.satisfiedOr(finishedCourses);
        case "AND": return this.satisfiedAnd(finishedCourses);
        case "SELECT": return this.satisfiedSelect(finishedCourses);
        default: return false;
    }
}

Relation.prototype.satisfiedOr = function (finishedCourses) {
    return this.getFinishedAmount(finishedCourses) >= 1;
}

Relation.prototype.satisfiedAnd = function (finishedCourses) {
    return this.getFinishedAmount(finishedCourses) == this.courses.length;
}

Relation.prototype.satisfiedSelect = function (finishedCourses) {
    return this.getFinishedAmount(finishedCourses) >= this.select;
}

Relation.prototype.getFinishedAmount = function (finishedCourses) {
    var finished = 0;
    for (var i = 0; i < this.courses.length; i++) {
        if (finishedCourses.includes(this.courses[i])) {
            finished++;
        }
    }
    return finished;
}

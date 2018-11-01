const express = require("express");
const bodyParser = require("body-parser");

module.exports = class ApiServer {
    constructor(options, convRepo, userRepo) {
        this.convRepo = convRepo;
        this.userRepo = userRepo;
        this.routes = options.routes;
        this.app = express();
        this.app.use(bodyParser.json());
    }
    start(port) {
        let userRepo = this.userRepo;
        let convRepo = this.convRepo;
        let routes = this.routes;

        this.app.get("/", function(req, res) {
            res.send("welcome to my api!");
        });

        this.app.listen(port, function () {
            console.log("app running on port "+ port);   
        });

        for(let index = 0; index < this.routes.length;index++) {
            let whatRepo = "";
            if(routes[index] == "/conversations") {
                whatRepo = convRepo;
            }
            else if(routes[index] == "/users"){
                whatRepo = userRepo;
            }

            this.app.route(routes[index])
            .get(function(req, res) {
                res.json(whatRepo.list(1,0));
            })
            .post(function (req, res) {
                res.json(whatRepo.create(req.body));
            });

            this.app.route(routes[index]+"/:id")
            .get(function (req, res) {
                res.json(whatRepo.get(req.params.id));
            })
            .put(function(req, res) {
                res.json(whatRepo.update(req.params.id, req.body));
            })
            .delete(function(req, res) {
                res.json(whatRepo.remove(req.params.id));
            });
        }
    }
};

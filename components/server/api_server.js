const express = require("express");
const bodyParser = require("body-parser");

module.exports = class ApiServer {
    constructor(convRepo, userRepo) {
        this.convRepo = convRepo;
        this.userRepo = userRepo;
        this.app = express();
        this.app.use(bodyParser.json());
    }
    start(port) {
        let userRepo = this.userRepo;
        let convRepo = this.convRepo;

        this.app.listen(port, function () {
            console.log("app running on port "+ port);   
        });
        
        this.app.get("/", function(req, res) {
            res.send("welcome to my api!");
        });

        this.app.route("/users")
        .get(function(req, res) {
            res.json(userRepo.list(1,0));
        })
        .post(function (req, res) {
            res.json(userRepo.create(req.body));
        })

        this.app.route("/users/:id")
        .get(function (req, res) {
            res.json(userRepo.get(req.params.id));
        })
        .put(function (req, res) {
            res.json(userRepo.update(req.params.id, req.body));
        })
        .delete(function (req, res) {
            res.json(userRepo.remove(req.params.id));
        })

        this.app.route("/conversations")
        .get(function (req, res) {
            res.json(convRepo.list(1,0));
        })
        .post(function (req, res) {
            res.json(convRepo.create(req.body));
        })

        this.app.route("/conversations/:id")
        .get(function (req, res) {
            res.json(convRepo.get(req.params.id));
        })
        .put(function (req, res) {
            res.json(convRepo.update(req.params.id, req.body));
        })
        .delete(function (req, res) {
            res.json(convRepo.remove(req.params.id));
        })
    }
};

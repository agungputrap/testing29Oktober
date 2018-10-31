const chai = require("chai");
const assert = require("chai").assert;
const chaiHttp = require("chai-http");
const Injector = require("../injector_generic");
const config = require("./configuration_inject_generic.json");

describe("simple api testing with injector", function () {
    let injector;
    let request;
    let main;

    before(()=> {
        chai.use(chaiHttp);
        injector = new Injector(config);
        injector.start();
        main = config.main;
        request = chai.request(injector.components[main.component].app);
    });

    describe("/ route", function () {
        it("server is up", (done) => {
            request.get("/")
            .end((err, res) => {
                assert.equal(res.text, "welcome to my api!");
                done();
            })
        });
    });
    describe("/users routes", function () {
        it("get list user when empty", (done) => {
            request.get("/users")
                .end((err, res) => {
                    assert.deepEqual(res.body, []);
                    done();
                });
        });
        it("get user when list is empty", (done)=> {
            request.get("/users/1")
            .end((err, res) => {
                assert.equal(res.body, "");
                done();
            })
        });
        it("delete user when list is empty", (done) => {
            request.delete("/users/1")
            .end((err, res)=> {
                assert.equal(res.body, "");
                done();
            })
        });
        it("insert new user", (done)=> {
            let user= {
                "name": "Parto",
                "gender": "male",
                "city":"cilacap",
                "phone":"1234",
                "email":"parto@mail.com",
            }
            let userAfterInsert= {
                "name": "Parto",
                "gender": "male",
                "city":"cilacap",
                "phone":"1234",
                "email":"parto@mail.com",
                "id" : 1
            }
            request.post("/users").send(user)
            .end((err,res) => {
                assert.deepEqual(res.body, userAfterInsert);
                done();
            })
        })
        it("get user with id 1", (done)=> {
            let userData= {
                "name": "Parto",
                "gender": "male",
                "city":"cilacap",
                "phone":"1234",
                "email":"parto@mail.com",
                "id" : 1
            }
            request.get("/users/1")
            .end((err, res)=> {
                assert.deepEqual(res.body, userData);
                done();
            });
        });
        it("update user id 1 with new data", (done)=> {
            let newData= {
                "name":"Parti",
                "gender":"female",
                "phone":"4567"
            }
            let userAfterUpdate = {
                "name":"Parti",
                "gender":"female",
                "city":"cilacap",
                "phone":"4567",
                "email":"parto@mail.com",
                "id" : 1
            }
            request.put("/users/1").send(newData)
            .end((err,res)=> {
                assert.deepEqual(res.body, userAfterUpdate);
                done();
            })
        });
        it("get list user",(done)=> {
            request.get("/users")
            .end((err, res)=> {
                assert.equal(res.body.length, 1);
                done();
            });
        });
        it("delete user", (done)=> {
            let userDeleted = {
                "name":"Parti",
                "gender":"female",
                "city":"cilacap",
                "phone":"4567",
                "email":"parto@mail.com",
                "id" : 1
            }
            request.delete("/users/1")
            .end((err,res)=> {
                assert.deepEqual(res.body, userDeleted);
                done();
            });
        });
    });
    describe("/conversations routes", function() {
        it("get list conversation when empty", (done)=> {
            request.get("/conversations")
            .end((err,res)=> {
                assert.deepEqual(res.body, []);
                done();
            })
        });
        it("get conversation when list is empty", (done)=> {
            request.get("/conversations/1")
            .end((err,res)=> {
                assert.equal(res.body, "");
                done();
            });
        });
        it("delete conversations when is list empty", (done)=> {
            request.delete("/conversations/1")
            .end((err,res)=> {
                assert.equal(res.body, "");
                done();
            });
        });
        it("insert new conversation", (done)=> {
            let conversation = {
                "userId":"1",
                "direction":"outgoing",
                "message":"okay",
                "timestamp":1111
            };

            let conversationAdded = {
                "userId":"1",
                "direction":"outgoing",
                "message":"okay",
                "timestamp":1111,
                "id": 1
            };
            request.post("/conversations").send(conversation)
            .end((err, res)=> {
                assert.deepEqual(res.body, conversationAdded);
                done();
            });
        });
        it("get conversations", (done)=> {
            let conversationData= {
                "userId":"1",
                "direction":"outgoing",
                "message":"okay",
                "timestamp":1111,
                "id": 1
            }
            request.get("/conversations/1")
            .end((err, res)=> {
                assert.deepEqual(res.body, conversationData);
                done();
            });
        });
        it("update conversations", (done)=> {
            let newData={
                "direction":"incoming",
                "message":"how are you?",
                "timestamp": 2314
            };
            let conversationUpdated= {
                "userId":"1",
                "direction":"incoming",
                "message":"how are you?",
                "timestamp": 2314,
                "id": 1
            }
            request.put("/conversations/1").send(newData)
            .end((err, res)=> {
                assert.deepEqual(res.body, conversationUpdated);
                done();
            });
        });
        it("get list conversations", (done)=> {
            request.get("/conversations")
            .end((err, res)=> {
                assert.equal(res.body.length, 1);
                done();
            });
        });
        it("delete conversations", (done)=> {
            let conversationDeleted= {
                "userId":"1",
                "direction":"incoming",
                "message":"how are you?",
                "timestamp": 2314,
                "id": 1
            }
            request.delete("/conversations/1")
            .end((err, res)=> {
                assert.deepEqual(res.body, conversationDeleted);
                done();
            });
        });
    });
});
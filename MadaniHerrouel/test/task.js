let server = require("../index");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);

describe('Task APIs', () => {

    describe("Test GET route /api/tasks", () => {
        it("It should return all tasks", (done) => {
            chai.request(server)
                .get("/api/tasks")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.not.be.eq(0);
                done();
                });
        });

        it("It should NOT return all the tasks", (done) => {
            chai.request(server)
                .get("/api/task")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });


    /**
     * Test the GET (by id) route
     */
    describe("GET /api/tasks/:id", () => {
        it("It should GET a task by ID", (done) => {
            const taskId = 1;
            chai.request(server)
                .get("/api/tasks/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('name');
                    response.body.should.have.property('surname');
                    response.body.should.have.property('gender');
                    response.body.should.have.property('age');
                    response.body.should.have.property('address');
                    response.body.should.have.property('email');
                    response.body.should.have.property('phone');
                    response.body.should.have.property('speciality');
                    response.body.should.have.property('id').eq(1);
                done();
                });
        });

        it("It should NOT GET a task by ID", (done) => {
            const taskId = 123;
            chai.request(server)
                .get("/api/tasks/" + taskId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The task with the provided ID does not exist.");
                done();
                });
        });

    });

    /**
     * Test the POST route
     */
     describe("POST /api/tasks", () => {
        it("It should POST a new task", (done) => {
            const task = {
                name: "Barrera",
                surname: "Kidd",
                gender: "male",
                age: 36,
                address: "Woodside Avenue, Comptche,Illinois,Sierra Leone",
                email: "barrerakidd@turnabout.com",
                phone: "+1 (985) 521-2899",
                speciality: "database manager"
            };
            chai.request(server)
                .post("/api/tasks")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    //response.body.should.have.property('id').eq(100);
                    response.body.should.have.property('name').eq("Barrera");
                    response.body.should.have.property('surname').eq("Kidd");
                    response.body.should.have.property('gender').eq("male");
                    response.body.should.have.property('age').eq(36);
                    response.body.should.have.property('address').eq("Woodside Avenue, Comptche,Illinois,Sierra Leone");
                    response.body.should.have.property('email').eq("barrerakidd@turnabout.com");
                    response.body.should.have.property('phone').eq("+1 (985) 521-2899");
                    response.body.should.have.property('speciality').eq("database manager");
                done();
                });
        });

        it("It should NOT POST a new task without the name property", (done) => {
            const task = {
                name: "Barrera",
            };
            chai.request(server)
                .post("/api/tasks")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });

    });

    /**
     * Test the PUT route
     */
    describe("PUT /api/tasks/:id", () => {
        it("It should PUT an existing task", (done) => {
            const taskId = 1;
            const task = {
                name: "Madani",
                surname: "Herrouel",
                gender: "male",
                age: 26,
                address: "Cumberland Walk, Chumuckla,Michigan,Solomon Islands",
                email: "housetucker@ultrasure.com",
                phone: "+1 (965) 468-2857",
                speciality: "marketing"
            };
            chai.request(server)
                .put("/api/tasks/" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('name').eq("Madani");
		            response.body.should.have.property('surname').eq("Herrouel");
                    response.body.should.have.property('age').eq(26);
		            response.body.should.have.property('address').eq("Cumberland Walk, Chumuckla,Michigan,Solomon Islands");
		            response.body.should.have.property('email').eq("housetucker@ultrasure.com");
		            response.body.should.have.property('phone').eq("+1 (965) 468-2857");
		            response.body.should.have.property('speciality').eq("marketing");
                done();
                });
        });

        it("It should NOT PUT an existing task with a name with less than 3 characters", (done) => {
            const taskId = 1;
            const task = {
                name: "Ma",
                surname: "Herrouel",
                gender: "male",
                age: 26,
                address: "Cumberland Walk, Chumuckla,Michigan,Solomon Islands",
                email: "housetucker@ultrasure.com",
                phone: "+1 (965) 468-2857",
                speciality: "marketing"
            };
            chai.request(server)
                .put("/api/tasks/" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });
    });

/**
     * Test the PATCH route
     */

 describe("PATCH /api/tasks/:id", () => {
    it("It should PATCH an existing task", (done) => {
        const taskId = 1;
        const task = {
                name: "Madani patch",
                surname: "Herrouel patch",
                gender: "male",
                age: 26,
                address: "Cumberland Walk, Chumuckla,Michigan,Solomon Islands",
                email: "housetucker@ultrasure.com",
                phone: "+1 (965) 468-2857",
                speciality: "marketing"
        };
        chai.request(server)
            .patch("/api/tasks/" + taskId)
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('id').eq(1);
                response.body.should.have.property('name').eq("Madani patch");
		        response.body.should.have.property('surname').eq("Herrouel patch");
                response.body.should.have.property('age').eq(26);
		        response.body.should.have.property('address').eq("Cumberland Walk, Chumuckla,Michigan,Solomon Islands");
		        response.body.should.have.property('email').eq("housetucker@ultrasure.com");
		        response.body.should.have.property('phone').eq("+1 (965) 468-2857");
		        response.body.should.have.property('speciality').eq("marketing");
            done();
            });
    });

    it("It should NOT PATCH an existing task with a name with less than 3 characters", (done) => {
        const taskId = 1;
        const task = {
            name: "Ma",
            surname: "Herrouel",
            gender: "male",
            age: 26,
            address: "Cumberland Walk, Chumuckla,Michigan,Solomon Islands",
            email: "housetucker@ultrasure.com",
            phone: "+1 (965) 468-2857",
            speciality: "marketing"
        };
        chai.request(server)
            .patch("/api/tasks/" + taskId)
            .send(task)
            .end((err, response) => {
                response.should.have.status(400);
                response.text.should.be.eq("The name should be at least 3 chars long!");
            done();
            });
    });
});


    /**
     * Test the DELETE route
     */
    describe("DELETE /api/tasks/:id", () => {
        it("It should DELETE an existing task", (done) => {
            const taskId = 1;
            chai.request(server)
                .delete("/api/tasks/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a task that is not in the database", (done) => {
            const taskId = 145;
            chai.request(server)
                .delete("/api/tasks/" + taskId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The task with the provided ID does not exist.");
                done();
                });
        });

    });




});



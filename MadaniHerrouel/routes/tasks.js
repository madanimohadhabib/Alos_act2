var express = require('express');
var router = express.Router();
const utils = require('../utils/task-schema.js');
const tasks = require('../db.json')


// GET
router.get("/tasks" , (request, response) => {
    response.send(tasks);
});

// GET (BY ID)
router.get("/tasks/:id" , (request, response) => {
    const taskId = request.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if(!task) return response.status(404).send("The task with the provided ID does not exist.");
    response.send(task);
});

// POST
router.post("/tasks", (request, response) => {
    const { error } = utils.validateTask(request.body);

    if(error) return response.status(400).send("The name should be at least 3 chars long!")

    const task = {
        id: tasks.length + 1,
        name: request.body.name,
        surname: request.body.surname,
        gender: request.body.gender,
        age: request.body.age,
        address: request.body.address,
        email: request.body.email,
        phone: request.body.phone,
        speciality: request.body.speciality
    };

    tasks.push(task);
    response.status(201).send(task);
});

//PUT
router.put("/tasks/:id", (request, response) => {
    const taskId = request.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if(!task) return response.status(404).send("The task with the provided ID does not exist.");

    const { error } = utils.validateTask(request.body);

    if(error) return response.status(400).send("The name should be at least 3 chars long!")

    task.name = request.body.name;
    task.surname = request.body.surname;
    task.gender = request.body.gender;
    task.age = request.body.age;
    task.address = request.body.address;
    task.email = request.body.email;
    task.phone = request.body.phone;
    task.speciality = request.body.speciality;

    response.send(task);
});



//DELETE
router.delete("/tasks/:id", (request, response) => {
    const taskId = request.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if(!task) return response.status(404).send("The task with the provided ID does not exist.");

    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    response.send(task);
});


module.exports = router;

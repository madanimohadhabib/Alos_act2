const Joi = require('joi');

const taskSchema = {
    name: Joi.string().min(3).required(),
    surname: Joi.string().required(),
    gender: Joi.string().required(),
    age: Joi.number().integer().required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    speciality: Joi.string().required(),
};

exports.validateTask = (task) => Joi.validate(task, taskSchema);

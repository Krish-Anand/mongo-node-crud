const Joi = require('joi');

const registrationValidation = (registerData) => {
    const registerSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
    })
    return registerSchema.validate(registerData);
}

const loginValidation = (loginData) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
    })
    return loginSchema.validate(loginData);
}

module.exports = {
    registrationValidation,
    loginValidation
}
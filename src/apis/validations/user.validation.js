const { Joi } = require("express-validation");

module.exports = {
    singup: {
        body: Joi.object({
            first_name: Joi.string().optional(),
            last_name: Joi.string().optional(),
        })
    },
    login: {
        body: Joi.object({
            email_id: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}
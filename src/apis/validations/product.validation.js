const { Joi } = require("express-validation");


module.exports = {
    addUpdateProduct: {
        body: Joi.object({
            status: Joi.number().valid(1, 2, 3, 4).required(),
            product_id: Joi.number().when("status", {
                is: Joi.number().valid(2, 3, 4),
                then: Joi.number().required(),
                otherwise: Joi.number().optional().allow("")
            }),
            title: Joi.string().when('status', {
                is: Joi.number().valid(1, 2),
                then: Joi.string().required(),
                otherwise: Joi.string().optional()
            }),
            description: Joi.string().optional(),
            price: Joi.number().when('status', {
                is: Joi.number().valid(1, 2),
                then: Joi.number().required(),
                otherwise: Joi.number().optional()
            }),
            quantity: Joi.number().when('status', {
                is: Joi.number().valid(1, 2),
                then: Joi.number().required(),
                otherwise: Joi.number().optional()
            }),
            author_name: Joi.string().when('status', {
                is: Joi.number().valid(1, 2),
                then: Joi.string().required(),
                otherwise: Joi.string().optional()
            }),
            publisher: Joi.string().when('status', {
                is: Joi.number().valid(1, 2),
                then: Joi.string().required(),
                otherwise: Joi.string().optional()
            }),
            book_type: Joi.number().optional(),
        })
    }
}

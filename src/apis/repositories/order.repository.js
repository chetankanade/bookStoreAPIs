const { Order } = require("../../../models/index");

module.exports = {
    createOrder: async (request) => {
        try {
            let order = await Order.create(request);

            order = JSON.parse(JSON.stringify(order));

            return order;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
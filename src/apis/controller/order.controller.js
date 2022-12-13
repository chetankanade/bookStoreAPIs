const { _response } = require("../../utils/util");
const _service = require("../service/services");

module.exports = {
    placeOrder: async (req, res) => {
        try {
            let orderDetails = await _service.placeOrder(req.body, req.user);

            return _response(res, 200, "Order Successfully Placed", orderDetails)
        } catch (error) {
            return _response(res, 400, error.message);
        }
    }
}
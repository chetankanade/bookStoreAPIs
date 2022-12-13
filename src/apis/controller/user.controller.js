const { _response } = require("../../utils/util");
const { deleteUser } = require("../repositories/user.repository");
const _service = require("./../service/services");

module.exports = {
  userSignup: async (req, res) => {
    try {
      let user = await _service.signup(req.body);

      return _response(res, 200, "Signup Success", user);
    } catch (error) {
      return _response(res, 400, error.message);
    }
  },

  userLogin: async (req, res) => {
    try {
      let user = await _service.login(req.body);

      return _response(res, 200, "Login Success", user);
    } catch (error) {
      return _response(res, 400, error.message);
    }
  },
  updateDeleteUser: async (req, res) => {
    try {
      let update = await _service.userProfile(req.body, req.user);
      return _response(res, 200, update);
    } catch (err) {
      return _response(res, 400, err.message);
    }
  },

  addUserAddress: async (req, res) => {
    try {
      let address = await _service.addUserAddress(req.body, req.user);

      return _response(res, 200, "Address Added Successfully", address);
    } catch (error) {
      return _response(res, 400, error.message);
    }
  },

  UserOrderList: async (req, res) => {
    try {
      let list = await _service.UserOrderList(req.body, req.user);

      return _response(res, 200, "Order List", list);
    } catch (error) {
      return _response(res, 400, error.message);
    }
  },

  sellerProductOrdered: async (req, res) => {
    try {
      let list = await _service.ProductOrdered(req.body, req.user);

      return _response(res, 200, "Product Order List", list);
    } catch (error) {
      return _response(res, 400, error.message);
    }
  },
};

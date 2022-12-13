const _repos = require("../repositories/repository");
const {
  geoCordinates,
  jwtToken,
  hashPassword,
  verifyPassword,
} = require("../../utils/util");
const { Op } = require("sequelize");

module.exports = {
  signup: async (request) => {
    try {
      let {
        email_id,
        signup_type,
        password,
        post_code,
        social_login_id,
        user_type,
      } = request;
      let user,
        token_type = "";

      request.email_id = email_id ? email_id.toLowerCase() : email_id;

      let getUser = await _repos.user({ email_id });

      if (getUser) throw new Error("user already exist please try to login");

      if (user_type == 2) {
        let geoCOders = await geoCordinates(post_code);

        request["address"] = geoCOders.formattedAddress;
        request["address_lat"] = geoCOders.latitude.toFixed(2);
        request["address_long"] = geoCOders.longitude.toFixed(2);
      }

      let hashpassword = await hashPassword(password);

      request.password = hashpassword;

      if (signup_type == 1) {
        user = await _repos.createUser(request);

        request["user_id"] = user.user_id;
      }

      if (signup_type == 2 || signup_type == 3) {
        if (!email_id) request.email_id = null;
        if (!first_name) request.first_name = null;
        if (!last_name) request.last_name = null;

        user = await _repos.user({
          [Op.any]: [{ email_id }, { social_login_id }],
        });

        if (!user) {
          user = await _repos.createUser(request);
        }

        if (user) {
          await _repos.updateUser(body, { user_id: user.user_id });
        }

        user = await _repos.user({ user_id: user.user_id });
      }

      request["user_id"] = user.user_id;

      user["address"] =
        user_type == 2 ? await _repos.createAddress(request) : null;

      token_type = user_type == 1 ? "Customer" : "Seller";

      let token = await jwtToken({ user_id: user.user_id, type: token_type });

      user["token"] = token;

      delete user.updatedAt;
      delete user.createdAt;
      delete user.password;

      if (user_type == 2) {
        delete user.address.id;
        delete user.address.user_id;
        delete user.address.createdAt;
        delete user.address.updatedAt;
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  login: async (request) => {
    try {
      let { email_id, password } = request;

      if (email_id) {
        request.email_id = email_id.toLowerCase();
      }

      let getUser = await _repos.user({ email_id });

      if (!getUser) {
        throw new Error("user not found please try to registered");
      }

      let verify = await verifyPassword(password, getUser.password);

      if (!verify) throw new Error("Incorrect Password");

      let token_type = getUser.user_type == 1 ? "Customer" : "Seller";

      let token = await jwtToken({
        user_id: getUser.user_id,
        type: token_type,
      });

      getUser["token"] = token;

      delete getUser.updatedAt;
      delete getUser.createdAt;
      delete getUser.password;

      return getUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  userProfile: async (request, user) => {
    try {
      let { status } = request;

      let { user_id } = user;

      let message = "";

      if (status == 2) {
        await _repos.updateUser(request, user_id);

        message = "User Updated Successfully";
      }

      if (status == 3) {
        await _repos.inactivateUser(status, user_id);

        message = "User InActivated Successfully";
      }

      if (status == 4) {
        await _repos.deleteUser({ user_id });

        message = "User Deleted Successfully";
      }

      return message;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  addUserAddress: async (request, user) => {
    try {
      let { post_code } = request;
      let { user_id } = user;

      let geoCOders = await geoCordinates(post_code);

      request["address_lat"] = geoCOders.latitude.toFixed(2);
      request["address_long"] = geoCOders.longitude.toFixed(2);
      request["user_id"] = user_id;

      let userAddress = await _repos.createAddress(request);

      return userAddress;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  UserOrderList: async (request, user) => {
    try {
      let { limit, offset, search } = request;
      let { user_id, user_type } = user;
      let where = {};
      let where1 = {};

      if (user_type == 2) throw new Error("Invalid Request");

      if (limit && offset) {
        limit = limit ? limit : 10;
        offset = offset ? offset : 0;
      }

      if (search) {
        where1["title"] = {
          [Op.like]: "%" + search + "%",
        };
      }

      where["user_id"] = user_id;

      let { rows, count } = await _repos.getUserOrder(
        where,
        where1,
        limit,
        offset
      );

      return { count, rows };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  ProductOrdered: async (request, user) => {
    try {
      let { limit, offset, search } = request;
      let { user_id, user_type } = user;
      let where = {};
      let where1 = {};

      if (user_type == 1) throw new Error("invalid Request");

      if (limit && offset) {
        limit = limit ? limit : 10;
        offset = offset ? offset : 0;
      }

      if (search) {
        where1["title"] = {
          [Op.like]: "%" + search + "%",
        };
      }

      where["user_id"] = user_id;

      let { rows, count } = await _repos.productOrdered(
        where,
        where1,
        limit,
        offset
      );

      return { count, rows };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

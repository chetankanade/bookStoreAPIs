const { User, Order, Product } = require("../../../models/index");

module.exports = {
  user: async (request) => {
    try {
      let user = await User.findOne({
        where: request,
      });

      user = JSON.parse(JSON.stringify(user));

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createUser: async (request) => {
    try {
      let user = await User.create(request);

      user = JSON.parse(JSON.stringify(user));

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateUser: async (body, id) => {
    try {
      return await User.update(body, { where: { user_id: id } });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  inactivateUser: async (status, user_id) => {
    try {
      return await User.update(
        { status, updatedAt: new Date() },
        {
          where: {
            user_id,
          },
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteUser: async (user_id) => {
    try {
      return await User.destroy({
        where: { user_id: user_id.user_id },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getUserOrder: async (where, where1, limit, offset) => {
    try {
      let list = await User.findAndCountAll({
        where: where,
        limit,
        offset,
        attributes: ["first_name"],
        include: [
          {
            model: Order,
            as: "customer_orders",
            attributes: ["Order_id", "product_id", "price", "quantity"],
            required: true,
            include: [
              {
                model: Product,
                as: "user_order_product",
                where: where1,
                required: false,
                attributes: ["title", "price", "author_name", "publisher"],
              },
            ],
          },
        ],
      });

      list = JSON.parse(JSON.stringify(list));

      return list;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  productOrdered: async (where, where1, limit, offset) => {
    try {
      let list = await User.findAndCountAll({
        where,
        limit,
        offset,
        attributes: ["first_name", "email_id"],

        include: [
          {
            model: Product,
            as: "seller_product",
            attributes: ["title", "price", "author_name", "publisher"],
            required: true,
            include: [
              {
                model: Order,
                as: "product_ordered",
                attributes: ["Order_id", "product_id", "price", "quantity"],
                required: true,
              },
            ],
          },
        ],
      });

      list = JSON.parse(JSON.stringify(list));

      return list;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

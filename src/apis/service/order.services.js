const _repos = require("../repositories/repository");

module.exports = {
  placeOrder: async (request, user) => {
    try {
      let { product_id, price, quantity } = request;
      let { user_id, user_type } = user;

      if (user_type == 2) throw new Error("invalid User Request");

      let userAddress = await _repos.getUserAddress({ user_id });

      if (!userAddress) throw new Error("user Address is required");

      if (price == 0) throw new Error("price must be greter then zero");

      let product = await _repos.getProductById({ product_id });

      if (!product) {
        throw new Error("product not found!! Please select valid product");
      }

      if (product.status == 3 || product.status == 4) {
        throw new Error("Product not availabe to buy");
      }

      if (product.quantity == 0) throw new Error("Out Of stock");

      if (quantity > product.quantity)
        throw new Error(`Only ${product.quantity} quantity is available`);

      request["user_id"] = user_id;

      let productQuantity = product.quantity - quantity;

      productQuantity = productQuantity < 0 ? 0 : productQuantity;

      await _repos.updateProduct({ quantity: productQuantity }, product_id);

      let placeOrder = await _repos.createOrder(request);

      return placeOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

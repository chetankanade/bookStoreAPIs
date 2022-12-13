module.exports = (sequelize, DataTypes) => {
  let Order = sequelize.define(
    "Order",
    {
      Order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_status: {
        type: DataTypes.INTEGER,
        default: 1,
        comment: `1=>Pending, 2=> Shipped, 3=> Delivered`,
      },
      payment_status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: `1=>Pending, 2=> Success, 3=> Fail`,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      deletedAt: "deletedAt",
      timestamps: true,
      tableName: "order",
    }
  );

  Order.associate = (module) => {
    Order.hasOne(module.Product, {
      sourceKey: "product_id",
      foreignKey: "product_id",
      as: "user_order_product",
      constraints: false,
    });
  };

  return Order;
};

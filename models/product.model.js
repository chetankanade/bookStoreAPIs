module.exports = (sequelize, DataTypes) => {
  let Product = sequelize.define(
    "Product",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: `1=>Available, 2=>UnAvailable`,
      },
      author_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      book_type: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_sold: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: false,
      deletedAt: "deletedAt",
      timestamps: true,
      tableName: "product",
    }
  );

  Product.associate = (module) => {
    Product.hasMany(module.Order, {
      sourceKey: "product_id",
      foreignKey: "product_id",
      as: "product_ordered",
      constraints: false,
    });
  };

  return Product;
};

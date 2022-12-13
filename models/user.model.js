module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      email_id: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_type: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: `1=>Customer, 2=>Seller`,
      },
      signup_type: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: `1=> Email/pass, 2=>Google, 3=>facebook`,
      },
      social_login_id: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: `1=>Active, 2=>Inactive`,
      },
    },
    {
      paranoid: false,
      deletedAt: "deletedAt",
      timestamps: true,
      tableName: "user",
    }
  );

  User.associate = (module) => {
    User.hasOne(module.Address, {
      sourceKey: "user_id",
      foreignKey: "user_id",
      as: "user_address",
      constraints: false,
    });

    User.hasMany(module.Product, {
      sourceKey: "user_id",
      foreignKey: "user_id",
      as: "seller_product",
      constraints: false,
    });

    User.hasMany(module.Order, {
      sourceKey: "user_id",
      foreignKey: "user_id",
      as: "customer_orders",
      constraints: false,
    });
  };

  return User;
};

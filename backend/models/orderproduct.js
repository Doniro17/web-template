'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderProduct.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'OrderProduct',
    },
  );
  OrderProduct.associate = ({ OrderProduct, Order, Product }) => {
    OrderProduct.belongsTo(Order, {
      foreignKey: {
        name: 'orderId',
      },
    });
    OrderProduct.belongsTo(Product, {
      foreignKey: {
        name: 'productId',
      },
    });
  };
  return OrderProduct;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {}
  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      courierId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notNull: false,
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.ENUM('created', 'delivering', 'delivered', 'done', 'canceled'),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  Order.associate = ({ Order, user }) => {
    Order.belongsTo(user, {
      foreignKey: {
        name: 'userId',
      },
    });
  };
  return Order;
};

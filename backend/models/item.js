const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Item extends Model {}
  Item.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      itemName: DataTypes.STRING,
      description: DataTypes.TEXT,
      quantity: DataTypes.INTEGER,
    },
    { sequelize, modelName: 'Item' }
  );
  return Item;
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TodoItem = sequelize.define('TodoItem', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    duedate: {
      type: DataTypes.DATEONLY
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    }
  });

  TodoItem.associate = (models) => {
    TodoItem.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return TodoItem;
};
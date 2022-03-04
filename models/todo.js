'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'title cannot be empty'
        },
        notEmpty: {
          msg: 'title cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'description cannot be empty'
        },
        notEmpty: {
          msg: 'description cannot be empty'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId cannot be empty'
        },
        notEmpty: {
          msg: 'UserId cannot be empty'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'should be in date string format, try YYYY-MM-DD or MM/DD/YYYY'
        },
        notNull: {
          msg: `Due date cannot be empty`
        },
        notEmpty: {
          msg: `Due date cannot be empty`
        },
        isAfter: {
          args: moment(new Date()).format('YYYY-MM-DD'),
          msg: 'Tidak bisa input tanggal yang sudah lewat'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
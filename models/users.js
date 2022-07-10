'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
     // define association here
    static associate({ Comment, Article }) {
      // comment and article
      User.hasMany(Comment, {
        foreignKey: "user_id",
        as: "Comments"
      })
     
      User.hasMany(Article, {
        foreignKey: "user_id",
        as: "Articles"
      })
    }
  }
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user','admin'],
      defaultValue: "user"
    }
  }, 
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });

  return User;
};
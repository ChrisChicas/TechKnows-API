'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    
      static associate({ User }) {
        // user
        Comment.belongsTo(User, {
          foreignKey: "user_id",
          as: "article"
        })
      }
  }
  Article.init({
    article_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false
    },
    content: {
      type:DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Article',
    tableName: 'articles',
    timestamps: false
  });
  return Article;
};
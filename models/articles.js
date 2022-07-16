'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    
      static associate({ User, Comment }) {
        Article.belongsTo(User, {
          foreignKey: "user_id",
          as: "artAuthor"
        })
        Article.hasMany(Comment, {
          foreignKey:'article_id',
          as: 'artComments'
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
      type:DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    tag: {
      type: DataTypes.ENUM,
      values: ['General', 'HTML', 'CSS', 'JavaScript', 'NodeJS', 'Python'],
      defaultValue: "General"
    }
  }, {
    sequelize,
    modelName: 'Article',
    tableName: 'articles',
    timestamps: false
  });
  return Article;
};
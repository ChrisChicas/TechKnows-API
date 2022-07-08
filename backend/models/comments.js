'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
     static associate({ User, Article }) {
      Comment.belongsTo(User, { as: 'author', foreignKey: "author_id" })
      Comment.belongsTo(Article, { as:'article', foreignKey: 'article_id' })
      }
    };
  Comment.init({
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },

    article_id:
    {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: false
  });
  return Comment;
};
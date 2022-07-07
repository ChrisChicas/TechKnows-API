'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
     static associate({ User, Article }) {
        // user
        Comment.belongsTo(User, {
          foreignKey: "user_id",
          as: "comment"
        })
  
        // article
        Comment.belongsTo(Article, {
          foreignKey: "article_id",
          as: "articles"
        })
      }
    }
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
    user_id: {
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
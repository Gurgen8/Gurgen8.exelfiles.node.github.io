import { Model, DataTypes } from "sequelize";
import sequelize from "../services/sequelize";

class Excel extends Model {
}

Excel.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  post_author: {
    type: DataTypes.SMALLINT,
  },
  post_date: {
    type: DataTypes.DATE
  },
  post_date_gmt: {
    type: DataTypes.DATE
  },
  post_content: {
    type: DataTypes.TEXT
  },
  post_excerpt: {
    type: DataTypes.TEXT
  },
  post_status: {
    type: DataTypes.STRING
  },
  ment_status: {
    type: DataTypes.STRING
  },
  ping_status: {
    type: DataTypes.STRING
  },
  post_password: {
    type: DataTypes.STRING
  },
  post_name: {
    type: DataTypes.STRING
  },
  to_ping: {
    type: DataTypes.STRING
  },
  pinged: {
    type: DataTypes.STRING
  },
  post_modified: {
    type: DataTypes.DATE
  },
  post_modified_gmt: {
    type: DataTypes.DATE
  },
  post_content_filtered: {
    type: DataTypes.STRING
  },
  post_parent: {
    type: DataTypes.STRING
  },
  guid: {
    type: DataTypes.STRING
  },
  menu_order: {
    type: DataTypes.STRING
  },
  post_type: {
    type: DataTypes.STRING
  },
  post_mime_type: {
    type: DataTypes.STRING
  },
  comment_count: {
    type: DataTypes.STRING
  },

}, {
  sequelize,
  modelName: 'Excel',
  tableName: 'excelist',
  timestamps: false
})
export default Excel;

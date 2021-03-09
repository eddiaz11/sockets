const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Message extends Model {}

Message.init(
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ts: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
  },
  {
    sequelize,
    modelName: "Message",
  }
);

Message.sync();

module.exports = Message;
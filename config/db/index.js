var Sequelize  = require("sequelize");



const sequelize = module.exports = new Sequelize("users", "root","",
  {
    host: "127.0.0.1",
    dialect: 'mysql',
    operatorsAliases: Sequelize.Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });

sequelize.sync({
  force: false,
});
const Sequelize = require('sequelize')
const sequelize = require('../../config/db')

var userDetails = sequelize.define('userDetails', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    emailAddress: Sequelize.STRING,
    dob:Sequelize.TEXT,
    address: Sequelize.TEXT,
    userImage :Sequelize.TEXT
})


module.exports = userDetails
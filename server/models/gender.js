require('dotenv').config({ path: '../../.env'});
const { Sequelize, DataTypes } = require('sequelize');

const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  }
);

const Gender = sequelize.define('Gender', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'genders',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = { Gender }
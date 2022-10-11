require('dotenv').config({ path: '../../.env'});
const { Sequelize, DataTypes } = require('sequelize');
const { Gender } = require('./gender');

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

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email_address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  gender_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  weight: {
    type: DataTypes.INTEGER
  },
  body_fat: {
    type: DataTypes.FLOAT
  },
  height: {
    type: DataTypes.INTEGER
  },
  birthday: {
    type: DataTypes.DATEONLY
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

User.hasOne(Gender, {
  foreignKey: 'id',
  sourceKey: 'gender_id',
});

module.exports = { User }
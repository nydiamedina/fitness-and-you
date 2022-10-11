require('dotenv').config();
const Sequelize = require('sequelize');
const Gender = require('./gender');

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
    allowNull: false
  },
  gender_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Gender,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
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
    type: DataTypes.DATE
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = { User }
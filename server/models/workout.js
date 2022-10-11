require('dotenv').config({ path: '../../.env'});
const { Sequelize, DataTypes } = require('sequelize');
const { User } = require('./user');

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

const Workout = sequelize.define('Workout', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER
  },
  calories: {
    type: DataTypes.INTEGER
  },
}, {
  tableName: 'workouts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Workout.belongsTo(User, {
  foreignKey: 'id',
  sourceKey: 'user_id',
});

module.exports = { Workout }
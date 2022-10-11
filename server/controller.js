require("dotenv").config();
const Sequelize = require("sequelize");
const User = require('./models/user');
const Workout = require('./models/workout');
const Gender = require('./models/gender');

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

module.exports = {
  getUser: async (req, res) => {
    const { user_id } = req.params;

    await User.findAll({             
      where: {
        id: {
          [Sequelize.Op.eq]: user_id
        }
      }  
    }).then((dbRes) => {
        res.status(200).send(dbRes);
    }).catch(err => res.status(500).send(`An error occurred while retrieving user information. ${err}`));
  },
  updateUser: async (req, res) => {
    const { user_id } = req.params;
    const updatedUser = req.body;

    await User.update(updatedUser, {
      where: {
        id: {
          [Sequelize.Op.eq]: user_id
        }
      }  
    }).then((dbRes) => {
        res.status(200).send(dbRes);
    }).catch(err => res.status(500).send(`An error occurred while retrieving user's workouts. ${err}`));
  },
  createUserWorkout: async (req, res) => {
    const newWorkout = Workout.build(req.body);

    await newWorkout.save().then((dbRes) => {
        res.status(200).send(dbRes[0]);
    }).catch(err => res.status(500).send(`An error occurred while creating workout. ${err}`));
  },
  deleteUserWorkout: async (req, res) => {
    const { workout_id } = req.params;

    await Workout.destroy({
      where: {
        id: {
          [Sequelize.Op.eq]: workout_id
        }
      }  
    }).then((dbRes) => {
        res.status(200).send(dbRes[0]);
    }).catch(err => res.status(500).send(`An error occurred while deleting workout. ${err}`));
  },
  getGenders: async (req, res) => {
    await Gender.findAll({ }).then((dbRes) => {
        res.status(200).send(dbRes);
    }).catch(err => res.status(500).send(`An error occurred while retrieving genders. ${err}`));
  }
}
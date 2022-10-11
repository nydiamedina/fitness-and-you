require('dotenv').config({ path: '../.env'});
const Sequelize = require("sequelize");
const { User } = require('./models/user');
const { Workout } = require('./models/workout');
const { Gender } = require('./models/gender');

module.exports = {
  getUser: async (req, res) => {
    const { userId } = req.params;

    await User.findOne({             
      where: {
        id: {
          [Sequelize.Op.eq]: userId
        }
      }  
    }).then((dbRes) => {
        res.status(200).send(dbRes);
    }).catch(err => res.status(500).send(`An error occurred while retrieving user information. ${err}`));
  },
  updateUser: async (req, res) => {
    const { userId } = req.params;
    const propertiesToUpdate = req.body;
    const userToUpdate = await User.findOne({             
      where: {
        id: {
          [Sequelize.Op.eq]: userId
        }
      }  
    });

    userToUpdate.set(propertiesToUpdate);

    await userToUpdate.save().then((dbRes) => {
        res.status(200).send(dbRes);
    }).catch(err => res.status(500).send(`An error occurred while retrieving user's workouts. ${err}`));
  },
  createUserWorkout: async (req, res) => {
    const newWorkout = Workout.build(req.body);

    await newWorkout.save().then((dbRes) => {
        res.status(200).send(dbRes[0]);
    }).catch(err => res.status(500).send(`An error occurred while creating workout. ${err}`));
  },
  getUserWorkouts: async (req, res) => {
    const { userId } = req.params;

    await Workout.findAll({             
      where: {
        user_id: {
          [Sequelize.Op.eq]: userId
        }
      }  
    }).then((dbRes) => {
        res.status(200).send(dbRes);
    }).catch(err => res.status(500).send(`An error occurred while retrieving user information. ${err}`));
  },
  deleteUserWorkout: async (req, res) => {
    const { workoutId } = req.params;

    await Workout.destroy({
      where: {
        id: {
          [Sequelize.Op.eq]: workoutId
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
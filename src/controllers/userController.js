import db from '../models'
import { validate } from '../services/validation.js'
import { v4 as uuid } from 'uuid'

const Users = db.users;
const Groups = db.groups;
const Op = db.Sequelize.Op;

class UserController {
  create(req, res) {
    const error = validate(req.body);
    if (error) {
      res.status(404).send(error);
      return;
    }

    const user = {
      id: uuid(),
      login: req.body.login,
      password: req.body.password,
      age: req.body.age,
      isDeleted: req.body.isDeleted || false,
    }

    Users.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };

  update(req, res) {
    const error = validate(req.body, true)
    if (error) {
      res.status(404).send(error);
      return;
    }

    const id = req.params.id;

    Users.update(req.body, {
      where: { id: id, isDeleted: false }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Error updating User with id=${id}`
        });
      });
  };

  deleteUser(req, res) {
    const id = req.params.id;
    const softDeleteBody = {...req.body, isDeleted: true}

    Users.update(softDeleteBody, {
      where: { id: id, isDeleted: false }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `User with id=${id} has been deleted earlier.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Error deleting User with ${id}.`
        });
      });
  };

  getUser(req, res) {
    const id = req.params.id;

    Users.findByPk(id, { include: [
        {
          model: Groups,
          as: "groups",
          attributes: ["id", "name", "permissions"],
          through: {
            attributes: [],
          }
        },
      ]} )
      .then(data => {
        if(!data.isDeleted) {
          res.send(data);
        }
        res.status(404).send(`Cannot find User with id=${id}.`);
      })
      .catch(err => {
        res.status(500).send({
          message: `Error retrieving User with id=${id}`
        });
      });
  };

  getAutoSuggestedUsers(req, res) {
    const login = req.query.login;
    const condition = login ? { login: { [Op.iLike]: `%${login}%` } } : null;

    const order = [['login', 'ASC'],]
    const limit = req.query.limit;

    Users.findAll({ where: condition,  order: order, limit: limit,
      include: [
          {
            model: Groups,
            as: "groups",
            attributes: ["id", "name", "permissions"],
            through: {
              attributes: [],
            }
          },
        ], })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };

}

export default new UserController()

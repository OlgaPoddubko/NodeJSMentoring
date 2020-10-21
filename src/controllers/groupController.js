import db from '../models'
import { v4 as uuid } from 'uuid'
import { logger, infoMessageTemplate, errorMessageTemplate } from '../logger/logger.js'

const Groups = db.groups;
const Users = db.users;
const Op = db.Sequelize.Op;

class GroupController {
  createGroup(req, res) {
    if (!req.body.name) {
      res.status(404).send("Group name is required.");
      return;
    }

    const group = {
      id: uuid(),
      name: req.body.name,
      permissions: req.body.permissions,
    }

    Groups.create(group)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        logger.error(errorMessageTemplate('GroupController.createGroup', req, err))
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Group."
        });
      });
  };

  updateGroup(req, res) {
    const id = req.params.id;

    Groups.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Group was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Group with id=${id}.`
          });
        }
      })
      .catch(err => {
        logger.error(errorMessageTemplate('GroupController.updateGroup', req, err))
        res.status(500).send({
          message: `Error updating Group with id=${id}`
        });
      });
  };


  deleteGroup(req, res) {
    const id = req.params.id;

    Groups.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Group was deleted successfully!"
          });
        } else {
          res.send({
            message: `Group with id=${id} has been deleted earlier.`
          });
        }
      })
      .catch(err => {
        logger.error(errorMessageTemplate('GroupController.deleteGroup', req, err))
        res.status(500).send({
          message: `Error deleting Group with ${id}.`
        });
      });
  };

  getGroup(req, res) {
    const id = req.params.id;

    Groups.findByPk(id, { include: [
        {
          model: Users,
          as: "users",
          attributes: ["id", "login", "age"],
          through: {
            attributes: [],
          }
        },
      ]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        logger.error(errorMessageTemplate('GroupController.getGroup', req, err))
        res.status(500).send({
          message: `Error retrieving Group with id=${id}`
        });
      });
  };

  getAllGroups(req, res) {
    Groups.findAll({ include: [
        {
          model: Users,
          as: "users",
          attributes: ["id", "login", "age"],
          through: {
            attributes: ["user_id", "group_id"],
          }
        },
      ]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        logger.error(errorMessageTemplate('GroupController.getAllGroups', req, err))
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving groups."
        });
      });
  };
}

export default new GroupController()

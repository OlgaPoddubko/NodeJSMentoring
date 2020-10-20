import db from '../models'

const Groups = db.groups;
const Users = db.users;
const UserGroup = db.user_group;

class UserGroupController{
  addUsersToGroup(req, res){
    const group_id = req.body.group_id;
    const user_id = req.body.user_id;

    return Groups.findByPk(group_id)
      .then(group => {
        if (!group) {
          console.log("Group not found!");
          return null;
        }

        return Users.findByPk(user_id).then((user) => {
          if (!user) {
            console.log("User not found!");
            return null;
          }

          const userGroup = {
            group_id,
            user_id,
          }

          UserGroup.create(userGroup)
            .then(data => {
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the UserGroup."
              });
            });
        });
      })
      .catch((err) => {
        console.log(">> Error while adding User to Group: ", err);
      });
  }
}

export default new UserGroupController()

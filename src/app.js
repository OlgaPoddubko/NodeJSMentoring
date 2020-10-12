import express from 'express'
import users from './api/userRouter.js'
import groups from './api/groupRouter.js'
import userGroup from './api/userGroupRouter.js'
import db from './models/index.js'

const app = express();

app.use(express.json());
app.use('/users', users);
app.use('/groups', groups);
app.use('/user_group', userGroup);

app.listen(8080,() => {
    console.log(`app is listening to port 8080`);
})

db.sequelize.sync()

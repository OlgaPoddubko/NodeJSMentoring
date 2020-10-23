import cors from 'cors'
import express from 'express'
import checkToken from './services/checkToken.js'
import login from './routers/loginRouter.js'
import users from './routers/userRouter.js'
import groups from './routers/groupRouter.js'
import userGroup from './routers/userGroupRouter.js'
import db from './models/index.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/login', login);
app.use('/users', checkToken, users);
app.use('/groups', checkToken, groups);
app.use('/user_group', checkToken, userGroup);

app.listen(8080,() => {
    console.log(`app is listening to port 8080`);
})

db.sequelize.sync()

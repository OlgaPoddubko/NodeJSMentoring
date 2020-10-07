import express from 'express'
import users from './api/userRouter.js'
import db from './models/index.js'

const app = express();

app.use(express.json());
app.use('/users', users);

app.listen(8080,() => {
    console.log(`app is listening to port 8080`);
})

db.sequelize.sync()

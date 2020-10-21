import express from 'express'
import UserGroupController from '../controllers/userGroupController.js'

const router = express.Router();

router.post('/', UserGroupController.addUsersToGroup)

export default router

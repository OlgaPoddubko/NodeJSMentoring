import express from 'express'
import { validate } from '../services/validation.js'
import UserGroupController from '../controllers/userGroupController.js'

const router = express.Router();

router.post('/', UserGroupController.addUsersToGroup)

export default router

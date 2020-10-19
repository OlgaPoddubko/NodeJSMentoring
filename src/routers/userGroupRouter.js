import express from 'express'
import { validate } from '../services/validation.js'
import { addUsersToGroup } from '../controllers/userGroupController.js'

const router = express.Router();

router.post('/', addUsersToGroup)

export default router

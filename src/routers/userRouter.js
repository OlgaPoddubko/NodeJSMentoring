import express from 'express'
import { validate } from '../services/validation.js'
import UserController from '../controllers/userController.js'

const router = express.Router();

router.post('/', UserController.create)

router.put('/:id', UserController.update)

router.delete('/:id', UserController.deleteUser)

router.get('/:id', UserController.getUser)

router.get('/', UserController.getAutoSuggestedUsers)

export default router

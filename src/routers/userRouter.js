import express from 'express'
import { validate } from '../services/validation.js'
import { create, update, deleteUser, getUser, getAutoSuggestedUsers } from '../controllers/userController.js'

const router = express.Router();

router.post('/', create)

router.put('/:id',update)

router.delete('/:id', deleteUser)

router.get('/:id', getUser)

router.get('/', getAutoSuggestedUsers)

export default router

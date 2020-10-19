import express from 'express'
import { createGroup, updateGroup, deleteGroup, getGroup, getAllGroups } from '../controllers/groupController.js'

const router = express.Router();

router.post('/', createGroup)

router.put('/:id', updateGroup)

router.delete('/:id', deleteGroup)

router.get('/:id', getGroup)

router.get('/', getAllGroups)

export default router

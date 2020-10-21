import express from 'express'
import GroupController from '../controllers/groupController.js'

const router = express.Router();

router.post('/', GroupController.createGroup)

router.put('/:id', GroupController.updateGroup)

router.delete('/:id', GroupController.deleteGroup)

router.get('/:id', GroupController.getGroup)

router.get('/', GroupController.getAllGroups)

export default router

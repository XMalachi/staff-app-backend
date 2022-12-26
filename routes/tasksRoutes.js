import express from 'express'

import {getAllTasks, getTasks, createTask, updateTask, deleteTask} from '../controllers/tasksControllers.js'
import { Protect, authorizeStaff } from '../middleware/auth.js'

const router = express.Router()

router.route('/').get(Protect, authorizeStaff("admin"), getAllTasks)
router.route('/').get(Protect, getTasks).post( Protect , authorizeStaff("admin"), createTask)
router.route('/:id').put(Protect,updateTask).delete(Protect , authorizeStaff("admin"),deleteTask)

export { router }
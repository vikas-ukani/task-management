import { Router } from "express";
import taskController from "../controller/taskController";

const router = Router()

router.get('/', taskController.getAll)
router.post('/', taskController.createTask)
router.put('/:id', taskController.updateTask)
router.delete('/:id', taskController.deleteTask)


export default router
import { Router } from "express";
import taskController from "../controller/taskController";

const router = Router()

router.get('/', taskController.getAll)
router.post('/', taskController.createTask)


export default router
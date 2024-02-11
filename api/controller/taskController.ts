import { ITask } from './../types/task';
import { Request, Response } from "express"
import Task from "../models/taskModel"

export default {
    getAll: async (req: Request, res: Response) => {
        try {
            const tasks: ITask[] = await Task.find({}).sort({ createdAt: -1 })
            return res.json({ tasks, message: "All tasks retrieved." }).status(200)
        } catch (error: any) {
            return res.json({ message: "Internal server error", error: error.message }).status(400)
        }
    },
    createTask: async (req: Request, res: Response) => {
        try {
            const body = req.body

            const task = new Task({ ...body })
            const newTask: ITask = await task.save()

            return res.json({ data: newTask, message: "Task has been created." }).status(201)
        } catch (error: any) {
            return res.json({ message: "Internal server error", error: error.message }).status(400)
        }
    }
}
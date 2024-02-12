import { ITask } from './../types/task';
import { Request, Response } from "express"
import Task from "../models/taskModel"

export default {
    getAll: async (req: any, res: Response) => {
        try {
            const tasks: ITask[] = await Task.find({userId: req.user._id}).sort({ createdAt: -1 })
            return res.json({ status: true, tasks, message: "All tasks retrieved." }).status(200)
        } catch (error: any) {
            return res.json({ status: false, message: "Internal server error", error: error.message }).status(400)
        }
    },
    createTask: async (req: any, res: Response) => {
        try {
            const body = req.body
            console.log('req.user', req.user)
            if (!req.user) return res.json({ success: false, message: 'Please login to save the task.' })

            console.log('Data', { ...body, userId: req.user._id})
            const task = new Task({ ...body, userId: req.user._id})
            const newTask: ITask = await task.save()

            return res.json({ success: true, task: newTask, message: "Task has been created." }).status(201)
        } catch (error: any) {
            return res.json({ success: false, message: "Internal server error", error: error.message }).status(400)
        }
    }
}
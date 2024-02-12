import { ITask } from './../types/task';
import { Request, Response } from "express"
import Task from "../models/taskModel"

export default {
    getAll: async (req: any, res: Response) => {
        try {
            const tasks: ITask[] = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 })
            return res.json({ status: true, tasks, message: "All tasks retrieved." }).status(200)
        } catch (error: any) {
            return res.json({ status: false, message: error.message }).status(400)
        }
    },
    createTask: async (req: any, res: Response) => {
        try {
            const body = req.body
            if (!req.user) return res.json({ success: false, message: 'Please login to save the task.' })

            if(!body.title ||!body.description ||!body.status) return res.json({ success: false, message: 'Please fill all the fields.'})
            
            const task = new Task({ ...body, userId: req.user._id })
            const newTask: ITask = await task.save()

            return res.json({ success: true, task: newTask, message: "Task has been created." }).status(201)
        } catch (error: any) {
            return res.json({ success: false, message:error.message}).status(400)
        }
    },

    updateTask: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const body = req.body
            const task = await Task.findByIdAndUpdate(id, body, { new: true })
            return res.json({ success: true, task, message: "Task has been updated." }).status(200)
        } catch (err: any) {
            return res.json({ success: false, message: "Internal server error", error: err.message }).status(400)
        }
    },

    deleteTask: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const task = await Task.findById(id).lean()
            if(!task) return res.json({ success: false, message: "Task not found in our database." }).status(200)
            await Task.findByIdAndDelete(id)
            return res.json({ success: true, task, message: "Task has been deleted." }).status(200)
        } catch (err: any) {
            return res.json({ success: false, message: "Internal server error", error: err.message }).status(400)
        }
    }


}
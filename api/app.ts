import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import taskRouter from './router/taskRouter'

dotenv.config()

function buildApp() {
    const app: Express = express()

    app.use(cors())
    app.use(express.json())

    const uri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager';
    mongoose.connect(uri)
        .then(() => console.log('MongoDB connected successfully...'))
        .catch((err) => console.log(`MongoDB connection error: ${err}`));


    // Routers
    app.get('/status', (req, res) => {
        res.status(200).send({ message: "Welcome to the task management application." })
    })

    app.use('/tasks', taskRouter)

    return app
}


export default buildApp()

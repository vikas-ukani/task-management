import mongoose, { Schema, model } from "mongoose";
import { Status } from "../utils";


const TaskSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, "Please provide task title."]
    },
    description: {
        type: String,
        required: [true, "Please provide task description."]
    },
    status: {
        type: String,
        enum: Status,
        default: Status.ToDo
    }
}, {
    timestamps: true
})

const Task = mongoose.models.Task || model('Task', TaskSchema)
export default Task
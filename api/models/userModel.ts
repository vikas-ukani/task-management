import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email."],
        unique: true,
    },
    password: {
        type: String,
    },

}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
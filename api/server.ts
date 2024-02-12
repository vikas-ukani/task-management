import mongoose from "mongoose";
import app from "./app"

function buildServer() {
    const uri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager';
    mongoose.connect(uri)
        .then(() => console.log('MongoDB connected successfully...'))
        .catch((err) => console.log(`MongoDB connection error: ${err}`));


    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
        console.log(`Server is running on port::${PORT}`)
    })
}

buildServer()



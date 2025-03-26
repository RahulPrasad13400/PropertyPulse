import mongoose from "mongoose";

let connected = false 

const connectDB = async () => {
    mongoose.set('strictQuery', true) // is make sure only schema specified will be saved to the database
    // if database is already connected don't connect again
    if(connected){
        console.log("mongo db is connected")
        return
    }
    // connect to mongo db 
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true 
    } catch (error) {
        console.log(error)
    }
}

export default connectDB
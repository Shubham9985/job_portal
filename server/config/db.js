import mongoose from "mongoose";

//conect with MONGODB

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("MONGODB connected successfully");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}

export default connectDB;
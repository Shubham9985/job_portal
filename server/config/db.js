import mongoose from "mongoose";

//connect with MONGODB

const connectDB = async () => {
        try {
                mongoose.connection.on("connected", () => {
                        console.log("MONGODB connected successfully");
                });

                await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
                console.log("MONGODB connection attempt completed");
        } catch (error) {
                console.error("Failed to connect to MONGODB:", error);
        }
}

export default connectDB;

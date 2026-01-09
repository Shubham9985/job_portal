import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id : { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    resume : { type: String},
    image : { type: String , required: true  }
});

const User = mongoose.model('User', userSchema);

export default User;


//MONGODB_URI = "mongodb+srv://shubham9985kumar_db_user:kxvXjZR7ueXa0NF0@cluster0.13bffnp.mongodb.net/?appName=Cluster0"
//CLERK_WEBHOOK_SECRET = ""
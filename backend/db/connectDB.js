import mongoose from "mongoose";

const connectDB = async () => {
    try {

        await mongoose.connect("mongodb://127.0.0.1:27017/Real-State")
        console.log("Connected To DB");

    } catch (error) {
        console.log("Not Connected To DB");
    }
}

export default connectDB
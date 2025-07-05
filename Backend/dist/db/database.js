import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
    try {
        console.log("debug", process.env.DATABASE);
        await mongoose.connect(process.env.DATABASE);
        console.log('MongoDB connected');
    }
    catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    }
};
export default connectDB;

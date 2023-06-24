import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.MONGODB_URI;

async function connectToDatabase(): Promise<void> {
    try {
        await mongoose.connect(URI);
        console.log('Connected to Database');
    } catch (error) {
        console.error('Error connecting to Database: ', error);
        process.exit(1);
    }
}

export default connectToDatabase;

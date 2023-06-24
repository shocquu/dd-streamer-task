import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async (): Promise<void> => {
    const databaseURL = process.env.MONGODB_URI;

    try {
        await mongoose.connect(databaseURL);
        console.log('Connected to Database');
    } catch (error) {
        console.error('Error connecting to Database: ', error);
        process.exit(1);
    }
};

export const connectToTestDatabase = async () => {
    const databaseURL = process.env.MONGODB_TEST_URI;

    try {
        await mongoose.connect(databaseURL);
        console.log('Connected to the test database.');
    } catch (error) {
        console.error('Failed to connect to the test database:', error);
    }
};

export default connectToDatabase;

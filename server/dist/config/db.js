"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URI = process.env.MONGODB_URI;
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect(URI);
        console.log('Connected to Database');
    }
    catch (error) {
        console.error('Error connecting to Database: ', error);
        process.exit(1);
    }
}
exports.default = connectToDatabase;
//# sourceMappingURL=db.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const async_1 = __importDefault(require("async"));
const clearDatabase = (callback) => {
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('Attempt to clear non testing database!');
    }
    const fns = [];
    const createAsyncFn = (index) => {
        fns.push((done) => {
            mongoose_1.default.connection.collections[index].deleteOne(() => {
                done();
            });
        });
    };
    for (const i in mongoose_1.default.connection.collections) {
        if (mongoose_1.default.connection.collections.hasOwnProperty(i)) {
            createAsyncFn(i);
        }
    }
    async_1.default.parallel(fns, () => callback());
};
exports.default = clearDatabase;
//# sourceMappingURL=clearDb.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    env: 'test',
    db: process.env.MONGODB_TEST_URI,
    port: process.env.PORT || 3000,
};
exports.default = config;
//# sourceMappingURL=testDb.js.map
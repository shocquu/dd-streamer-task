"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const streamer_controller_1 = __importDefault(require("./streamer.controller"));
const router = (0, express_1.Router)();
router.get('/', streamer_controller_1.default.getStreamers);
router.get('/:streamerId', streamer_controller_1.default.getStreamerById);
router.post('/', streamer_controller_1.default.createStreamer);
// TODO:
// router.put('/:streamerId/vote', StreamerController.getStreamers);
exports.default = router;
//# sourceMappingURL=streamer.routes.js.map
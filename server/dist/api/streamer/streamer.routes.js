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
router.put('/:streamerId', streamer_controller_1.default.updateSteamer);
router.put('/:streamerId/vote', streamer_controller_1.default.voteForStreamer);
router.delete('/:streamerId', streamer_controller_1.default.deleteStreamer);
exports.default = router;
//# sourceMappingURL=streamer.routes.js.map
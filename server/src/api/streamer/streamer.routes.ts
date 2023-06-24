import { Router } from 'express';
import StreamerController from './streamer.controller';

const router = Router();

router.get('/', StreamerController.getStreamers);
router.get('/:streamerId', StreamerController.getStreamerById);
router.post('/', StreamerController.createStreamer);

// TODO:
// router.put('/:streamerId/vote', StreamerController.getStreamers);

export default router;

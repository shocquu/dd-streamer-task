import { Router } from 'express';
import StreamerController from './streamer.controller';

const router = Router();

router.get('/', StreamerController.getStreamers);
router.get('/:streamerId', StreamerController.getStreamerById);

router.post('/', StreamerController.createStreamer);

router.put('/:streamerId', StreamerController.updateSteamer);
router.put('/:streamerId/vote', StreamerController.voteForStreamer);

router.delete('/:streamerId', StreamerController.deleteStreamer);
router.delete('/:streamerId/vote', StreamerController.removeVote);

export default router;

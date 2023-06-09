import express from 'express';
import controller from '../controllers/Event';
import { Schemas, ValidateJoi } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', controller.createEvent);
router.get('/event/:eventId', controller.readEvent);
router.get('/:eventType', controller.readEventByType);
router.get('/', controller.readAll);
router.patch('/:eventId', controller.updateEvent);
router.delete('/:eventId', controller.deleteEvent);

export = router;
import express from 'express';
import controller from '../controllers/Event';
import { Schemas, ValidateJoi } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.event.create), controller.createEvent);
router.get('/:eventId', controller.readEvent);
router.get('/users/:eventId', controller.readEventParticipants);
router.get('/', controller.readAll);
router.patch('/:eventId', ValidateJoi(Schemas.event.update), controller.updateEvent);
router.delete('/:eventId', controller.deleteEvent);

export = router;
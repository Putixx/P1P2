import express from 'express';
import controller from '../controllers/Ticket';
import { Schemas, ValidateJoi } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.ticket.create), controller.createTicket);
router.get('/:ticketId', controller.readTicket);
router.get('/', controller.readAll);
router.patch('/:ticketId', ValidateJoi(Schemas.ticket.update), controller.updateTicket);
router.delete('/:ticketId', controller.deleteTicket);

export = router;
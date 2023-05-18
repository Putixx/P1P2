import express from 'express';
import controller from '../controllers/User';
import { Schemas, ValidateJoi } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create',  controller.createUser);
router.get('/:userId', controller.readUser);
router.get('/', controller.readAll);
router.patch('/:userId', ValidateJoi(Schemas.user.update), controller.updateUser);
router.delete('/:userId', controller.deleteUser);

export = router;